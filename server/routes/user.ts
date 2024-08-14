import express from 'express';
const router = express.Router();

import { get_users } from '../controllers/userController';

router.get('/', get_users);

export default router;
