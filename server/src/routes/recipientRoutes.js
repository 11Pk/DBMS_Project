import { Router } from 'express'
import {
  registerRecipient,
  getNotifications,
  getStatus,
} from '../controllers/recipientController.js'
import { authenticate, authorize } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', authenticate, authorize('recipient'), registerRecipient)
router.get('/me/notifications', authenticate, authorize('recipient'), getNotifications)
router.get('/:id/status', authenticate, getStatus)

export default router

