import { z } from "zod";
import { addressPayloadSchema } from "./address.schemas";

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.string().or(z.number()),
  size: z.number().gt(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  addressId: z.number(),
  categoryId: z.number(),
});

const realEstatePayloadSchema = realEstateSchema
  .omit({
    id: true,
    addressId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: addressPayloadSchema,
  });

const realEstateSchemaWithoutAddress = realEstateSchema.omit({
  id: true,
  addressId: true,
  createdAt: true,
  updatedAt: true,
  categoryId: true,
});

export {
  realEstateSchema,
  realEstatePayloadSchema,
  realEstateSchemaWithoutAddress,
};
