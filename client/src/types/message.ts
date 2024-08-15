import { User } from './user';

export interface Message {
	id: number;
	message: string;
	sender: User;
	senderID: number;
	date: Date;
}

export interface MessageBody {
	message: string;
	sender: string;
}
