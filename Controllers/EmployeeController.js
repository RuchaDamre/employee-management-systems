import pool from '../db.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // image will store in public/images
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        // filename = todays_data.file_extension(jpeg/jpg/png)
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

export const upload = multer({ storage: storage });

// Add Employee
export const EmployeeController = async (req, res) => {
    const { name, email, empID, dob, gender, role, salary } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        const result = await pool.query(`SELECT * FROM EMPLOYEE WHERE EMAIL = $1`, [email]);
        if (result.rows.length > 0) {
            res.status(404).json({ success: false, message: 'Employee already exists' });
        }
        else {
            await pool.query(`INSERT INTO EMPLOYEE (name, email, empid, dob, gender, role, salary, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [name, email, empID, dob, gender, role, salary, image]);
            res.status(200).json({ success: true, message: "Employee Added Successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error in adding employee" });
    }
}

// Display Employees
export const EmployeeList = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM EMPLOYEE ORDER BY ID ASC`);
        req.body = result.rows;
        res.status(200).json({ success: true, employees: result.rows });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error in adding employee" });
    }
}

// View Employee
export const EmployeeData = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM EMPLOYEE WHERE ID=$1`, [id]);
        req.body = result.rows;
        res.status(200).json({ success: true, employee: result.rows });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error in fetching employee data" });
    }
}

// Update Employee
export const UpdateEmployeeData = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, salary } = req.body;
    try {
        await pool.query(`
    UPDATE employee
    SET
      name = $1,
      email = $2,
      role = $3,
      salary = $4
    WHERE id = $5`, [name, email, role, salary, id]);
        res.status(200).json({ success: true, message: "Employee Updated Successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error in updating employee data" });
    }
}

