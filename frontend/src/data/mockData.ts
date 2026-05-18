export interface Item {
  id: string
  name: string
  iconUrl: string
  quality: string
  qualityColor: string
  rarity: string
  rarityColor: string
  price: number
  salesCount: number
  wear?: number
  stickers?: string[]
}

export const categories = [
  { key: 'dagger', name: '匕首', icon: '️' },
  { key: 'pistol', name: '手枪', icon: '🔫' },
  { key: 'rifle', name: '步枪', icon: '' },
  { key: 'smg', name: '微型冲锋枪', icon: '🔫' },
  { key: 'shotgun', name: '霰弹枪', icon: '🔫' },
  { key: 'machinegun', name: '机枪', icon: '🔫' },
  { key: 'gloves', name: '手套', icon: '🧤' },
  { key: 'other', name: '其他', icon: '' },
  { key: 'sticker', name: '印花', icon: '' },
  { key: 'gear', name: '装备', icon: '⚙️' },
  { key: 'charm', name: '挂件', icon: '' },
]

export const qualities = ['品质', '略有磨损', '久经沙场', '崭新出厂', '破损不堪', '战痕累累']
export const rarities = ['普通', '军规级', '受限', '保密', '隐秘', '★ (非凡)']
export const appearances = ['外观', 'Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred']
export const colors = ['颜色', '红色', '蓝色', '绿色', '黄色', '紫色', '粉色']
export const collections = ['收藏品', '2021 年 Dust 2 收藏', 'CS20 收藏', 'Horizon 收藏']

export const items: Item[] = [
  {
    id: '1',
    name: '印花 | s1mple (金色) | 2023 巴黎',
    iconUrl: '/icons/sticker-s1mple.png',
    quality: '金色',
    qualityColor: '#d4a017',
    rarity: '★ (非凡)',
    rarityColor: '#ffd700',
    price: 174.5,
    salesCount: 132,
    stickers: ['s1mple'],
  },
  {
    id: '2',
    name: 'MP9 | 都市霸王 (略有磨损)',
    iconUrl: '/icons/mp9-hydra.png',
    quality: '略有磨损',
    qualityColor: '#a07040',
    rarity: '军规级',
    rarityColor: '#5e98d9',
    price: 13.3,
    salesCount: 208,
  },
  {
    id: '3',
    name: '裹手 (★) | 防水布胶带 (略有磨损)',
    iconUrl: '/icons/glove-guerrilla.png',
    quality: '略有磨损',
    qualityColor: '#a07040',
    rarity: '★ (隐秘)',
    rarityColor: '#eb4b4b',
    price: 652.5,
    salesCount: 105,
    wear: 0.18,
  },
  {
    id: '4',
    name: '沙漠之鹰 | 印花集 (略有磨损)',
    iconUrl: '/icons/decal-prints.png',
    quality: '略有磨损',
    qualityColor: '#a07040',
    rarity: '保密',
    rarityColor: '#d32ce6',
    price: 300,
    salesCount: 1000,
  },
  {
    id: '5',
    name: '沙漠之鹰 | 阴谋者 (崭新出厂)',
    iconUrl: '/icons/decal-conspiracy.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '军规级',
    rarityColor: '#5e98d9',
    price: 123,
    salesCount: 1000,
    wear: 0.03,
  },
  {
    id: '6',
    name: '新星 | 松石流彩 (久经沙场)',
    iconUrl: '/icons/nova-turquoise.png',
    quality: '久经沙场',
    qualityColor: '#5e98d9',
    rarity: '普通',
    rarityColor: '#b0c3d9',
    price: 0.09,
    salesCount: 398,
  },
  {
    id: '7',
    name: '毁灭之手终端机密封版',
    iconUrl: '/icons/hand-wraps-terminal.png',
    quality: '略有磨损',
    qualityColor: '#a07040',
    rarity: '隐秘',
    rarityColor: '#eb4b4b',
    price: 8.87,
    salesCount: 1000,
  },
  {
    id: '8',
    name: 'MP7 | 主板 (久经沙场)',
    iconUrl: '/icons/mp7-motherboard.png',
    quality: '久经沙场',
    qualityColor: '#5e98d9',
    rarity: '军规级',
    rarityColor: '#5e98d9',
    price: 0.19,
    salesCount: 200,
  },
  {
    id: '9',
    name: 'AWP | *嘣* (崭新出厂)',
    iconUrl: '/icons/awp-ka-boom.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '隐秘',
    rarityColor: '#eb4b4b',
    price: 3040,
    salesCount: 57,
    wear: 0.01,
  },
  {
    id: '10',
    name: 'AK-47 | 传承 (略有磨损)',
    iconUrl: '/icons/ak47-heritage.png',
    quality: '略有磨损',
    qualityColor: '#a07040',
    rarity: '保密',
    rarityColor: '#d32ce6',
    price: 409,
    salesCount: 1000,
    wear: 0.15,
  },
  {
    id: '11',
    name: 'Karambit | 多普勒 (崭新出厂)',
    iconUrl: '/icons/karambit-doppler.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 8999,
    salesCount: 12,
    wear: 0.008,
  },
  {
    id: '12',
    name: 'M4A4 | 咆哮 (久经沙场)',
    iconUrl: '/icons/m4a4-howling.png',
    quality: '久经沙场',
    qualityColor: '#5e98d9',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 12500,
    salesCount: 3,
    wear: 0.22,
    stickers: ['s1mple', 'kenny'],
  },
]

export const freeRentItems: Item[] = [
  {
    id: 'fr1',
    name: '蝴蝶刀 | 多普勒 (崭新出厂)',
    iconUrl: '/icons/butterfly-doppler.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 0,
    salesCount: 0,
  },
  {
    id: 'fr2',
    name: 'M9 刺刀 | 渐变之色 (崭新出厂)',
    iconUrl: '/icons/m9-fade.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 0,
    salesCount: 0,
  },
  {
    id: 'fr3',
    name: '运动手套 | 潘多拉之盒 (略有磨损)',
    iconUrl: '/icons/sport-gloves-pandora.png',
    quality: '略有磨损',
    qualityColor: '#a07040',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 0,
    salesCount: 0,
  },
  {
    id: 'fr4',
    name: '专业手套 | 翡翠之网 (久经沙场)',
    iconUrl: '/icons/pro-gloves-emerald.png',
    quality: '久经沙场',
    qualityColor: '#5e98d9',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 0,
    salesCount: 0,
  },
  {
    id: 'fr5',
    name: '弯刀 | 传说 (崭新出厂)',
    iconUrl: '/icons/falchion-legend.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 0,
    salesCount: 0,
  },
  {
    id: 'fr6',
    name: '猎杀者匕首 | 虎牙 (崭新出厂)',
    iconUrl: '/icons/huntsman-tiger.png',
    quality: '崭新出厂',
    qualityColor: '#4b8cff',
    rarity: '★ (隐秘)',
    rarityColor: '#ffd700',
    price: 0,
    salesCount: 0,
  },
]

export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id)
}
