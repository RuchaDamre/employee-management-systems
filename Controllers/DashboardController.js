import pool from '../db.js'

async function DashboardController(req, res) {
    try {
        const result = await pool.query(`SELECT COUNT(ID), SUM(SALARY) FROM EMPLOYEE`);
        req.body = result.rows;
        res.status(200).json({ message: 'success', data: result.rows });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error in fetching dashboard data" });
    }
}

export default DashboardController;