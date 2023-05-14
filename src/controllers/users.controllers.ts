import { Request, Response } from "express";
import {
  TUserPayload,
  TUserResponse,
  TUserUpdate,
} from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/registerUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/userUpdate.service";
import { deleteUserService } from "../services/users/softDelete.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserPayload = req.body;

  const newUser: TUserResponse = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService(req, res);
  return res.json(users);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const userData: TUserUpdate = req.body;

  const updatedUser = await updateUserService(userId, userData);

  return res.json(updatedUser);
};

const softDeleteController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  await deleteUserService(userId);

  return res.status(204).send();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  softDeleteController,
};
