import { Router } from 'express'
import { BikeRoutes } from '../../modules/bikes/bikes.route'
import { CustomerRoutes } from '../../modules/customers/customer.route'
import { ServiceRoutes } from '../../modules/services/services.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
