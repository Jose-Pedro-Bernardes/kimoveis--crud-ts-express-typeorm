import { z } from "zod";
import {
  categoryPayloadSchema,
  categorySchema,
} from "../schemas/categories.schemas";

type TCategory = z.infer<typeof categorySchema>;
type TCategoryPayload = z.infer<typeof categoryPayloadSchema>;

export { TCategory, TCategoryPayload };
