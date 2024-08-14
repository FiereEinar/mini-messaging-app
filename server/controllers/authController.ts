import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginBody, SignupBody } from '../types/user';
import { validationResult } from 'express-validator';

/**
 * LOGIN
 */
export const login = asyncHandler(async (req, res) => {
	const { username, password }: LoginBody = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.json({ success: false, message: errors.array()[0].msg });
		return;
	}

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

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			token: token,
		},
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

/**
 * SIGNUP
 */
export const signup = asyncHandler(async (req, res) => {
	const { username, password, confirmPassword }: SignupBody = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.json({ success: false, message: errors.array()[0].msg });
		return;
	}

	if (password !== confirmPassword) {
		res.json({ success: false, message: 'Passwords do not match' });
		return;
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});

	if (existingUser) {
		res.json({ success: false, message: 'Username already exists' });
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

/**
 * LOGOUT
 */
export const logout = asyncHandler(async (req, res) => {
	const token = req.cookies?.jwt_token as string;

	if (!token) {
		res.sendStatus(204);
		return;
	}

	const user = await prisma.user.findFirst({
		where: {
			token: token,
		},
	});

	if (user) {
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				token: null,
			},
		});
	}

	res.clearCookie('jwt_token', {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
	});

	res.sendStatus(204);
});

export const isAuthenticated = asyncHandler(async (req, res) => {
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

	try {
		jwt.verify(token, jwtSecret);
	} catch (err) {
		res.sendStatus(403);
		return;
	}

	res.sendStatus(202);
});
