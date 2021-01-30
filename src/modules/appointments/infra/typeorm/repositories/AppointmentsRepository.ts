import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { getMonth, getYear } from 'date-fns';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment || undefined;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async findAllInMonthFromProvider({
        month,
        provider_id,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldNAme => {
                    return `to_chart(${dateFieldNAme}, 'MM-YYYY') = '${parsedMonth}-${year}'`;
                }),
            },
        });
        const findAppointment = appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return findAppointment;
    }

    public async findAllInDayFromProvider({
        month,
        provider_id,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldNAme => {
                    return `to_chart(${dateFieldNAme}, 'MM-DD-YYYY') = '${parsedMonth}-${parsedDay}-${year}'`;
                }),
            },
        });
        const findAppointment = appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return findAppointment;
    }
}

export default AppointmentsRepository;
