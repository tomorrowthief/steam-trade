import SteamUser from 'steam-user'
import SteamCommunity from 'steamcommunity'
import SteamTotp from 'steam-totp'
import TradeOfferManager from 'steam-tradeoffer-manager'
import { EventEmitter } from 'events'
import { config } from '../config/env'

export class SteamService extends EventEmitter {
  public client: SteamUser
  public community: SteamCommunity
  public manager: TradeOfferManager
  public steamId: string | null = null

  constructor() {
    super()

    this.client = new SteamUser()
    this.community = new SteamCommunity()
    this.manager = new TradeOfferManager({
      steam: this.client,
      community: this.community,
      language: 'en',
      pollInterval: 5000,
      cancelTime: 1800000,
    })

    this.setupEvents()
  }

  private setupEvents() {
    this.client.on('loggedOn', () => {
      console.log('[Steam] Logged in successfully')
      this.steamId = this.client.steamID?.getSteamID64() ?? null
      this.emit('loggedOn', this.steamId)
    })

    this.client.on('webSession', (sessionId: string, cookies: string[]) => {
      console.log('[Steam] Web session established')
      this.manager.setCookies(cookies, (err: Error | null) => {
        if (err) {
          console.error('[Steam] Error setting trade offer cookies:', err)
        } else {
          console.log('[Steam] TradeOfferManager cookies set')
        }
      })
      this.community.setCookies(cookies)
      this.emit('webSession', cookies)
    })

    this.client.on('steamGuard', (domain: string, callback: (code: string) => void) => {
      console.log('[Steam] Steam Guard code generated')
      const code = SteamTotp.getAuthCode(config.steamSharedSecret)
      callback(code)
    })

    this.client.on('error', (err: Error) => {
      console.error('[Steam] Error:', err.message)
    })
  }

  login(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.logOn({
        accountName: config.steamAccount,
        password: config.steamPassword,
        twoFactorCode: SteamTotp.generateAuthCode(config.steamSharedSecret),
      })

      this.client.once('loggedOn', () => resolve())
      this.client.once('error', (err: Error) => reject(err))
    })
  }

  getCookies(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client.once('webSession', (_sessionId: string, cookies: string[]) => {
        resolve(cookies)
      })
      if (this.client.steamID) {
        this.client.webLogOn()
      } else {
        reject(new Error('Not logged in'))
      }
    })
  }
}
