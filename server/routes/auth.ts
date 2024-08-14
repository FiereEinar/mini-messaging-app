import express from 'express';
const router = express.Router();

import { login, logout, signup } from '../controllers/authController';

router.get('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

export default router;
