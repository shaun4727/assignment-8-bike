import { z } from 'zod'

const createBikeRequestValidationSchema = z.object({
  body: z.object({
    brand: z.string({
      invalid_type_error: 'Brand must be string',
      required_error: 'Brand is required',
    }),
    model: z.string({
      invalid_type_error: 'Model must be string',
      required_error: 'Model is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    customerId: z.string({
      required_error: 'Customer ID is required',
    }),
  }),
})

export const BikeRequestValidations = {
  createBikeRequestValidationSchema,
}
