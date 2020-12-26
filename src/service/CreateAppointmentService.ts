import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../errors/AppError';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({
        date,
        provider_id,
    }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await appointmentsRepository.findbyDate(
            appointmentDate,
        );

        if (findAppointmentsInSameDate) {
            throw new AppError('this appointment already booked');
        }
        const appointment = appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
