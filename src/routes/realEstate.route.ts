import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/token/ensureTokenIsValid.middleware";
import { ensurePayloadIsValidMiddleware } from "../middlewares/payloadValidations/ensurePayloadIsValid.middleware";
import { realEstatePayloadSchema } from "../schemas/realEstate.schemas";
import {
  createRealEstateController,
  getRealEstateController,
} from "../controllers/realEstate.controllers";
import { justIsAdminMiddleware } from "../middlewares/token/ensureIsAdmin.middleware";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensurePayloadIsValidMiddleware(realEstatePayloadSchema),
  justIsAdminMiddleware,
  createRealEstateController
);

realEstateRoutes.get("", getRealEstateController);

export default realEstateRoutes;
