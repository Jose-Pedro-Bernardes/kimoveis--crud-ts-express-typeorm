import { Request, Response } from "express";
import { TCategoryPayload } from "../interfaces/categories.interfaces";
import { registerCategoryService } from "../services/categories/createCategory.service";
import { listCategoriesService } from "../services/categories/listCategories.service";
import { listCategoriesByIdService } from "../services/categories/categoryById.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryPayload = req.body;

  const newCategory = await registerCategoryService(categoryData);

  return res.status(201).json(newCategory);
};

const listCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listCategoriesService();
  return res.json(categories);
};

const listCategoriesByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = Number(req.params.id);

  const categories = await listCategoriesByIdService(categoryId);

  return res.json(categories);
};

export {
  createCategoryController,
  listCategoriesController,
  listCategoriesByIdController,
};
