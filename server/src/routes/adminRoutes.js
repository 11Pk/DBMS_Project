import { Router } from 'express'
import {
  listDonors,
  listRecipients,
  listQualityChecks,
  reviewQuality,
  completeTransplant,
} from '../controllers/adminController.js'
import { authenticate, authorize } from '../middleware/authMiddleware.js'

const router = Router()

router.use(authenticate, authorize('admin'))

router.get('/donors', listDonors)
router.get('/recipients', listRecipients)
router.get('/quality-checks', listQualityChecks)
router.patch('/quality-checks/:qualityId', reviewQuality)
router.patch('/matches/:matchId/complete', completeTransplant)

export default router

