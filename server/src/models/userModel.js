import { pool } from '../config/db.js'

export async function createUser({ name, email, password, role, age, blood_group }) {
  const [result] = await pool.execute(
    `INSERT INTO Users (name, email, password, role, age, blood_group)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, password, role, age, blood_group],
  )
  return { id: result.insertId, name, email, role, age, blood_group }
}

export async function findByEmail(email) {
  const [rows] = await pool.execute(`SELECT * FROM Users WHERE email = ?`, [email])
  return rows[0]
}

export async function findById(id) {
  const [rows] = await pool.execute(`SELECT * FROM Users WHERE id = ?`, [id])
  return rows[0]
}


