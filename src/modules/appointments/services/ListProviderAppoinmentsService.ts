import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import Appointment from '../infra/typeorm/entities/Appointment';
// import ApponintmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
        day,
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `provider-appointment:${provider_id}:${year}-${month}-${day}`;
        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    day,
                    month,
                    provider_id,
                    year,
                },
            );

            await this.cacheProvider.save(cacheKey, classToClass(appointments));
        }

        // await this.cacheProvider.save('asda', 'asdasd');

        return appointments;
    }
}

export default ListProviderAppointmentsService;
