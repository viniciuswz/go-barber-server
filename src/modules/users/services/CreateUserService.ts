import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IhashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, name, password }: IRequest): Promise<User> {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email already user');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
