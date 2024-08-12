import express from 'express';
import cors from 'cors';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error';

const app = express();
app.use(
	cors({
		origin: '*',
	})
);

// routers
import messageRouter from './routes/message';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/messages', messageRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
