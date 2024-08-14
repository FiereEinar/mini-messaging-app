import { body } from 'express-validator';

export const signupValidation = [
	body('username')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Username must be atleast 1 character')
		.isLength({ max: 50 })
		.withMessage('Username must be below 50 characters')
		.toLowerCase(),

	body('password')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Password must be atleast 1 character')
		.isLength({ max: 50 })
		.withMessage('Password must be below 50 characters'),

	body('confirmPassword')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Password must be atleast 1 character')
		.isLength({ max: 50 })
		.withMessage('Password must be below 50 characters'),
];

export const loginValidation = [
	body('username')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Username must be atleast 1 character')
		.isLength({ max: 50 })
		.withMessage('Username must be below 50 characters')
		.toLowerCase(),

	body('password')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Password must be atleast 1 character')
		.isLength({ max: 50 })
		.withMessage('Password must be below 50 characters'),
];
