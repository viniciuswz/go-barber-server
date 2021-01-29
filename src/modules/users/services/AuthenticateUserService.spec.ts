import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('Should able authenticate', async () => {
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
