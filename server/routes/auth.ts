import express from 'express';
const router = express.Router();

import { login, signup } from '../controllers/authController';

router.get('/login', login);
router.post('/signup', signup);

export default router;
