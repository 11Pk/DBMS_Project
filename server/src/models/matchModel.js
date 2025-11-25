import { pool } from '../config/db.js'

export async function createMatch({ donor_id, recipient_id, compatibility_score, status }) {
  const [result] = await pool.execute(
    `INSERT INTO Matches (donor_id, recipient_id, compatibility_score, status)
     VALUES (?, ?, ?, ?)`,
    [donor_id, recipient_id, compatibility_score, status],
  )
  return getMatchById(result.insertId)
}

export async function updateMatchStatus(id, status) {
  await pool.execute(`UPDATE Matches SET status = ? WHERE id = ?`, [status, id])
  return getMatchById(id)
}

export async function getMatchById(id) {
  const [rows] = await pool.execute(
    `SELECT m.*, d.organ_type, r.organ_required
     FROM Matches m
     JOIN Donors d ON m.donor_id = d.id
     JOIN Recipients r ON m.recipient_id = r.id
     WHERE m.id = ?`,
    [id],
  )
  return rows[0]
}

export async function getMatches() {
  const [rows] = await pool.execute(
    `SELECT m.*, d.organ_type, r.organ_required, u1.name AS donor_name, u2.name AS recipient_name
     FROM Matches m
     JOIN Donors d ON m.donor_id = d.id
     JOIN Recipients r ON m.recipient_id = r.id
     JOIN Users u1 ON d.id = u1.id
     JOIN Users u2 ON r.id = u2.id`,
  )
  return rows
}

