import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import Schedule from "../../entities/schedule.entity";
import { AppError } from "../../errors";

const getSchedulesService = async (realEstateId: number) => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .where("realEstate.id = :id", { id: realEstateId })
    .leftJoinAndSelect("realEstate.schedules", "schedule")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .leftJoinAndSelect("schedule.user", "user")
    .getOne();

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};

export { getSchedulesService };
