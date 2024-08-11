import { Message } from '@/types/message';
import axios from 'axios';

const BASE_API_URL: string = import.meta.env.VITE_BASE_API_URL;

export async function fetchMessages(): Promise<Message[] | undefined> {
	try {
		const { data } = await axios.get(`${BASE_API_URL}/messages`);

		const messages = data.data as Message[];

		return messages;
	} catch (err: unknown) {
		console.error('Error fetching messages', err);
	}
}
