import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IUserUpdate, IUserCreateResponse } from '../../interfaces/users/index';
import { userResponseSerializer, userUpdateSerializer } from '../../serializers/user.serializers';

const updateUserService = async ( userData: IUserUpdate, userId: string, userloggedInId: string ): Promise<IUserCreateResponse> => {
    if(userId.length !== 36) {
        throw new AppError('User not exists!', 404);
    };
    
    const userRepository = AppDataSource.getRepository(User);
    
    const userLoggedIn = await userRepository.findOneBy({ id: userloggedInId });
    if( !userLoggedIn?.isAdm && (userloggedInId !== userId) ) {
        throw new AppError("You don't have admin permission!", 401);
    };

    if( !Object.keys(userData).length ) {
        throw new AppError('You cannot update this data!', 401);
    };
    
    const user = await userRepository.findOneBy({ id: userId });

    if(!user) {
        throw new AppError('User not exists!', 404);
    };

    const updateUser = await userRepository.update({ id: userId }, userData);
    const userResponse = Object.assign(user, userData)

    return userResponse;
};

export { updateUserService };