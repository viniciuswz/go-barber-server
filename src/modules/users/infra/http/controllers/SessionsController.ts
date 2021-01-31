import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );
        const { email, password } = request.body;

        const { user, token } = await authenticateUserService.execute({
            password,
            email,
        });

        return response.json({ user: classToClass(user), token });
    }
}
