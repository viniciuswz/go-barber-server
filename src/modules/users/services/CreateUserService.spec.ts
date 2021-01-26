import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('Create user', () => {
    it('should be create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUserService.execute({
            email: 'bini@bini.com',
            name: 'Bini',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should be create a duplicated email user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const email = 'bini@bini.com';

        await createUserService.execute({
            email,
            name: 'Bini',
            password: '123455',
        });

        await expect(
            createUserService.execute({
                email,
                name: 'Bini',
                password: '123455',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
