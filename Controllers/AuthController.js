import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authController = async (req, res) => {
   try {
      const { email, password } = req.body;
      const result = await pool.query(`SELECT * FROM ADMIN WHERE EMAIL = $1`, [email]);
      if (result.rows.length === 0) {
         res.status(404).json({ success: false, message: 'User Not Found' });
      }

      const admin = result.rows[0];
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
         res.status(404).json({ success: false, message: 'Invalid Password' });
      }

      const token = jwt.sign(
         { id: admin.id, role: admin.role },
         process.env.JWT_SECRET,
         { expiresIn: '300d' }
      );

      return res.status(200).json({ success: true, token, user: { role: admin.role, email: admin.email } });
   }
   catch (error) {
      return res.status(500).json({ success: false, message: error.message })
   }
}