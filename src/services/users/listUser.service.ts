import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserCreateResponse } from "../../interfaces/users";
import { listUserSerializer } from "../../serializers/user.serializers";

const listUserService = async () => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();
    
    const listUsers = await listUserSerializer.validate(users, {
        stripUnknown: true
    });

    return listUsers;
};

export { listUserService };