// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',
            date: new Date(2077, 1, 2, 14, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'id',
            date: new Date(2077, 1, 2, 16, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2077, 1, 2, 11, 0, 0).getTime();
        });
        const avalability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            year: 2077,
            month: 2,
            day: 2,
        });
        expect(avalability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 14, available: false },
                { hour: 15, available: true },
                { hour: 16, available: false },
                { hour: 17, available: true },
            ]),
        );
        // expect(providers).toEqual([userOne, userTwo]);
    });
});
