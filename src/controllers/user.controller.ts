import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
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
    const userloggedInId: string = req.user.id;
    const updatedUser = await updateUserService(userData, userId, userloggedInId);
    return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const deleteUser = await deleteUserService(userId);
    return res.json(deleteUser);
};

export { createUserController, listUserController, updateUserController, deleteUserController };