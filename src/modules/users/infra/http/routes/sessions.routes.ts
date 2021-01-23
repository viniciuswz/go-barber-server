import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const authenticateUserService = new AuthenticateUserService();
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
});

export default sessionsRouter;
