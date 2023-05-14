import { DeepPartial, Repository } from "typeorm";
import Address from "../../entities/address.entity";
import Category from "../../entities/category.entity";
import RealEstate from "../../entities/realEstate.entity";

import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

import { TRealEstateRequest } from "../../interfaces/realEstate.interfaces";
import { TAddressPayload } from "../../interfaces/address.interfaces";
import { TCategory } from "../../interfaces/categories.interfaces";

import { realEstateSchemaWithoutAddress } from "../../schemas/realEstate.schemas";

const addressRepository: Repository<Address> =
  AppDataSource.getRepository(Address);
const categoryRepository: Repository<Category> =
  AppDataSource.getRepository(Category);
const realEstateRepository: Repository<RealEstate> =
  AppDataSource.getRepository(RealEstate);

const createRealEstateService = async (requestData: TRealEstateRequest) => {
  const findAddress: Address | null = await addressRepository.findOneBy({
    city: requestData.address.city,
    street: requestData.address.street,
    state: requestData.address.state,
    zipCode: requestData.address.zipCode,
    number: requestData.address.number ? requestData.address.number : "",
  });

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }

  const addressData: TAddressPayload = requestData.address;

  const address: Address = addressRepository.create(
    addressData as DeepPartial<Address>
  );
  await addressRepository.save(address);

  const category: TCategory | null = await categoryRepository.findOneBy({
    id: requestData.categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const sendInfo = realEstateSchemaWithoutAddress.parse(requestData);

  const realEstate: RealEstate = realEstateRepository.create({
    ...sendInfo,
    address: address,
    category: category,
  });
  await realEstateRepository.save(realEstate);

  return realEstate;
};

export { createRealEstateService };
