import { pool } from '../config/db.js'

export async function createQualityCheck(match_id) {
  const [result] = await pool.execute(
    `INSERT INTO QualityChecks (match_id, result)
     VALUES (?, 'pending')`,
    [match_id],
  )
  return getQualityCheckById(result.insertId)
}

export async function updateQualityCheck(id, result, reason) {
  await pool.execute(
    `UPDATE QualityChecks SET result = ?, reason = ? WHERE id = ?`,
    [result, reason, id],
  )
  return getQualityCheckById(id)
}

export async function getQualityCheckByMatch(match_id) {
  const [rows] = await pool.execute(
    `SELECT * FROM QualityChecks WHERE match_id = ?`,
    [match_id],
  )
  return rows[0]
}

export async function getQualityCheckById(id) {
  const [rows] = await pool.execute(
    `SELECT * FROM QualityChecks WHERE id = ?`,
    [id],
  )
  return rows[0]
}

export async function getQualityChecks() {
  const [rows] = await pool.execute(`SELECT * FROM QualityChecks`)
  return rows
}

