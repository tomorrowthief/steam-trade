declare module 'steam-user' {
  import { EventEmitter } from 'events'
  interface SteamID { getSteamID64(): string }
  class SteamUser extends EventEmitter {
    steamID: SteamID | null
    logOn(options: any): void
    webLogOn(): void
    on(event: string, listener: (...args: any[]) => void): this
    once(event: string, listener: (...args: any[]) => void): this
  }
  export default SteamUser
}

declare module 'steamcommunity' {
  class SteamCommunity {
    setCookies(cookies: string[]): void
    getUserInventoryContents(
      steamId: string,
      appId: number,
      contextId: number,
      tradableOnly: boolean,
      callback: (err: Error | null, inventory: any[]) => void
    ): void
  }
  export default SteamCommunity
}

declare module 'steam-totp' {
  export function getAuthCode(sharedSecret: string): string
  export function generateAuthCode(sharedSecret: string): string
  export function getTimeOffset(): number
  export function getConfirmationKey(identitySecret: string, tag: string, time: number): string
}

declare module 'steam-tradeoffer-manager' {
  import { EventEmitter } from 'events'
  interface TradeOffer {
    id: string
    state: number
    addMyItem(item: { assetid: string; appid: number; contextid: number }): void
    send(callback: (err: Error | null, status: string) => void): void
  }
  class TradeOfferManager extends EventEmitter {
    constructor(options: any)
    setCookies(cookies: string[], callback: (err: Error | null) => void): void
    createOffer(tradeUrl: string): TradeOffer
    on(event: string, listener: (...args: any[]) => void): this
  }
  export default TradeOfferManager
}
