import { Repository } from "typeorm";
import {
  TCategory,
  TCategoryPayload,
} from "../../interfaces/categories.interfaces";
import Category from "../../entities/category.entity";
import { AppDataSource } from "../../data-source";

const registerCategoryService = async (
  categoryData: TCategoryPayload
): Promise<TCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: TCategory = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  return category;
};

export { registerCategoryService };
