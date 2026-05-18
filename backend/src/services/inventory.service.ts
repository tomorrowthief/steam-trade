import SteamCommunity from 'steamcommunity'
import { Item } from '../types'
import { writeJson } from './storage.service'

const CS2_APPID = 730
const CS2_CONTEXTID = 2

export class InventoryService {
  private community: SteamCommunity
  private inventory: Item[] = []

  constructor(community: SteamCommunity) {
    this.community = community
  }

  async loadBotInventory(steamId: string): Promise<Item[]> {
    const items = await new Promise<Item[]>((resolve, reject) => {
      this.community.getUserInventoryContents(steamId, CS2_APPID, CS2_CONTEXTID, true, (err: Error | null, inventory: any[]) => {
        if (err) {
          console.error('[Inventory] Failed to load bot inventory:', err.message)
          reject(err)
          return
        }

        const items: Item[] = inventory
          .filter((item: { tradable: boolean }) => item.tradable)
          .map((item: { assetid: string; classid: string; market_hash_name: string; icon_url: string; tradable: boolean }) => ({
            assetId: item.assetid,
            classId: item.classid,
            marketHashName: item.market_hash_name,
            iconUrl: item.icon_url,
            tradable: item.tradable,
            ownerType: 'BOT' as const,
          }))

        resolve(items)
      })
    })

    this.inventory = items
    await writeJson('items', items)
    console.log(`[Inventory] Loaded ${items.length} items from bot inventory`)
    return items
  }

  getInventory(): Item[] {
    return this.inventory
  }

  hasItem(assetId: string): boolean {
    return this.inventory.some((item) => item.assetId === assetId)
  }

  removeItem(assetId: string): void {
    this.inventory = this.inventory.filter((item) => item.assetId !== assetId)
  }
}
