import sendResponse from '../../app/middleware/sendResponse'
import catchAsync from '../../app/utils/catchAsync'
import { ServiceServices } from './services.service'

const createServiceRequestController = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceDataIntoDB(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service record created successfully',
    data: result,
  })
})

const getServiceRequestController = catchAsync(async (req, res) => {
  const result = await ServiceServices.getServiceDataFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service records fetched successfully',
    data: result,
  })
})

const getSpecificServiceRequestController = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const result = await ServiceServices.getSpecificServiceDataFromDB(serviceId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service record fetched successfully',
    data: result,
  })
})

const updateSpecificServiceRequestController = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const result = await ServiceServices.updateSpecificServiceDataFromDB(
    serviceId,
    req.body,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service marked as completed',
    data: result,
  })
})

export const ServiceControllers = {
  createServiceRequestController,
  getServiceRequestController,
  getSpecificServiceRequestController,
  updateSpecificServiceRequestController,
}
