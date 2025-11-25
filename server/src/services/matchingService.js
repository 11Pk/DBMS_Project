import ApiError from '../utils/ApiError.js'
import * as donorModel from '../models/donorModel.js'
import * as recipientModel from '../models/recipientModel.js'
import * as matchModel from '../models/matchModel.js'
import * as qualityModel from '../models/qualityModel.js'
import * as notificationModel from '../models/notificationModel.js'

function calculateCompatibility(donor, recipient) {
  const organMatch = donor.organ_type.toLowerCase() === recipient.organ_required.toLowerCase()
  const bloodMatch = donor.blood_group === recipient.blood_group
  if (!organMatch || !bloodMatch) return 0
  return 90
}

export async function initiateMatch({ donorId, recipientId }) {
  const donor = await donorModel.getDonorById(donorId)
  if (!donor) throw new ApiError(404, 'Donor not found')
  if (donor.availability !== 'available') {
    throw new ApiError(400, 'Donor not currently available')
  }

  const recipient = await recipientModel.getRecipientById(recipientId)
  if (!recipient) throw new ApiError(404, 'Recipient not found')
  if (recipient.status !== 'waiting') {
    throw new ApiError(400, 'Recipient is not in waiting list')
  }

  const score = calculateCompatibility(donor, recipient)
  if (score === 0) {
    throw new ApiError(400, 'No compatibility found for organ/blood group')
  }

  const match = await matchModel.createMatch({
    donor_id: donorId,
    recipient_id: recipientId,
    compatibility_score: score,
    status: 'quality_check',
  })

  await donorModel.updateAvailability(donorId, 'matched')
  await recipientModel.updateStatus(recipientId, 'matched')

  const notification = await notificationModel.createNotification({
    user_id: recipientId,
    message: `Match found for your ${recipient.organ_required}. Awaiting quality check.`,
  })

  const quality = await qualityModel.createQualityCheck(match.id)

  return { match, quality, notification }
}

export async function handleQualityDecision({ qualityId, decision, reason }) {
  const quality = await qualityModel.updateQualityCheck(qualityId, decision, reason)
  const match = await matchModel.getMatchById(quality.match_id)

  if (decision === 'approved') {
    await matchModel.updateMatchStatus(match.id, 'scheduled')
    await notificationModel.createNotification({
      user_id: match.recipient_id,
      message: 'Quality check passed. Transplant scheduled.',
    })
  } else if (decision === 'rejected') {
    await matchModel.updateMatchStatus(match.id, 'failed')
    await recipientModel.updateStatus(match.recipient_id, 'waiting')
    await donorModel.updateAvailability(match.donor_id, 'available')
    await notificationModel.createNotification({
      user_id: match.recipient_id,
      message: 'Quality check failed. You remain on the waiting list.',
    })
  }

  return quality
}

export async function markTransplantCompleted(matchId) {
  const match = await matchModel.updateMatchStatus(matchId, 'completed')
  await donorModel.updateAvailability(match.donor_id, 'completed')
  await recipientModel.updateStatus(match.recipient_id, 'completed')
  await notificationModel.createNotification({
    user_id: match.recipient_id,
    message: 'Transplant completed successfully.',
  })
  return match
}

