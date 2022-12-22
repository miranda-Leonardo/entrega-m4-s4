import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (userId: string): Promise<object> => {
    if(userId.length !== 36) {
        throw new AppError('User not exists!', 404);
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if(!user) {
        throw new AppError('User not exists!', 404);
    }

    if(!user.isActive) {
        throw new AppError('User alread deleted!', 400);
    };
    
    await userRepository.update({ id: user.id }, { isActive: false });

    // await userRepository.softRemove(user);
    // await userRepository.save(user);

    return {};
};

export { deleteUserService };