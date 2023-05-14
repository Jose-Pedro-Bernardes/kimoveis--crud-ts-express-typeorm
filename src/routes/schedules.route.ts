import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/token/ensureTokenIsValid.middleware";
import { ensurePayloadIsValidMiddleware } from "../middlewares/payloadValidations/ensurePayloadIsValid.middleware";
import { schedulePayloadSchema } from "../schemas/schedules.schemas";
import {
  createScheduleController,
  getScheduleController,
} from "../controllers/schedules.controllers";
import { justIsAdminMiddleware } from "../middlewares/token/ensureIsAdmin.middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensurePayloadIsValidMiddleware(schedulePayloadSchema),
  createScheduleController
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  justIsAdminMiddleware,
  getScheduleController
);

export default schedulesRoutes;
