import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import ProfileControllers from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthenticate);
const usersControllers = new ProfileControllers();

profileRouter.put('/', usersControllers.update);
profileRouter.get('/', usersControllers.show);

export default profileRouter;
