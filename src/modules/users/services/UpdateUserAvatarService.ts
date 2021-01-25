import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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

        @inject('StorageProvider')
        private storageRepository: IStorageProvider,
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
            await this.storageRepository.deleteFile(user.avatar);
        }

        const fileName = await this.storageRepository.saveFile(avatarFilename);
        user.avatar = fileName;
        await this.userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
