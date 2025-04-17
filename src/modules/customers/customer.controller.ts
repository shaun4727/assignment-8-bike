import sendResponse from '../../app/middleware/sendResponse'
import catchAsync from '../../app/utils/catchAsync'
import { CustomerServices } from './customer.service'

const createCustomerRequestController = catchAsync(async (req, res) => {
  const result = await CustomerServices.createCustomerDataIntoDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Customer created successfully',
    data: result,
  })
})

const getCustomerRequestController = catchAsync(async (req, res) => {
  const result = await CustomerServices.getCustomerDataFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  })
})

const getSpecificCustomerRequestController = catchAsync(async (req, res) => {
  const { customerId } = req.params
  const result =
    await CustomerServices.getSpecificCustomerDataFromDB(customerId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  })
})

const updateSpecificCustomerRequestController = catchAsync(async (req, res) => {
  const { customerId } = req.params
  const result = await CustomerServices.updateSpecificCustomerDataFromDB(
    customerId,
    req.body,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  })
})

const deleteSpecificCustomerRequestController = catchAsync(async (req, res) => {
  const { customerId } = req.params
  await CustomerServices.deleteSpecificCustomerDataFromDB(customerId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer deleted successfully',
  })
})

export const CustomerControllers = {
  createCustomerRequestController,
  getCustomerRequestController,
  getSpecificCustomerRequestController,
  updateSpecificCustomerRequestController,
  deleteSpecificCustomerRequestController,
}
