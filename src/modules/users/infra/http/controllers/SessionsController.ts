import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: user.avatar,
        };
        return response.json({ user: userWithoutPassword, token });
    }
}
