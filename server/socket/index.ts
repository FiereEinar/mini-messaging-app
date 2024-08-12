import { Server } from 'socket.io';

export function initializeSockets(io: Server) {
	io.on('connection', (socket) => {
		console.log('someone connected', socket.id);

		socket.on('message', () => {
			console.log('someone sent a message, emitting event...');
			io.emit('message_sent');
		});

		socket.on('disconnect', () => {
			console.log('A user disconnected');
		});
	});
}
