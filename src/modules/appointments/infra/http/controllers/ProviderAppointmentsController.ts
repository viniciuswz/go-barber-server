import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppoinmentsService from '@modules/appointments/services/ListProviderAppoinmentsService';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        const { year, month, day } = request.query;

        const listProviderAppointment = container.resolve(
            ListProviderAppoinmentsService,
        );

        const appointments = await listProviderAppointment.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(appointments);
    }
}
