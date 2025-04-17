import { PrismaClient } from '@prisma/client'
import { CustomerType } from './customer.interface'

const prisma = new PrismaClient()

const createCustomerDataIntoDB = async (customerInfo: CustomerType) => {
  const result = await prisma.customer.create({
    data: customerInfo,
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  })
  return result
}

const getCustomerDataFromDB = async () => {
  const result = await prisma.customer.findMany({
    where: { deleted: false },
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  })
  return result
}

const getSpecificCustomerDataFromDB = async (id: string) => {
  const result = await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  })

  return result
}

const updateSpecificCustomerDataFromDB = async (
  id: string,
  data: Partial<CustomerType>,
) => {
  const result = await prisma.customer.update({
    where: { customerId: id },
    data,
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  })

  return result
}

const deleteSpecificCustomerDataFromDB = async (id: string) => {
  await prisma.customer.update({
    where: { customerId: id },
    data: { deleted: true },
  })
}

export const CustomerServices = {
  createCustomerDataIntoDB,
  getCustomerDataFromDB,
  getSpecificCustomerDataFromDB,
  updateSpecificCustomerDataFromDB,
  deleteSpecificCustomerDataFromDB,
}
