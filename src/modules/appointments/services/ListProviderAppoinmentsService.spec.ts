// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppoinmentsService from './ListProviderAppoinmentsService';

let listProviderAppoinments: ListProviderAppoinmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppoinments = new ListProviderAppoinmentsService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list the appointments in a specific date', async () => {
        const appointmentOne = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'id',
            date: new Date(2021, 1, 2, 8, 0, 0),
        });
        const appointmentTwo = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'id',
            date: new Date(2021, 1, 2, 10, 0, 0),
        });
        const appointment = await listProviderAppoinments.execute({
            day: 2,
            month: 2,
            year: 2021,
            provider_id: 'provider',
        });
        expect(appointment).toEqual([appointmentOne, appointmentTwo]);

        // expect(providers).toEqual([userOne, userTwo]);
    });
});
