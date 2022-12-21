import { Router } from 'express';
import { createUserController, listUserController } from '../controllers/user.controller';
import { ensureAuthMiddleware } from '../middleware/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middleware/ensureDataIsValid.middleware';
import { userCreateSerializer } from '../serializers/user.serializers';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSerializer), createUserController);
userRoutes.get('', ensureAuthMiddleware, listUserController);

export default userRoutes
