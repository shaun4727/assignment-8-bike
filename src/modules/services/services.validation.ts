import { z } from 'zod'

const createServicesRequestValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({
      invalid_type_error: 'Bike ID must be string',
      required_error: 'Bike ID is required',
    }),
    serviceDate: z.string({
      invalid_type_error: 'Service Date must be string',
      required_error: 'Service Date is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    status: z.string({
      required_error: 'Status is required',
    }),
  }),
})

const updateServicesRequestValidationSchema = z.object({
  body: z.object({
    completionDate: z.string({
      required_error: 'Completion Date is required',
    }),
  }),
})

export const servicesRequestValidations = {
  createServicesRequestValidationSchema,
  updateServicesRequestValidationSchema,
}
