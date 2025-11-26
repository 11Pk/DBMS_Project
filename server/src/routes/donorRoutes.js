// import { Router } from 'express'
// import {
//   registerDonor,
//   updateAvailability,
//   getStatus,
// } from '../controllers/donorController.js'
// import { authenticate, authorize } from '../middleware/authMiddleware.js'

// const router = Router()

// router.post('/register', authenticate, registerDonor)
// router.patch('/:id/availability', authenticate, authorize('donor', 'admin'), updateAvailability)
// router.get('/:id/status', authenticate, getStatus)

// export default router

import { Router } from 'express'
import {
  registerDonor,
  updateAvailability,
  getStatus,
} from '../controllers/donorController.js'
import { authenticate, authorize } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', authenticate, authorize('donor'), registerDonor)
router.patch('/:id/status', authenticate, authorize('donor', 'admin'), updateAvailability)
router.get('/:id/status', authenticate, getStatus)

export default router

