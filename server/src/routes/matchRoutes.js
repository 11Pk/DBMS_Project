import { Router } from 'express'
import {
  listMatches,
  createMatch,
  getQualityCheck,
} from '../controllers/matchController.js'
import { authenticate, authorize } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authenticate, authorize('admin'), listMatches)
router.post('/', authenticate, authorize('admin'), createMatch)
router.get('/:matchId/quality-check', authenticate, getQualityCheck)

export default router

