import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';

export const get_users = asyncHandler(async (req, res) => {
	const users = await prisma.user.findMany({
		include: {
			messages: true,
		},
	});

	console.log(users);

	res.json({ data: users, message: 'Users gathered' });
});
