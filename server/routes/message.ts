import express from 'express';
const router = express.Router();

import {
	get_messages,
	create_message,
	delete_message,
	update_message,
} from '../controllers/messageController';
import { auth } from '../middlewares/auth';

router.get('/', auth, get_messages);
router.post('/', auth, create_message);
router.put('/:messageID', auth, update_message);
router.delete('/:messageID', auth, delete_message);

export default router;
