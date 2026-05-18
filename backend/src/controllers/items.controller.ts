import { Request, Response } from 'express'
import { InventoryService } from '../services/inventory.service'

let inventoryService: InventoryService | null = null

export function setInventoryService(svc: InventoryService) {
  inventoryService = svc
}

export function getItems(req: Request, res: Response) {
  if (!inventoryService) {
    return res.status(503).json({ error: 'Bot not ready' })
  }
  const items = inventoryService.getInventory()
  res.json(items)
}
