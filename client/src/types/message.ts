export interface Message {
	id: number;
	message: string;
	sender: string;
	date: Date;
}

export interface MessageBody {
	message: string;
	sender: string;
}
