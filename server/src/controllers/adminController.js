import * as donorModel from '../models/donorModel.js'
import * as recipientModel from '../models/recipientModel.js'
import * as matchingService from '../services/matchingService.js'
import * as qualityModel from '../models/qualityModel.js'

export async function listDonors(_req, res, next) {
  try {
    const donors = await donorModel.getAllDonors()
    res.json({ success: true, data: donors })
  } catch (error) {
    next(error)
  }
}

export async function listRecipients(_req, res, next) {
  try {
    const recipients = await recipientModel.getAllRecipients()
    res.json({ success: true, data: recipients })
  } catch (error) {
    next(error)
  }
}

export async function reviewQuality(req, res, next) {
  try {
    const { qualityId } = req.params
    const { decision, reason } = req.body
    const result = await matchingService.handleQualityDecision({
      qualityId,
      decision,
      reason,
    })
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

export async function completeTransplant(req, res, next) {
  try {
    const { matchId } = req.params
    const match = await matchingService.markTransplantCompleted(matchId)
    res.json({ success: true, data: match })
  } catch (error) {
    next(error)
  }
}

export async function listQualityChecks(_req, res, next) {
  try {
    const checks = await qualityModel.getQualityChecks()
    res.json({ success: true, data: checks })
  } catch (error) {
    next(error)
  }
}

