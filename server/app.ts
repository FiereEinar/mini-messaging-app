import express, { Express, Request, Response, NextFunction } from 'express';
import { HttpError } from './errors/httpError';

const app = express();

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

app.listen(3000, () => console.log('Server is running on port 3000'));
