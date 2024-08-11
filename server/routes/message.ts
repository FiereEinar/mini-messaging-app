import express from 'express';
const router = express.Router();

import { get_messages, create_message } from '../controllers/messageController';

router.get('/', get_messages);
router.post('/', create_message);

export default router;
