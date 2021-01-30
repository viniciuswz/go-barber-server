import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year } = request.body;
        const { provider_id } = request.params;

        const ListProviderMonthAvailability = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const providers = await ListProviderMonthAvailability.execute({
            month,
            provider_id,
            year,
        });

        return response.json(providers);
    }
}
