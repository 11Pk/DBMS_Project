import { pool } from '../config/db.js'

export async function createDonor({ id, organ_type, availability, medical_history, status }) {
  await pool.execute(
    // `INSERT INTO Donors (id, organ_type, availability, medical_history, status)
    //  VALUES (?, ?, ?, ?, ?)`,
    `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
  VALUES (?, ?, ?, ?, ?, ?)`
    [id, organ_type, availability, medical_history, status],
  )
  return getDonorById(id)
}

export async function updateAvailability(id, availability) {
  await pool.execute(
    `UPDATE Donors SET availability = ?, status = ?
     WHERE id = ?`,
    [availability, availability === 'completed' ? 'inactive' : 'active', id],
  )
  return getDonorById(id)
}

export async function getDonorById(id) {
  const [rows] = await pool.execute(
    `SELECT d.*, u.name, u.email, u.blood_group
     FROM Donors d
     JOIN Users u ON d.id = u.id
     WHERE d.id = ?`,
    [id],
  )
  return rows[0]
}

export async function getAllDonors() {
  const [rows] = await pool.execute(
    `SELECT d.*, u.name, u.email, u.blood_group
     FROM Donors d
     JOIN Users u ON d.id = u.id`,
  )
  return rows
}

