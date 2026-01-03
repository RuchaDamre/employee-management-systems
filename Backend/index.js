import express from 'express';
import cors from 'cors';
import authRouter from './Routes/auth.js';
import employeeRouter from './Routes/employee.js';
import dashboardRouter from './Routes/dashboard.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors({
  origin: "https://employee-management-system-sage-ten.vercel.app"
}));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/employee', employeeRouter);
app.use('/images', express.static('public/images'));  // access image - http://localhost:8000/images/filename.jpg in frontend
app.use('/dashboard', dashboardRouter);

app.listen(process.env.PORT, () => {
    console.log("Server running.");
})
