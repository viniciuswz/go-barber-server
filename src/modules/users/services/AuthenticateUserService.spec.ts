import FakeUsersRepository from '../repositories/fakes/UsersRepository';
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
});
