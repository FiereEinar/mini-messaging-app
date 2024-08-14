import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/request';

export const auth = asyncHandler(async (req: CustomRequest, res, next) => {
	const token = req.cookies?.jwt_token as string;

	if (!token) {
		res.sendStatus(401);
		return;
	}

	const user = await prisma.user.findFirst({
		where: {
			token: token,
		},
	});

	if (!user) {
		res.sendStatus(403);
		return;
	}

	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) throw new Error('JWT SECRET NOT FOUND');

	jwt.verify(token, jwtSecret, (err, data) => {
		if (err) {
			res.sendStatus(403);
			return;
		}

		req.user = user;
		next();
	});
});
