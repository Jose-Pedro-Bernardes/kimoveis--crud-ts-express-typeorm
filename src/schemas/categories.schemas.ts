import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categoryPayloadSchema = categorySchema.omit({ id: true });

export { categorySchema, categoryPayloadSchema };
