import { pool } from '../config/db.js'

// export async function createDonor({ id, organ_type, availability, medical_history, status }) {
//   // await pool.execute(
//   //   // `INSERT INTO Donors (id, organ_type, availability, medical_history, status)
//   //   //  VALUES (?, ?, ?, ?, ?)`,
//   //   `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//   // VALUES (?, ?, ?, ?, ?, ?)`
//   //   [id, organ_type, availability, medical_history, status],
//   // )
//   await pool.execute(
//   `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//    VALUES (?, ?, ?, ?, ?, ?)`,
//   [user_id, age, blood_group, organ, medical_history, status]
// )

//   return getDonorById(id)
// }
// export async function createDonor({ user_id, age, blood_group, organ, medical_history, status }) {
//   return await pool.execute(
//     `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [user_id, age, blood_group, organ, medical_history, status]
//   )
// }
// export async function createDonor({ user_id, age, blood_group, organ, medical_history, status }) {
//   return await pool.execute(
//     `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [user_id, age, blood_group, organ, medical_history, status]
//   );
// }


// export async function updateAvailability(id, availability) {
//   await pool.execute(
//     `UPDATE Donors SET availability = ?, status = ?
//      WHERE id = ?`,
//     [availability, availability === 'completed' ? 'inactive' : 'active', id],
//   )
//   return getDonorById(id)
// }

// export async function getDonorById(id) {
//   const [rows] = await pool.execute(
//     `SELECT d.*, u.name, u.email, u.blood_group
//      FROM Donors d
//      JOIN Users u ON d.id = u.id
//      WHERE d.id = ?`,
//     [id],
//   )
//   return rows[0]
// }

// export async function getAllDonors() {
//   const [rows] = await pool.execute(
//     `SELECT d.*, u.name, u.email, u.blood_group
//      FROM Donors d
//      JOIN Users u ON d.id = u.id`,
//   )
//   return rows
// }

// import { pool } from '../config/db.js'

// export async function createDonor({ user_id, age, blood_group, organ, medical_history, status }) {
//   await pool.execute(
//     `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [user_id, age, blood_group, organ, medical_history, status]
//   );
  
//   return getDonorById(user_id);
// }

// export async function updateAvailability(id, availability) {
//   await pool.execute(
//     `UPDATE donors SET availability = ?, status = ?
//      WHERE user_id = ?`,
//     [availability, availability === 'completed' ? 'inactive' : 'active', id],
//   )
//   return getDonorById(id)
// }

// export async function getDonorById(user_id) {
//   const [rows] = await pool.execute(
//     `SELECT d.*, u.name, u.email, u.blood_group as user_blood_group
//      FROM donors d
//      JOIN Users u ON d.user_id = u.id
//      WHERE d.user_id = ?`,
//     [user_id],
//   )
//   return rows[0]
// }

// export async function getAllDonors() {
//   const [rows] = await pool.execute(
//     `SELECT d.*, u.name, u.email, u.blood_group as user_blood_group
//      FROM donors d
//      JOIN Users u ON d.user_id = u.id`,
//   )
//   return rows
// }

// import { pool } from '../config/db.js'

// export async function createDonor({ user_id, age, blood_group, organ, medical_history, status }) {
//   await pool.execute(
//     `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [user_id, age, blood_group, organ, medical_history, status]
//   );
  
//   return getDonorById(user_id);
// }

// export async function updateDonorStatus(user_id, status) {
//   await pool.execute(
//     `UPDATE donors SET status = ?
//      WHERE user_id = ?`,
//     [status, user_id]
//   )
//   return getDonorById(user_id)
// }

// export async function getDonorById(user_id) {
//   const [rows] = await pool.execute(
//     `SELECT d.*, u.name, u.email, u.blood_group as user_blood_group
//      FROM donors d
//      JOIN Users u ON d.user_id = u.id
//      WHERE d.user_id = ?`,
//     [user_id],
//   )
//   return rows[0]
// }

// export async function getAllDonors() {
//   const [rows] = await pool.execute(
//     `SELECT d.*, u.name, u.email, u.blood_group as user_blood_group
//      FROM donors d
//      JOIN Users u ON d.user_id = u.id`,
//   )
//   return rows
// }

// import { pool } from '../config/db.js'

// export async function createDonor({ user_id, age, blood_group, organ, medical_history, status }) {
//   await pool.execute(
//     `INSERT INTO donors (user_id, age, blood_group, organ, medical_history, status)
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [user_id, age, blood_group, organ, medical_history, status]
//   );
  
//   return getDonorById(user_id);
// }

// export async function updateDonorStatus(user_id, status) {
//   await pool.execute(
//     `UPDATE donors SET status = ?
//      WHERE user_id = ?`,
//     [status, user_id]
//   )
//   return getDonorById(user_id)
// }

// export async function getDonorById(user_id) {
//   const [rows] = await pool.execute(
//     `SELECT d.id, d.user_id, d.age, d.blood_group, d.organ, 
//             d.medical_history, d.status, d.created_at, d.updated_at,
//             u.name, u.email
//      FROM donors d
//      JOIN users u ON d.user_id = u.id
//      WHERE d.user_id = ?`,
//     [user_id]
//   )
//   return rows[0]
// }

// export async function getAllDonors() {
//   const [rows] = await pool.execute(
//     `SELECT d.id, d.user_id, d.age, d.blood_group, d.organ, 
//             d.medical_history, d.status, d.created_at, d.updated_at,
//             u.name, u.email
//      FROM donors d
//      JOIN users u ON d.user_id = u.id
//      ORDER BY d.created_at DESC`
//   )
//   return rows
// }

// import { pool } from '../config/db.js'

export async function createDonor({user_id, age, blood_group, organ, medical_history, status }) {
  await pool.execute(
    `INSERT INTO Donors (id,user_id, age, blood_group, organ, medical_history, status)
     VALUES (?,?, ?, ?, ?, ?, ?)`,
    [user_id,user_id, age, blood_group, organ, medical_history, status]
  )
  
  return getDonorByUserId(user_id)
}

export async function findByUserId(user_id) {
  const [rows] = await pool.execute(
    `SELECT d.*, u.name, u.email
     FROM Donors d
     JOIN Users u ON d.user_id = u.id
     WHERE d.user_id = ?`,
    [user_id]
  )
  return rows[0]
}

export async function updateAvailability(user_id, availability) {
  await pool.execute(
    `UPDATE Donors SET status = ?
     WHERE user_id = ?`,
    [availability, user_id]
  )
  return getDonorByUserId(user_id)
}

export async function getDonorById(id) {
  const [rows] = await pool.execute(
    `SELECT d.*, u.name, u.email
     FROM Donors d
     JOIN Users u ON d.user_id = u.id
     WHERE d.id = ?`,
    [id]
  )
  return rows[0]
}

export async function getDonorByUserId(user_id) {
  const [rows] = await pool.execute(
    `SELECT d.*, u.name, u.email
     FROM Donors d
     JOIN Users u ON d.user_id = u.id
     WHERE d.user_id = ?`,
    [user_id]
  )
  return rows[0]
}

export async function getAllDonors() {
  const [rows] = await pool.execute(
    `SELECT d.*, u.name, u.email, u.blood_group as user_blood_group
     FROM Donors d
     JOIN Users u ON d.user_id = u.id
     ORDER BY d.created_at DESC`
  )
  
  // Map to include both donor blood_group and organ field
  return rows.map(row => ({
    ...row,
    id: row.user_id, // For compatibility with frontend
    organ_type: row.organ, // Map organ to organ_type for frontend
    availability: row.status // Map status to availability for frontend
  }))
}