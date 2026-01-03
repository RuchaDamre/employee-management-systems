import express from 'express';
import { EmployeeController, upload, EmployeeList, EmployeeData, UpdateEmployeeData } from '../Controllers/EmployeeController.js';

const router = express.Router();

router.route('/add').post(upload.single('img'), EmployeeController);
router.route('/').get(EmployeeList);
router.route('/:id').get(EmployeeData);
router.route('/:id').put(UpdateEmployeeData);

export default router;