export type OrderStatus =
  | 'CREATED'
  | 'OFFER_SENT'
  | 'PENDING_CONFIRMATION'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'FAILED'

export interface User {
  steamId: string
  nickname: string
  avatar: string
  tradeUrl?: string
}

export interface Item {
  assetId: string
  classId: string
  marketHashName: string
  iconUrl: string
  tradable: boolean
  ownerType: 'BOT' | 'USER'
}

export interface Order {
  id: number
  buyerSteamId: string
  assetId: string
  tradeOfferId: string | null
  status: OrderStatus
  createdAt: string
  updatedAt: string
}
