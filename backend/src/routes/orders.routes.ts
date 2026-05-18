import { Router } from 'express'
import { createOrder, getOrder, getOrders } from '../controllers/orders.controller'
import { requireAuth } from '../middleware/auth'

const router: ReturnType<typeof Router> = Router()
router.post('/', requireAuth, createOrder)
router.get('/', requireAuth, getOrders)
router.get('/:id', requireAuth, getOrder)

export default router
