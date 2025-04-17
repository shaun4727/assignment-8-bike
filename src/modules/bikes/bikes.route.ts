import express from 'express'
import validateMiddleware from '../../app/middleware/validateRequest'
import { BikeControllers } from './bikes.controller'
import { BikeRequestValidations } from './bikes.validation'

const router = express.Router()

router.post(
  '/',
  validateMiddleware(BikeRequestValidations.createBikeRequestValidationSchema),
  BikeControllers.createBikeRequestController,
)

router.get('/', BikeControllers.getBikeRequestController)

router.get('/:bikeId', BikeControllers.getSpecificBikeRequestController)

export const BikeRoutes = router
