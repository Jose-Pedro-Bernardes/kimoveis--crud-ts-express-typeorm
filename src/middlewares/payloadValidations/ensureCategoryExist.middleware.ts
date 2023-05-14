import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import Category from "../../entities/category.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const ensureCategoryExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryData = req.body;

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOne({
    where: {
      name: categoryData.name,
    },
  });

  if (category?.name === categoryData.name) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export { ensureCategoryExistMiddleware };
