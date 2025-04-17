import express from 'express'
import validateMiddleware from '../../app/middleware/validateRequest'
import { CustomerControllers } from './customer.controller'
import { customerRequestValidations } from './customer.validation'

const router = express.Router()

router.post(
  '/',
  validateMiddleware(
    customerRequestValidations.createCustomerRequestValidationSchema,
  ),
  CustomerControllers.createCustomerRequestController,
)
router.get('/', CustomerControllers.getCustomerRequestController)
router.get(
  '/:customerId',
  CustomerControllers.getSpecificCustomerRequestController,
)
router.put(
  '/:customerId',
  validateMiddleware(
    customerRequestValidations.updateCustomerRequestValidationSchema,
  ),
  CustomerControllers.updateSpecificCustomerRequestController,
)
router.delete(
  '/:customerId',
  CustomerControllers.deleteSpecificCustomerRequestController,
)

export const CustomerRoutes = router
