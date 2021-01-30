import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
// import User from '../infra/typeorm/entities/User';

import { isAfter, addHours } from 'date-fns';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IhashProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exist');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exist');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user);
    }
}

export default SendForgotPasswordEmailService;
