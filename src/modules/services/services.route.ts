import express from 'express'
import validateMiddleware from '../../app/middleware/validateRequest'
import { ServiceControllers } from './services.controller'
import { servicesRequestValidations } from './services.validation'

const router = express.Router()

router.post(
  '/',
  validateMiddleware(
    servicesRequestValidations.createServicesRequestValidationSchema,
  ),
  ServiceControllers.createServiceRequestController,
)

router.get('/', ServiceControllers.getServiceRequestController)
router.get('/status', ServiceControllers.getServiceRequestByStatusController)

router.get(
  '/:serviceId',
  ServiceControllers.getSpecificServiceRequestController,
)

router.put(
  '/:serviceId',
  validateMiddleware(
    servicesRequestValidations.updateServicesRequestValidationSchema,
  ),
  ServiceControllers.updateSpecificServiceRequestController,
)

export const ServiceRoutes = router
