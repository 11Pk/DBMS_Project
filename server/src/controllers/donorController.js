import ApiError from '../utils/ApiError.js'
import * as donorModel from '../models/donorModel.js'
import * as userModel from '../models/userModel.js'

// export async function registerDonor(req, res, next) {
//   try {
//     const userId = req.user.id
//     const { organ_type, availability = 'available', medical_history = '', status = 'active' } =
//       req.body
//     const user = await userModel.findById(userId)
//     if (!user) throw new ApiError(404, 'User not found')
//     const existing = await donorModel.getDonorById(userId)
//     if (existing) {
//       throw new ApiError(400, 'Donor profile already exists')
//     }
//     const donor = await donorModel.createDonor({
//       id: userId,
//       organ_type,
//       availability,
//       medical_history,
//       status,
//     })
//     res.status(201).json({ success: true, data: donor })
//   } catch (error) {
//     next(error)
//   }
// }
export async function registerDonor(req, res, next) {
  try {
    const user_id = req.user.id;
    const { age, blood_group, organ, medical_history = '' } = req.body;

    // Validate required donor fields
    if (!age || !blood_group || !organ) {
      throw new ApiError(400, "Age, blood group, and organ are required");
    }

    const user = await userModel.findById(user_id);
    if (!user) throw new ApiError(404, "User not found");

    // Check donor profile exists
    const existing = await donorModel.findByUserId(user_id);
    if (existing) throw new ApiError(400, "Donor profile already exists");

    const donor = await donorModel.createDonor({
      user_id,
      age,
      blood_group,
      organ,
      medical_history,
      status: "available"   // valid enum in DB
    });

    res.status(201).json({ success: true, data: donor });
  } catch (error) {
    next(error);
  }
}

export async function updateAvailability(req, res, next) {
  try {
    const { id } = req.params
    const { availability } = req.body
    if (!availability) throw new ApiError(400, 'Availability required')
    const donor = await donorModel.updateAvailability(id, availability)
    res.json({ success: true, data: donor })
  } catch (error) {
    next(error)
  }
}

export async function getStatus(req, res, next) {
  try {
    const { id } = req.params
    const donor = await donorModel.getDonorById(id)
    if (!donor) throw new ApiError(404, 'Donor not found')
    res.json({ success: true, data: donor })
  } catch (error) {
    next(error)
  }
}


