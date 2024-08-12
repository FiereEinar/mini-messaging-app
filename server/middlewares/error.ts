import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/httpError';

export function errorHandler(
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.status(err.status || 500);
	res.json({ message: err.message, error: err });
}
