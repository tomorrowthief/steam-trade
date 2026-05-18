import TradeOfferManager from 'steam-tradeoffer-manager'
import { EventEmitter } from 'events'
import { Order, OrderStatus } from '../types'
import { readJson, updateJson } from '../services/storage.service'
import { InventoryService } from './inventory.service'

export class TradeService extends EventEmitter {
  private manager: TradeOfferManager
  private inventoryService: InventoryService
  private offerToOrderMap = new Map<string, number>()

  constructor(manager: TradeOfferManager, inventoryService: InventoryService) {
    super()
    this.manager = manager
    this.inventoryService = inventoryService
    this.setupListeners()
  }

  private setupListeners() {
    this.manager.on('sentOfferChanged', async (offer: any, oldState: any) => {
      const orderId = this.offerToOrderMap.get(offer.id)
      if (!orderId) return

      const orders = await readJson<Order>('orders')
      const order = orders.find((o) => o.id === orderId)
      if (!order) return

      const statusMap: Record<number, OrderStatus> = {
        1: 'CREATED',
        2: 'OFFER_SENT',
        3: 'PENDING_CONFIRMATION',
        4: 'ACCEPTED',
        5: 'DECLINED',
        6: 'FAILED',
      }

      const newStatus = statusMap[offer.state] || 'FAILED'

      const updated = await updateJson<Order>(
        'orders',
        (o) => o.id === orderId,
        (o) => ({ ...o, status: newStatus, updatedAt: new Date().toISOString() })
      )

      if (updated) {
        console.log(`[Trade] Order #${orderId} status: ${order.status} -> ${newStatus}`)
        this.emit('orderUpdated', updated)

        if (newStatus === 'ACCEPTED') {
          this.inventoryService.removeItem(order.assetId)
        }
      }
    })
  }

  createTradeOffer(tradeUrl: string, assetId: string): Promise<{ offerId: string; status: string }> {
    return new Promise((resolve, reject) => {
      if (!this.inventoryService.hasItem(assetId)) {
        reject(new Error(`Item ${assetId} not found in bot inventory`))
        return
      }

      const offer = this.manager.createOffer(tradeUrl)
      offer.addMyItem({
        assetid: assetId,
        appid: 730,
        contextid: 2,
      })

      offer.send((err: Error | null, status: string) => {
        if (err) {
          reject(err)
          return
        }
        console.log(`[Trade] Offer sent successfully, status: ${status}`)
        this.offerToOrderMap.set(offer.id, -1)
        resolve({ offerId: offer.id, status })
      })
    })
  }

  linkOfferToOrder(offerId: string, orderId: number): void {
    this.offerToOrderMap.set(offerId, orderId)
  }
}
