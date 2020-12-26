import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPaylaod {
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
    const { expiresIn, secret } = authConfig.jwt;

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPaylaod;
        request.user = {
            id: sub,
        };
        console.log(decoded);
        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
