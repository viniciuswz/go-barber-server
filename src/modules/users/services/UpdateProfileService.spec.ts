// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileProvider: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileProvider = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able update profile', async () => {
        // const user =

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userUpdated = await updateProfileProvider.execute({
            user_id: user.id,
            name: 'Jonas',
            email: 'jonasdoe@example.com',
        });

        expect(userUpdated.name).toBe('Jonas');
        expect(userUpdated.email).toBe('jonasdoe@example.com');
    });
    it('should not be able update profile with a non-existing user', async () => {
        // const user =

        await expect(
            updateProfileProvider.execute({
                user_id: 'non-existing-user',
                name: 'Jonas',
                email: 'jonasdoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to change to another user email', async () => {
        // const user =

        await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(
            updateProfileProvider.execute({
                user_id: user.id,
                name: 'Jonas',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should be able to updated the password', async () => {
        // const user =

        const user = await fakeUsersRepository.create({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        });
        const userUpdated = await updateProfileProvider.execute({
            user_id: user.id,
            name: 'Jonas',
            email: 'johndoe@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(userUpdated.password).toBe('123123');
    });

    it('should be not able to updated the password without old password', async () => {
        // const user =

        const user = await fakeUsersRepository.create({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(
            updateProfileProvider.execute({
                user_id: user.id,
                name: 'Jonas',
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should be not able to updated the password wrong old password', async () => {
        // const user =

        const user = await fakeUsersRepository.create({
            name: 'test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(
            updateProfileProvider.execute({
                user_id: user.id,
                name: 'Jonas',
                email: 'johndoe@example.com',
                old_password: '111111',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
