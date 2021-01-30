// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProviderService = new ListProvidersService(fakeUsersRepository);
    });
    it('should be able to list the providers', async () => {
        const userOne = await fakeUsersRepository.create({
            email: 'johndoe@example.com',
            name: 'john doe',
            password: '123456',
        });
        const userTwo = await fakeUsersRepository.create({
            email: 'johntre@example.com',
            name: 'john tre',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            email: 'johnfor@example.com',
            name: 'john for',
            password: '123456',
        });
        const providers = await listProviderService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([userOne, userTwo]);
    });
});
