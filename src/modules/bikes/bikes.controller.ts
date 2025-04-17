import sendResponse from '../../app/middleware/sendResponse'
import catchAsync from '../../app/utils/catchAsync'
import { BikeServices } from './bikes.service'

const createBikeRequestController = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeDataIntoDB(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Bike added successfully!',
    data: result,
  })
})

const getBikeRequestController = catchAsync(async (req, res) => {
  const result = await BikeServices.getBikeDataFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bikes fetched successfully',
    data: result,
  })
})

const getSpecificBikeRequestController = catchAsync(async (req, res) => {
  const { bikeId } = req.params
  const result = await BikeServices.getSpecificBikeDataFromDB(bikeId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike fetched successfully',
    data: result,
  })
})

export const BikeControllers = {
  createBikeRequestController,
  getBikeRequestController,
  getSpecificBikeRequestController,
}
