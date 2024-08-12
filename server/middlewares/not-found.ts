import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/httpError';

export function notFoundHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const error = new HttpError('Not Fount :(', 404);
	next(error);
}
