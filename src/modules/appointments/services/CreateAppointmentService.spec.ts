import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 10, 12).getTime();
        });
        const appointment = await createAppointment.execute({
            date: new Date(2021, 1, 10, 13),
            user_id: 'id',
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('should be able to create two appointment on same time', async () => {
        const date = new Date(2021, 2, 10, 11);

        await createAppointment.execute({
            date,
            user_id: 'id',
            provider_id: '123',
        });

        await expect(
            createAppointment.execute({
                date,
                user_id: 'id',
                provider_id: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 0, 10, 11),
                user_id: 'id',
                provider_id: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 0, 10, 13),
                user_id: 'id',
                provider_id: 'id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 0, 11, 7),
                user_id: 'id-not-exists',
                provider_id: 'id',
            }),
        ).rejects.toBeInstanceOf(AppError);
        await expect(
            createAppointment.execute({
                date: new Date(2021, 0, 11, 18),
                user_id: 'id-not-exists',
                provider_id: 'id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
