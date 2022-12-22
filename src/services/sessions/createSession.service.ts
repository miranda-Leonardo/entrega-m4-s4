import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IUserLogin } from '../../interfaces/users';
import 'dotenv/config';

const createSessionService = async ( {email, password}: IUserLogin ): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email: email });
    if(!user) {
        throw new AppError('User or password invalid!', 403);
    }

    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) {
        throw new AppError('User or password invalid!', 403);
    };

    const token = jwt.sign({}, String(process.env.SECRET_KEY), {
            expiresIn: '24h',
            subject: user.id
        }
    );

    return token;
};

export { createSessionService };