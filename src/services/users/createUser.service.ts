import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserCreateResponse, IUserRequest } from "../../interfaces/users";
import { userResponseSerializer } from "../../serializers/user.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUserCreateResponse> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ email: userData.email })
    if(findUser){
        throw new AppError('User already exists!', 400);
    };
    
    const createdUser = userRepository.create(userData);
    await userRepository.save(createdUser);

    const userResponse = await userResponseSerializer.validate(createdUser, { stripUnknown: true });
    
    return userResponse;
};

export { createUserService };