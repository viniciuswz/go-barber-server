// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',
            date: new Date(2021, 1, 2, 8, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 9, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 10, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 11, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 12, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 13, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 14, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 15, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 16, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 2, 17, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',

            date: new Date(2021, 1, 3, 23, 0, 0),
        });

        const avalability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2021,
            month: 2,
        });

        expect(avalability).toEqual(
            expect.arrayContaining([
                { day: 2, available: false },
                { day: 3, available: true },
                { day: 4, available: true },
                { day: 5, available: true },
            ]),
        );

        // expect(providers).toEqual([userOne, userTwo]);
    });
});
