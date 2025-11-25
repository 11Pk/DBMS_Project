import * as matchModel from '../models/matchModel.js'
import * as qualityModel from '../models/qualityModel.js'
import * as matchingService from '../services/matchingService.js'

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
    const { donorId, recipientId } = req.body
    const result = await matchingService.initiateMatch({ donorId, recipientId })
    res.status(201).json({ success: true, data: result })
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

