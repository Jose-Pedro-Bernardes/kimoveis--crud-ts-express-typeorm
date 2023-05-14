import { Repository } from "typeorm";
import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { listUsersResSchema } from "../../schemas/users.schemas";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { Request, Response } from "express";
import { AppError } from "../../errors";

const listUsersService = async (
  req: Request,
  res: Response
): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const isAdmin = res.locals.token.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const users: User[] | undefined = await userRepository.find();
  const usersResponse: TUsersResponse = listUsersResSchema.parse(users);

  return usersResponse;
};

export { listUsersService };
