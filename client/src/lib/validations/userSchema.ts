import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string().min(1, 'Enter username'),
	password: z.string().min(1, 'Enter password'),
});
