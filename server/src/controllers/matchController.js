import * as matchModel from '../models/matchModel.js'
import * as qualityModel from '../models/qualityModel.js'
import * as matchingService from '../services/matchingService.js'
import * as donorModel from '../models/donorModel.js'
import * as recipientModel from '../models/recipientModel.js'
import ApiError from '../utils/ApiError.js'

export async function listMatches(_req, res, next) {
  try {
    const matches = await matchModel.getMatches()
    res.json({ success: true, data: matches })
  } catch (error) {
    next(error)
  }
}

export async function createMatch(req, res, next) {
  try {
    // If no body or empty body, run auto-matching
    if (!req.body || Object.keys(req.body).length === 0) {
      return runAutoMatching(req, res, next)
    }
    
    const { donorId, recipientId } = req.body
    
    // If no specific IDs provided, run auto-matching
    if (!donorId && !recipientId) {
      return runAutoMatching(req, res, next)
    }
    
    const result = await matchingService.initiateMatch({ donorId, recipientId })
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

async function runAutoMatching(req, res, next) {
  try {
    // Get all available donors and waiting recipients
    const donors = await donorModel.getAllDonors()
    const recipients = await recipientModel.getAllRecipients()
    
    const availableDonors = donors.filter(d => d.availability === 'available')
    const waitingRecipients = recipients.filter(r => r.status === 'waiting')
    
    if (availableDonors.length === 0) {
      throw new ApiError(400, 'No available donors found')
    }
    
    if (waitingRecipients.length === 0) {
      throw new ApiError(400, 'No waiting recipients found')
    }
    
    const matches = []
    
    // Match donors with recipients based on organ type and blood group
    for (const recipient of waitingRecipients) {
      const compatibleDonor = availableDonors.find(donor => 
        donor.organ_type.toLowerCase() === recipient.organ_required.toLowerCase() &&
        donor.blood_group === recipient.blood_group &&
        !matches.some(m => m.match.donor_id === donor.id)
      )
      
      if (compatibleDonor) {
        try {
          const result = await matchingService.initiateMatch({
            donorId: compatibleDonor.id,
            recipientId: recipient.id
          })
          matches.push(result)
        } catch (err) {
          console.error(`Failed to create match for donor ${compatibleDonor.id} and recipient ${recipient.id}:`, err.message)
        }
      }
    }
    
    res.status(201).json({ 
      success: true, 
      message: `Created ${matches.length} matches`,
      data: matches 
    })
  } catch (error) {
    next(error)
  }
}

export async function getQualityCheck(req, res, next) {
  try {
    const { matchId } = req.params
    const qc = await qualityModel.getQualityCheckByMatch(matchId)
    res.json({ success: true, data: qc })
  } catch (error) {
    next(error)
  }
}

