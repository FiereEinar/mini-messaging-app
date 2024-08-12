import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { HttpError } from './errors/httpError';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});
app.use(
	cors({
		origin: '*',
	})
);

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

import messageRouter from './routes/message';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json({ message: 'Hello world!' });
});

app.use('/messages', messageRouter);

app.use((req, res, next) => {
	const error = new HttpError('Not Fount :(', 404);
	next(error);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	res.status(err.status || 500);
	res.json({ message: err.message, error: err });
});

// httpServer.listen(3000, () => console.log('Server is running on port 3000'));
httpServer.listen(3000, '0.0.0.0', () =>
	console.log('Server is running on port http://0.0.0.0:3000')
);
