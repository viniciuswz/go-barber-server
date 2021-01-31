import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year, day } = request.body;

        const { provider_id } = request.params;

        const listProviderDayAvailability = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const providers = await listProviderDayAvailability.execute({
            month,
            day,
            provider_id,
            year,
        });

        return response.json(providers);
    }
}