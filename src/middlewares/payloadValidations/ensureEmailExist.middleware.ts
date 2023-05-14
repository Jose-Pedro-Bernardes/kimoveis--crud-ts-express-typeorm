import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const ensureEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: payload.email,
    },
  });

  if (user?.email === payload.email) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export { ensureEmailExistMiddleware };
