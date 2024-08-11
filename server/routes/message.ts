import express from 'express';
const router = express.Router();

import {
	get_messages,
	create_message,
	delete_message,
	update_message,
} from '../controllers/messageController';

router.get('/', get_messages);
router.post('/', create_message);
router.put('/:messageID', update_message);
router.delete('/:messageID', delete_message);

export default router;
