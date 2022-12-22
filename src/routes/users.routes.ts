import { Router } from 'express';
import { createUserController, deleteUserController, listUserController, updateUserController } from '../controllers/user.controller';
import { ensureAuthMiddleware } from '../middleware/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middleware/ensureDataIsValid.middleware';
import { ensureIsAdmMiddleware } from '../middleware/isAdm.middleware';
import { userCreateSerializer, userUpdateSerializer } from '../serializers/user.serializers';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSerializer), createUserController);
userRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUserController);
userRoutes.post('/:id', ensureDataIsValidMiddleware(userUpdateSerializer), updateUserController);
userRoutes.delete('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController);

export default userRoutes
