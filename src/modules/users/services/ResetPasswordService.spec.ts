import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUsersTokensRepository,
            fakeHashProvider,
        );
    });
    it('should be to recover the password using the email', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123456',
        });

        const { token } = await fakeUsersTokensRepository.generated(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with a non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                password: '1233123',
                token: 'non-existing-token',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with a non-existing user', async () => {
        const { token } = await fakeUsersTokensRepository.generated(
            'non-existing-user',
        );
        await expect(
            resetPasswordService.execute({
                password: '1233123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to reset the password if passed more than 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123456',
        });

        const { token } = await fakeUsersTokensRepository.generated(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordService.execute({
                password: '123123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
