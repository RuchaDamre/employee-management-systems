import express from 'express';
import dashboardController from '../Controllers/DashboardController.js'

const router = express.Router();
router.route('/').get(dashboardController);

export default router;