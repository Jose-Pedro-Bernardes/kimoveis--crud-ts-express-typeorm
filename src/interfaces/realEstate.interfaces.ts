import { z } from "zod";
import {
  realEstatePayloadSchema,
  realEstateSchema,
} from "../schemas/realEstate.schemas";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateRequest = z.infer<typeof realEstatePayloadSchema>;

export { TRealEstate, TRealEstateRequest };
