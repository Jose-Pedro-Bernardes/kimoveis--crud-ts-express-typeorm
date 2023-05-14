import { z } from "zod";
import {
  justScheduleDataSchema,
  schedulePayloadSchema,
  scheduleSchema,
} from "../schemas/schedules.schemas";

type TSchedule = z.infer<typeof scheduleSchema>;
type TSchedulePayload = z.infer<typeof schedulePayloadSchema>;
type TScheduleData = z.infer<typeof justScheduleDataSchema>;

export { TSchedule, TSchedulePayload, TScheduleData };
