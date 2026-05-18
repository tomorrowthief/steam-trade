import { Request, Response } from 'express'
import { TradeService } from '../services/trade.service'
import { InventoryService } from '../services/inventory.service'
import { readJson, appendJson, updateJson } from '../services/storage.service'
import { Order } from '../types'

let tradeService: TradeService | null = null
let inventoryService: InventoryService | null = null
const pendingLocks = new Set<string>()

export function setServices(trade: TradeService, inv: InventoryService) {
  tradeService = trade
  inventoryService = inv
}

export async function createOrder(req: Request, res: Response) {
  if (!req.session?.steamId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { assetId, tradeUrl } = req.body as { assetId: string; tradeUrl: string }

  if (!assetId || !tradeUrl) {
    return res.status(400).json({ error: 'assetId and tradeUrl are required' })
  }

  if (!inventoryService?.hasItem(assetId)) {
    return res.status(404).json({ error: 'Item not found in bot inventory' })
  }

  if (pendingLocks.has(assetId)) {
    return res.status(409).json({ error: 'Item is being processed' })
  }

  pendingLocks.add(assetId)

  try {
    const orders = await readJson<Order>('orders')
    const id = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1

    const order: Order = {
      id,
      buyerSteamId: req.session.steamId,
      assetId,
      tradeOfferId: null,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await appendJson('orders', order)

    const { offerId } = await tradeService!.createTradeOffer(tradeUrl, assetId)

    order.tradeOfferId = offerId
    order.status = 'OFFER_SENT'
    order.updatedAt = new Date().toISOString()

    await updateJson<Order>('orders', (o) => o.id === id, () => order)
    tradeService!.linkOfferToOrder(offerId, id)

    res.json({ orderId: id, status: order.status })
  } catch (err) {
    console.error('[Orders] Failed to create order:', err)
    res.status(500).json({ error: 'Failed to create order' })
  } finally {
    pendingLocks.delete(assetId)
  }
}

export async function getOrder(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10)
  const orders = await readJson<Order>('orders')
  const order = orders.find((o) => o.id === id)
  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }
  res.json(order)
}

export async function getOrders(req: Request, res: Response) {
  if (!req.session?.steamId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const orders = await readJson<Order>('orders')
  const myOrders = orders.filter((o) => o.buyerSteamId === req.session!.steamId)
  res.json(myOrders)
}
