import { Repository } from "typeorm";
import { TScheduleData } from "../../interfaces/schedules.interfaces";
import RealEstate from "../../entities/realEstate.entity";
import User from "../../entities/user.entity";
import Schedule from "../../entities/schedule.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Response, request } from "express";

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const realEstateRepository: Repository<RealEstate> =
  AppDataSource.getRepository(RealEstate);
const scheduleRepository: Repository<Schedule> =
  AppDataSource.getRepository(Schedule);

const createScheduleService = async (
  requestData: TScheduleData,
  userId: number,
  realEstateId: number
) => {
  await verifyDaysOfTheWeek(requestData);

  const realEstate = await getRealEstate(realEstateId);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const hour = Number(requestData.hour.slice(0, 2));
  const minute = Number(requestData.hour.slice(3, 5));
  if (hour < 8 || hour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const userBooked: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date: requestData.date })
    .andWhere("schedule.hour = :hour", { hour: requestData.hour })
    .andWhere("schedule.userId = :userId", { userId })
    .getOne();

  if (userBooked) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const scheduleBooked: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date: requestData.date })
    .andWhere("schedule.hour = :hour", { hour: requestData.hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getOne();

  if (scheduleBooked) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const newSchedule: Schedule = scheduleRepository.create({
    hour: requestData.hour,
    date: requestData.date.toString(),
    realEstate: realEstate,
    user: user!,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

const verifyDaysOfTheWeek = async (
  requestData: TScheduleData
): Promise<Response | void> => {
  const date = new Date(requestData.date);
  const dayOfTheWeek = date.getDay();

  if (dayOfTheWeek == 0 || dayOfTheWeek == 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
};

const getRealEstate = async (realEstateId: number) => {
  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};

export { createScheduleService };
