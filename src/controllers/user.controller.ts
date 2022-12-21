import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import { createUserService } from "../services/createUser.service";
import { listUserService } from "../services/listUser.service";

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body;
    const newUser = await createUserService(userData);
    return res.status(201).json(newUser);
};

const listUserController = async (req: Request, res: Response) => {
    const users = await listUserService();
    return res.json(users);
};

export { createUserController, listUserController };