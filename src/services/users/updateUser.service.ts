import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { IUserUpdate, IUser } from '../../interfaces/users/index';
import { userResponseSerializer } from '../../serializers/user.serializers';

const updateUserService = async ( userData: IUserUpdate, userId: string ): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ id: userId });

    const updateUser = userRepository.create({ ...findUser, ...userData });
    await userRepository.save(updateUser);

    const updateUserResponse = await userResponseSerializer.validate(updateUser, {
        stripUnknown: true
    });

    return updateUserResponse;
};

export { updateUserService };