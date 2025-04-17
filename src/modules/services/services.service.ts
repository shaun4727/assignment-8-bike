import { PrismaClient } from '@prisma/client'
import { ServiceType } from './service.interface'

const prisma = new PrismaClient()

const createServiceDataIntoDB = async (serviceInfo: ServiceType) => {
  const result = await prisma.service.create({
    data: serviceInfo,
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })
  return result
}

const getServiceDataFromDB = async () => {
  const result = await prisma.service.findMany({
    where: { deleted: false },
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })
  return result
}

const getSpecificServiceDataFromDB = async (id: string) => {
  const result = await prisma.service.findUniqueOrThrow({
    where: { serviceId: id },
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })

  return result
}

const updateSpecificServiceDataFromDB = async (
  id: string,
  data: Partial<ServiceType>,
) => {
  const result = await prisma.service.update({
    where: { serviceId: id },
    data: { ...data, status: 'done' },
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })

  return result
}

export const ServiceServices = {
  createServiceDataIntoDB,
  getServiceDataFromDB,
  getSpecificServiceDataFromDB,
  updateSpecificServiceDataFromDB,
}
