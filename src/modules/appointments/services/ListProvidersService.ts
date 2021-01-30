import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    user_id?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.userRepository.findAllProviders({
            expect_user_id: user_id,
        });

        return users;
    }
}

export default UpdateProfileService;
