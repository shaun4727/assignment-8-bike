import { z } from 'zod'

const createCustomerRequestValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required',
    }),
    phone: z.string({
      invalid_type_error: 'Phone No. must be string',
      required_error: 'Phone No. is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid Email format'),
  }),
})

const updateCustomerRequestValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
        required_error: 'Name is required',
      })
      .optional(),
    phone: z
      .string({
        invalid_type_error: 'Phone No. must be string',
        required_error: 'Phone No. is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid Email format')
      .optional(),
  }),
})

export const customerRequestValidations = {
  createCustomerRequestValidationSchema,
  updateCustomerRequestValidationSchema,
}
