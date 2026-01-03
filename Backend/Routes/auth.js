import express from 'express';
import { authController } from '../Controllers/AuthController.js';
import { verifyUser } from '../Middleware/authMiddleware.js'
import { verifyController } from '../Controllers/VerifyController.js';

const router = express.Router();

router.route('/login').post(authController);
router.route('/verify').get(verifyUser, verifyController);

export default router;