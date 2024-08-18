import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';
import { CustomRequest } from '../types/request';

/**
 * GET ALL MESSAGES
 */
export const get_messages = asyncHandler(async (req, res) => {
	const messages = await prisma.messages.findMany({
		include: {
			sender: true,
		},
	});

	res.json({ success: true, data: messages, message: 'Messages gathered' });
});

/**
 * CREATE A MESSAGE
 */
export const create_message = asyncHandler(async (req: CustomRequest, res) => {
	const { message }: { message: string } = req.body;

	if (!message || !req.user?.id) {
		res.json({ success: false, data: null, message: 'Incomplete data' });
		return;
	}

	const result = await prisma.messages.create({
		data: {
			message: message,
			senderID: req.user?.id,
		},
	});

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
