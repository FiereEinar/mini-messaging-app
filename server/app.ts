import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(
	cors({
		origin: '*',
	})
);

// routers
import messageRouter from './routes/message';
import userRouter from './routes/user';
import authRouter from './routes/auth';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/messages', messageRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
