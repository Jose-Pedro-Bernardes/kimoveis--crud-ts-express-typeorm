import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userPayloadSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userResSchema = userSchema.omit({
  password: true,
});

const userUpdateSchema = userPayloadSchema.omit({ admin: true }).partial();

const listUsersResSchema = z.array(userResSchema);

export {
  userSchema,
  userPayloadSchema,
  userResSchema,
  userUpdateSchema,
  listUsersResSchema,
};
