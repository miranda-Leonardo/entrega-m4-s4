import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IUserUpdate, IUser } from '../../interfaces/users/index';
import { userResponseSerializer, userUpdateSerializer } from '../../serializers/user.serializers';

const updateUserService = async ( userData: IUserUpdate, userId: string, userloggedInId: string ): Promise<IUser> => {
    if(userId.length !== 36) {
        throw new AppError('User not exists!', 404);
    };

    const userRepository = AppDataSource.getRepository(User);

    const userLoggedIn = await userRepository.findOneBy({ id: userloggedInId });
    if( !userLoggedIn?.isAdm && (userloggedInId !== userId) ) {
        throw new AppError("You don't have admin permission!", 401);
    };

    const user = await userRepository.findOneBy({ id: userId });

    if(!user) {
        throw new AppError('User not exists!', 404);
    };

    const updateUser = userRepository.create({ ...user, ...userData });
    await userRepository.save(updateUser);

    const updateUserResponse = await userResponseSerializer.validate(updateUser, {
        stripUnknown: true
    });

    return updateUserResponse;
};

export { updateUserService };