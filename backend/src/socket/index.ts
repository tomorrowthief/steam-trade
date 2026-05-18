import { Server, Socket } from 'socket.io'
import { TradeService } from '../services/trade.service'

export function setupSocket(io: Server, tradeService: TradeService) {
  io.on('connection', (socket: Socket) => {
    console.log('[Socket] Client connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('[Socket] Client disconnected:', socket.id)
    })
  })

  tradeService.on('orderUpdated', (order) => {
    io.emit('order.updated', {
      orderId: order.id,
      status: order.status,
      assetId: order.assetId,
      tradeOfferId: order.tradeOfferId,
      updatedAt: order.updatedAt,
    })
  })
}
