import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';
import { CustomRequest } from '../types/request';

export const get_users = asyncHandler(async (req: CustomRequest, res) => {
	const users = await prisma.user.findMany({
		include: {
			messages: true,
		},
	});

	res.json({ data: users, message: 'Users gathered' });
});
