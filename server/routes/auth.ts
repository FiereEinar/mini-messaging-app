import express from 'express';
const router = express.Router();

import {
	isAuthenticated,
	login,
	logout,
	signup,
} from '../controllers/authController';
import { loginValidation, signupValidation } from '../middlewares/validations';

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/logout', logout);
router.get('/check', isAuthenticated);

export default router;
