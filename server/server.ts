import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { initializeSockets } from './socket';
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

initializeSockets(io);

if (process.env.DEV_TYPE === 'host') {
	httpServer.listen(3000, '0.0.0.0', () =>
		console.log('Server is running on port http://0.0.0.0:3000')
	);
} else {
	httpServer.listen(3000, () => console.log('Server is running on port 3000'));
}
