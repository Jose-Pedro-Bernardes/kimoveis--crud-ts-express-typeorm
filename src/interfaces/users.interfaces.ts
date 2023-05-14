import { z } from "zod";
import {
  listUsersResSchema,
  userPayloadSchema,
  userResSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TUserPayload = z.infer<typeof userPayloadSchema>;
type TUserResponse = z.infer<typeof userResSchema>;
type TUserUpdate = DeepPartial<typeof userUpdateSchema>;
type TUsersResponse = z.infer<typeof listUsersResSchema>;

export { TUser, TUserPayload, TUserResponse, TUserUpdate, TUsersResponse };
