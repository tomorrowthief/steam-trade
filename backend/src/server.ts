import http from 'http'
import { Server } from 'socket.io'
import { createApp } from './app'
import { config } from './config/env'
import { SteamService } from './services/steam.service'
import { InventoryService } from './services/inventory.service'
import { TradeService } from './services/trade.service'
import { setInventoryService } from './controllers/items.controller'
import { setServices } from './controllers/orders.controller'
import { setupSocket } from './socket'

async function bootstrap() {
  console.log('[App] Starting Steam TradeOffer MVP...')

  // Initialize Steam Bot
  const steamService = new SteamService()
  const inventoryService = new InventoryService(steamService.community)
  const tradeService = new TradeService(steamService.manager, inventoryService)

  // Share services with controllers
  setInventoryService(inventoryService)
  setServices(tradeService, inventoryService)

  // Login Bot (non-blocking - server starts even if Bot fails)
  console.log('[App] Logging in Bot...')
  steamService.login()
    .then(async () => {
      console.log('[App] Bot logged in successfully')
      await new Promise<void>((resolve) => {
        const handler = async (cookies: string[]) => {
          steamService.off('webSession', handler)
          if (steamService.steamId) {
            try {
              await inventoryService.loadBotInventory(steamService.steamId)
            } catch (err) {
              console.warn('[App] Failed to load bot inventory, will retry on demand')
            }
          }
          resolve()
        }
        steamService.on('webSession', handler)
      })
    })
    .catch((err) => {
      console.warn('[App] Bot login failed:', err.message, '- server will start in degraded mode')
    })

  // Create Express app
  const app = createApp()
  const server = http.createServer(app)

  // Setup Socket.io
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', credentials: true },
  })
  setupSocket(io, tradeService)

  // Start server
  server.listen(config.port, () => {
    console.log(`[App] Backend listening on http://localhost:${config.port}`)
  })
}

bootstrap().catch((err) => {
  console.error('[App] Failed to start:', err)
  process.exit(1)
})
