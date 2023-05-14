import { Repository } from "typeorm";
import RealEstate from "../../entities/realEstate.entity";
import { AppDataSource } from "../../data-source";

const getRealEstateService = async () => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate[] | undefined = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return realEstate;
};

export { getRealEstateService };
