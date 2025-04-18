import { PrismaClient, ServiceStatus } from '@prisma/client'
import { ServiceType } from './service.interface'

const prisma = new PrismaClient()

const resStatus: Record<ServiceStatus, string> = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
}

const createServiceDataIntoDB = async (serviceInfo: ServiceType) => {
  const mappingStatus: Record<string, ServiceStatus> = {
    pending: ServiceStatus.PENDING,
    'in-progress': ServiceStatus.IN_PROGRESS,
    done: ServiceStatus.DONE,
  }
  const actualStatus = mappingStatus[serviceInfo.status]

  const jsonData = {
    ...serviceInfo,
    status: actualStatus,
  }

  const result = await prisma.service.create({
    data: jsonData,
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })
  return {
    ...result,
    status: resStatus[result.status],
  }
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
  return result.map(res => {
    return {
      ...res,
      status: resStatus[res.status],
    }
  })
}

const getServiceDataByStatusFromDB = async () => {
  const serviceDate = new Date()
  serviceDate.setDate(serviceDate.getDate() - 7)
  const result = await prisma.service.findMany({
    where: {
      AND: [
        { deleted: false },
        {
          OR: [
            {
              status: {
                in: [ServiceStatus.PENDING, ServiceStatus.IN_PROGRESS],
              },
            },
            { createdAt: { lt: serviceDate } },
          ],
        },
      ],
    },
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })
  return result.map(res => {
    return {
      ...res,
      status: resStatus[res.status],
    }
  })
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

  return {
    ...result,
    status: resStatus[result.status],
  }
}

const updateSpecificServiceDataFromDB = async (
  id: string,
  data: Partial<ServiceType>,
) => {
  const result = await prisma.service.update({
    where: { serviceId: id },
    data: { ...data, status: ServiceStatus.DONE },
    select: {
      serviceId: true,
      bikeId: true,
      serviceDate: true,
      completionDate: true,
      description: true,
      status: true,
    },
  })

  return {
    ...result,
    status: resStatus[result.status],
  }
}

export const ServiceServices = {
  createServiceDataIntoDB,
  getServiceDataFromDB,
  getSpecificServiceDataFromDB,
  updateSpecificServiceDataFromDB,
  getServiceDataByStatusFromDB,
}
