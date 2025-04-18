import { ServiceStatus } from '@prisma/client'
export interface ServiceType {
  bikeId: string
  serviceDate: string
  description: string
  status: ServiceStatus
  completionDate?: string
}
