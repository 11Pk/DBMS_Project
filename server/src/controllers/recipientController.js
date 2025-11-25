import ApiError from '../utils/ApiError.js'
import * as recipientModel from '../models/recipientModel.js'
import * as notificationModel from '../models/notificationModel.js'

export async function registerRecipient(req, res, next) {
  try {
    const userId = req.user.id
    const { organ_required, urgency = 'medium', status = 'waiting' } = req.body
    const existing = await recipientModel.getRecipientById(userId)
    if (existing) {
      throw new ApiError(400, 'Recipient request already exists')
    }
    const recipient = await recipientModel.createRecipient({
      id: userId,
      organ_required,
      urgency,
      status,
    })
    res.status(201).json({ success: true, data: recipient })
  } catch (error) {
    next(error)
  }
}

export async function getStatus(req, res, next) {
  try {
    const { id } = req.params
    const recipient = await recipientModel.getRecipientById(id)
    if (!recipient) throw new ApiError(404, 'Recipient not found')
    res.json({ success: true, data: recipient })
  } catch (error) {
    next(error)
  }
}

export async function getNotifications(req, res, next) {
  try {
    const userId = req.user.id
    const notifications = await notificationModel.getNotificationsByUser(userId)
    res.json({ success: true, data: notifications })
  } catch (error) {
    next(error)
  }
}

