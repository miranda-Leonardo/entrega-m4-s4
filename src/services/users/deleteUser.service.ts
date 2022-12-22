import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (userId: string): Promise<object> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if(!user) {
        throw new AppError('User not exists!', 404);
    }

    if(!user.isActive) {
        throw new AppError('User alread deleted!');
    }

    await userRepository.softRemove(user)
    await userRepository.save({
        ...user, 
        isActive: false
    });

    return {};
};

export { deleteUserService };