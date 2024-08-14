// DEPRICATED, ALREADY USING PRISMA

import Message from '../types/message';
import pool from './pool';

export async function getMessages(): Promise<Message[]> {
	const { rows } = await pool.query('SELECT * FROM messages ORDER BY date');

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

export async function deleteMessage(messageID: string): Promise<void> {
	await pool.query('DELETE FROM messages WHERE id = ($1)', [messageID]);
}

export async function updateMessage(
	newMessage: string,
	messageID: string
): Promise<void> {
	await pool.query('UPDATE messages SET message = ($1) WHERE id = ($2)', [
		newMessage,
		messageID,
	]);
}
