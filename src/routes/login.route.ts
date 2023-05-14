import { Router } from "express";
import { ensurePayloadIsValidMiddleware } from "../middlewares/payloadValidations/ensurePayloadIsValid.middleware";
import { loginSchema } from "../schemas/login.schemas";
import { createSessionController } from "../controllers/login.controllers";

const loginRoute: Router = Router();

loginRoute.post(
  "",
  ensurePayloadIsValidMiddleware(loginSchema),
  createSessionController
);

export default loginRoute;
