import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
    ) {}

    public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'only authenticated user can change avatar',
                401,
            );
        }

        if (user.avatar) {
            // deletar avatar anterior
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await this.userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
