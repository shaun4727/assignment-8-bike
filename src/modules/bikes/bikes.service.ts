import { PrismaClient } from '@prisma/client'
import { Bike } from './bikes.interface'

const prisma = new PrismaClient()

const createBikeDataIntoDB = async (bikeInfo: Bike) => {
  const result = await prisma.bike.create({
    data: bikeInfo,
    select: {
      bikeId: true,
      brand: true,
      model: true,
      year: true,
      customerId: true,
    },
  })
  return result
}

const getBikeDataFromDB = async () => {
  const result = await prisma.bike.findMany({
    where: { deleted: false },
    select: {
      bikeId: true,
      brand: true,
      model: true,
      year: true,
      customerId: true,
    },
  })
  return result
}

const getSpecificBikeDataFromDB = async (id: string) => {
  const result = await prisma.bike.findUniqueOrThrow({
    where: { bikeId: id },
    select: {
      bikeId: true,
      brand: true,
      model: true,
      year: true,
      customerId: true,
    },
  })

  return result
}

export const BikeServices = {
  createBikeDataIntoDB,
  getBikeDataFromDB,
  getSpecificBikeDataFromDB,
}
