import { Repository } from "typeorm";
import { TUserPayload, TUserResponse } from "../../interfaces/users.interfaces";
import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { userResSchema } from "../../schemas/users.schemas";

const createUserService = async (
  userData: TUserPayload
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const userResponse: TUserResponse = userResSchema.parse(user);

  return userResponse;
};

export { createUserService };
