import express from 'express';
const router = express.Router();

import { login, logout, signup } from '../controllers/authController';
import { loginValidation, signupValidation } from '../middlewares/validations';

router.get('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/logout', logout);

export default router;
