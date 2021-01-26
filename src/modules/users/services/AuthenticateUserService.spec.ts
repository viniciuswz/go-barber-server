import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
    it('Should able authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            name: 'Bini',
            email: 'bini@bini.com',
            password: '123456',
        });

        const response = await authenticateUserService.execute({
            email: 'bini@bini.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });

    it('Shoulf able not authenticate by password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            name: 'Bini',
            email: 'bini@bini.com',
            password: '123456',
        });

        await expect(
            authenticateUserService.execute({
                email: 'bini@bini.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Shoulf able not authenticate by email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            name: 'Bini',
            email: 'bini@bini.com',
            password: '123456',
        });

        await expect(
            authenticateUserService.execute({
                email: 'jonhdoe@email.com',
                password: 'jonh',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
