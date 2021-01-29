// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfileService = new ShowProfileService(fakeUsersRepository);
    });
    it('should be able get profile by id', async () => {
        // const user =

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const receivedUser = await showProfileService.execute({
            user_id: user.id,
        });

        expect(receivedUser.name).toBe('Jonh Doe');
    });

    it('should not be able to get profile from a non-existing user', async () => {
        await expect(
            showProfileService.execute({
                user_id: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
