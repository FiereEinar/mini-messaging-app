import { Message, MessageBody } from '@/types/message';
import axiosInstance from './axiosInstance';

export async function fetchMessages(): Promise<Message[] | undefined> {
	try {
		const { data } = await axiosInstance.get(`/messages`);

		const messages = data.data as Message[];

		return messages;
	} catch (err: unknown) {
		console.error('Error fetching messages', err);
	}
}

export async function createMessage(formData: MessageBody) {
	try {
		const { data } = await axiosInstance.post(`/messages`, formData);

		return data;
	} catch (err: unknown) {
		console.error('Error creating message', err);
	}
}
