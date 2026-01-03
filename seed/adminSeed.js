import bcrypt from 'bcrypt'
import pool from '../db.js'

async function seedAdmin() {
  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10)

    // 2. Insert admin into PostgreSQL
    await pool.query(`INSERT INTO ADMIN (email, password, role) VALUES ($1, $2, $3)`, ['admin@gmail.com', hashedPassword, 'admin'])
  } catch (error) {
    console.error('Error seeding admin:', error)
  } finally {
    // 3. Close DB connection
    await pool.end();
    process.exit();
  }
}

seedAdmin();
