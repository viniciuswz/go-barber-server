import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPaylaod {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token in not provider', 401);
    }
    const { secret } = authConfig.jwt;

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, secret);

        const { sub } = decoded as ITokenPaylaod;
        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
