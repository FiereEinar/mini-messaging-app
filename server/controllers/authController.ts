import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginBody, SignupBody } from '../types/user';

export const login = asyncHandler(async (req, res) => {
	const { username, password }: LoginBody = req.body;

	const user = await prisma.user.findFirst({
		where: { username: username },
	});

	if (!user) {
		res.json({ success: false, message: 'Incorrect username' });
		return;
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		res.json({ success: false, message: 'Incorrect password' });
		return;
	}

	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) throw new Error('JWT SECRET NOT FOUND');

	const token = jwt.sign({ username: user.username }, jwtSecret, {
		expiresIn: '1d',
	});

	res.cookie('jwt_token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	res.json({
		success: true,
		data: { username: user.username },
		message: 'Login successfull',
	});
});

export const signup = asyncHandler(async (req, res) => {
	const { username, password, confirmPassword }: SignupBody = req.body;

	if (password !== confirmPassword) {
		res.json({ success: false, message: 'Passwords do not match' });
		return;
	}

	const salt = process?.env.BCRYPT_SALT;
	if (!salt) throw new Error('BCRYPT SALT NOT FOUND');

	const hashedPassword = await bcrypt.hash(password, parseInt(salt));

	const result = await prisma.user.create({
		data: {
			password: hashedPassword,
			username: username,
		},
	});

	res.json({ success: true, data: result, message: 'Signup successfull' });
});
