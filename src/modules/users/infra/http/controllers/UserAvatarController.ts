import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

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

        return response.json(classToClass(user));
    }
}
