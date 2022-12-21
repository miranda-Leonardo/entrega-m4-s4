import { Router } from 'express';
import { createUserController, listUserController, updateUserController } from '../controllers/user.controller';
import { ensureAuthMiddleware } from '../middleware/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middleware/ensureDataIsValid.middleware';
import { userCreateSerializer, userUpdateSerializer } from '../serializers/user.serializers';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSerializer), createUserController);
userRoutes.get('', ensureAuthMiddleware, listUserController);
userRoutes.post('/:id', ensureDataIsValidMiddleware(userUpdateSerializer), updateUserController);

export default userRoutes
