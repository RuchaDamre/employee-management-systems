import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(404).json({ success: false, message: "Token not provided" });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(404).json({ success: false, message: "Token not valid" });
        }

        const result = await pool.query(`SELECT ID, EMAIL, ROLE FROM ADMIN WHERE ID=$1`, [decoded.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ success: false, message: "User not found" });
        }

        req.body = result.rows[0];
        return res.json({
            success: true,
            user: {
                role: result.rows[0].role,
                email: result.rows[0].email,
            },
        });

    }
    catch (error) {
        res.status(404).json({ success: false, message: "Invalid token" });
    }
}