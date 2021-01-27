import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const resetPasswordController = container.resolve(ResetPasswordService);
        const { password, token } = request.body;

        await resetPasswordController.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}
