import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Create user', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be create a new user', async () => {
        const user = await createUserService.execute({
            email: 'bini@bini.com',
            name: 'Bini',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should be create a duplicated email user', async () => {
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
