import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import ProfileControllers from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthenticate);
const usersControllers = new ProfileControllers();

profileRouter.get('/', usersControllers.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
            old_password: Joi.string(),
        },
    }),
    usersControllers.update,
);

export default profileRouter;
