import asyncHandler from 'express-async-handler';
import { createMessage, getMessages } from '../database/queries';

export const get_messages = asyncHandler(async (req, res) => {
	const messages = await getMessages();

	res.json({ success: true, data: messages, message: 'Messages gathered' });
});

export const create_message = asyncHandler(async (req, res) => {
	const { message, sender }: { message: string; sender: string } = req.body;

	if (!message || !sender) {
		res.json({ success: false, data: null, message: 'Incomplete body' });
		return;
	}

	await createMessage(message, sender);

	res.json({ success: true, data: null, message: 'Message created' });
});
