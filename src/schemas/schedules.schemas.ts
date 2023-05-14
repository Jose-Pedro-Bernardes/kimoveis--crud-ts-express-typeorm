import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  userId: z.number(),
});

const schedulePayloadSchema = scheduleSchema.omit({
  id: true,
  userId: true,
});

const justScheduleDataSchema = scheduleSchema.omit({
  id: true,
  realEstateId: true,
  userId: true,
});

export { scheduleSchema, schedulePayloadSchema, justScheduleDataSchema };
