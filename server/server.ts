import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

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

if (process.env.DEV_TYPE === 'host') {
	httpServer.listen(3000, '0.0.0.0', () =>
		console.log('Server is running on port http://0.0.0.0:3000')
	);
} else {
	httpServer.listen(3000, () => console.log('Server is running on port 3000'));
}
