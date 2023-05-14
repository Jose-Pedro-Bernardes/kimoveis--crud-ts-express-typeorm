import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/token/ensureTokenIsValid.middleware";
import { ensurePayloadIsValidMiddleware } from "../middlewares/payloadValidations/ensurePayloadIsValid.middleware";
import { categoryPayloadSchema } from "../schemas/categories.schemas";
import { ensureCategoryExistMiddleware } from "../middlewares/payloadValidations/ensureCategoryExist.middleware";
import {
  createCategoryController,
  listCategoriesByIdController,
  listCategoriesController,
} from "../controllers/categories.controllers";
import { justIsAdminMiddleware } from "../middlewares/token/ensureIsAdmin.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensurePayloadIsValidMiddleware(categoryPayloadSchema),
  justIsAdminMiddleware,
  ensureCategoryExistMiddleware,
  createCategoryController
);

categoriesRoutes.get("", listCategoriesController);

categoriesRoutes.get("/:id/realEstate", listCategoriesByIdController);

export default categoriesRoutes;
