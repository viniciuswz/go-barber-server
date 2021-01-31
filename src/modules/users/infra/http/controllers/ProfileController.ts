import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { Request, Response } from 'express';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);
        const user = await showProfileService.execute({
            user_id,
        });

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;
        const updateUserAvatarService = container.resolve(UpdateProfileService);
        const user = await updateUserAvatarService.execute({
            email,
            name,
            user_id,
            old_password,
            password,
        });

        return response.json(classToClass(user));
    }
}
