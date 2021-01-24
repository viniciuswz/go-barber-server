import { startOfHour } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
    }: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentsInSameDate) {
            throw new AppError('this appointment already booked');
        }
        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
