import { Request, Response } from "express";
import { createScheduleService } from "../services/schedules/createNewSchedules.service";
import { TSchedulePayload } from "../interfaces/schedules.interfaces";
import { getSchedulesService } from "../services/schedules/getSchedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  const realEstateId: number = req.body.realEstateId;
  delete req.body.realEstateId;
  const requestData: TSchedulePayload = req.body;
  const userId: number = Number(res.locals.token.id);

  const newSchedule = await createScheduleService(
    requestData,
    userId,
    realEstateId
  );

  return res.status(201).json({ message: "Schedule created" });
};

const getScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = Number(req.params.id);

  const schedule = await getSchedulesService(realEstateId);
  return res.json(schedule);
};

export { createScheduleController, getScheduleController };
