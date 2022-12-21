import { Router } from 'express';
import { createUserController } from '../controllers/user.controller';
import { ensureDataIsValidMiddleware } from '../middleware/ensureDataIsValid.middleware';
import { userCreateSerializer } from '../serializers/user.serializers';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSerializer), createUserController);

export default userRoutes
