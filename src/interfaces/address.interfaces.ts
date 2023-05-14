import { z } from "zod";
import {
  addressPayloadSchema,
  addressSchema,
} from "../schemas/address.schemas";

type TAddress = z.infer<typeof addressSchema>;
type TAddressPayload = z.infer<typeof addressPayloadSchema>;

export { TAddress, TAddressPayload };
