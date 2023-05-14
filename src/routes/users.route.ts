import { Router } from "express";
import { ensureEmailExistMiddleware } from "../middlewares/payloadValidations/ensureEmailExist.middleware";
import { userPayloadSchema, userUpdateSchema } from "../schemas/users.schemas";
import { ensurePayloadIsValidMiddleware } from "../middlewares/payloadValidations/ensurePayloadIsValid.middleware";
import {
  createUserController,
  listUsersController,
  softDeleteController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/token/ensureTokenIsValid.middleware";
import {
  ensureIsAdminMiddleware,
  justIsAdminMiddleware,
} from "../middlewares/token/ensureIsAdmin.middleware";
import { ensureUserIdIsValidMiddleware } from "../middlewares/payloadValidations/ensureIdIsValid.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensurePayloadIsValidMiddleware(userPayloadSchema),
  ensureEmailExistMiddleware,
  createUserController
);

usersRoutes.get("", ensureTokenIsValidMiddleware, listUsersController);

usersRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensurePayloadIsValidMiddleware(userUpdateSchema),
  ensureUserIdIsValidMiddleware,
  ensureIsAdminMiddleware,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIdIsValidMiddleware,
  justIsAdminMiddleware,
  softDeleteController
);

export default usersRoutes;
