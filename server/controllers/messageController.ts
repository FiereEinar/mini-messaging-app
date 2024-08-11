import asyncHandler from 'express-async-handler';
import {
	createMessage,
	deleteMessage,
	getMessages,
	updateMessage,
} from '../database/queries';

/**
 * GET ALL MESSAGES
 */
export const get_messages = asyncHandler(async (req, res) => {
	const messages = await getMessages();

	res.json({ success: true, data: messages, message: 'Messages gathered' });
});

/**
 * CREATE A MESSAGE
 */
export const create_message = asyncHandler(async (req, res) => {
	const { message, sender }: { message: string; sender: string } = req.body;

	if (!message || !sender) {
		res.json({ success: false, data: null, message: 'Incomplete body' });
		return;
	}

	await createMessage(message, sender);

	res.json({ success: true, data: null, message: 'Message created' });
});

/**
 * UPDATE A MESSAGE
 */
export const update_message = asyncHandler(async (req, res) => {
	const { message }: { message: string } = req.body;
	const { messageID } = req.params;

	if (!message) {
		res.json({ success: false, data: null, message: 'Incomplete body' });
		return;
	}

	await updateMessage(message, messageID);

	res.json({ success: true, data: null, message: 'Message updated' });
});

/**
 * DELETE A MESSAGE
 */
export const delete_message = asyncHandler(async (req, res) => {
	const { messageID } = req.params;

	await deleteMessage(messageID);

	res.json({ success: true, data: null, message: 'Message deleted' });
});
