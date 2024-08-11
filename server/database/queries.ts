import Message from '../types/message';
import pool from './pool';

export async function getMessages(): Promise<Message[]> {
	const { rows } = await pool.query('SELECT * FROM messages');

	return rows;
}

export async function createMessage(
	message: string,
	sender: string
): Promise<void> {
	await pool.query('INSERT INTO messages (message, sender) VALUES ($1, $2)', [
		message,
		sender,
	]);
}
