import express from 'express';
const router = express.Router();

import { get_users } from '../controllers/userController';
import { auth } from '../middlewares/auth';

router.get('/', auth, get_users);

export default router;
