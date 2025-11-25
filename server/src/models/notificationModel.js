import { pool } from '../config/db.js'

export async function createNotification({ user_id, message }) {
  const [result] = await pool.execute(
    `INSERT INTO Notifications (user_id, message, status)
     VALUES (?, ?, 'unread')`,
    [user_id, message],
  )
  return getNotificationById(result.insertId)
}

export async function markNotificationRead(id) {
  await pool.execute(`UPDATE Notifications SET status = 'read' WHERE id = ?`, [id])
  return getNotificationById(id)
}

export async function getNotificationsByUser(user_id) {
  const [rows] = await pool.execute(
    `SELECT * FROM Notifications WHERE user_id = ? ORDER BY id DESC`,
    [user_id],
  )
  return rows
}

export async function getNotificationById(id) {
  const [rows] = await pool.execute(
    `SELECT * FROM Notifications WHERE id = ?`,
    [id],
  )
  return rows[0]
}


