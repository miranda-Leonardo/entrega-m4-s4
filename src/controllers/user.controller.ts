import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService } from "../services/users/createUser.service";
import { listUserService } from "../services/users/listUser.service";
import { updateUserService } from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body;
    const newUser = await createUserService(userData);
    return res.status(201).json(newUser);
};

const listUserController = async (req: Request, res: Response) => {
    const users = await listUserService();
    return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
    const userData: IUserUpdate = req.body;
    const userId: string = req.params.id;
    const updatedUser = await updateUserService(userData, userId);
    return res.json(updatedUser);
};

export { createUserController, listUserController, updateUserController };