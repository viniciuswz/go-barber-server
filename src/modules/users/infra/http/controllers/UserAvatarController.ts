import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

import { Request, Response } from 'express';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );
        const user = await updateUserAvatarService.execute({
            avatarFilename: request.file.filename,
            user_id: request.user.id,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: user.avatar,
        };
        return response.json({ user: userWithoutPassword });
    }
}
