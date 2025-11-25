import { pool } from '../config/db.js'

export async function createRecipient({ id, organ_required, urgency, status }) {
  await pool.execute(
    `INSERT INTO Recipients (id, organ_required, urgency, status)
     VALUES (?, ?, ?, ?)`,
    [id, organ_required, urgency, status],
  )
  return getRecipientById(id)
}

export async function updateStatus(id, status) {
  await pool.execute(`UPDATE Recipients SET status = ? WHERE id = ?`, [status, id])
  return getRecipientById(id)
}

export async function getRecipientById(id) {
  const [rows] = await pool.execute(
    `SELECT r.*, u.name, u.email, u.blood_group
     FROM Recipients r
     JOIN Users u ON r.id = u.id
     WHERE r.id = ?`,
    [id],
  )
  return rows[0]
}

export async function getAllRecipients() {
  const [rows] = await pool.execute(
    `SELECT r.*, u.name, u.email, u.blood_group
     FROM Recipients r
     JOIN Users u ON r.id = u.id`,
  )
  return rows
}

