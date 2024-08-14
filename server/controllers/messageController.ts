import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';

/**
 * GET ALL MESSAGES
 */
export const get_messages = asyncHandler(async (req, res) => {
	const messages = await prisma.messages.findMany();

	res.json({ success: true, data: messages, message: 'Messages gathered' });
});

/**
 * CREATE A MESSAGE
 */
export const create_message = asyncHandler(async (req, res) => {
	const { message, senderID }: { message: string; senderID: number } = req.body;

	if (!message || !senderID) {
		res.json({ success: false, data: null, message: 'Incomplete body' });
		return;
	}

	console.log(message, senderID);

	const result = await prisma.messages.create({
		data: {
			message: message,
			senderID: senderID,
		},
	});

	console.log(result);

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

	await prisma.messages.update({
		where: { id: parseInt(messageID) },
		data: {
			message: message,
		},
	});

	res.json({ success: true, data: null, message: 'Message updated' });
});

/**
 * DELETE A MESSAGE
 */
export const delete_message = asyncHandler(async (req, res) => {
	const { messageID } = req.params;

	await prisma.messages.delete({
		where: { id: parseInt(messageID) },
	});

	res.json({ success: true, data: null, message: 'Message deleted' });
});
