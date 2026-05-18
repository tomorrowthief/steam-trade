import { Router } from 'express'
import { getItems } from '../controllers/items.controller'

const router: ReturnType<typeof Router> = Router()
router.get('/', getItems)

export default router
