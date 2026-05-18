import { Card, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

interface ItemCardProps {
  id: string
  name: string
  iconUrl: string
  quality: string
  qualityColor: string
  price: number
  salesCount: number
  rarityColor?: string
}

const STEAM_CDN = 'https://community.cloudflare.steamstatic.com/economy/image/'

export default function ItemCard({
  id,
  name,
  iconUrl,
  quality,
  qualityColor,
  price,
  salesCount,
  rarityColor,
}: ItemCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      hoverable
      cover={
        <div style={{ padding: 20, background: '#f5f5f5', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={`${STEAM_CDN}${iconUrl}`}
            alt={name}
            style={{ maxWidth: '100%', maxHeight: 140, objectFit: 'contain' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="%23ddd"><rect width="120" height="120" rx="4"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23aaa" font-size="14">CS2</text></svg>'
            }}
          />
        </div>
      }
      onClick={() => navigate(`/item/${id}`)}
      style={{ cursor: 'pointer' }}
      bodyStyle={{ padding: '12px 16px' }}
    >
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
        <Tag color={qualityColor} style={{ margin: 0, fontSize: 12 }}>{quality}</Tag>
        {rarityColor && (
          <Tag color={rarityColor} style={{ margin: 0, fontSize: 12 }}>★</Tag>
        )}
      </div>
      <div
        style={{
          fontSize: 13,
          color: '#333',
          marginBottom: 8,
          height: 36,
          overflow: 'hidden',
          lineHeight: '18px',
        }}
      >
        {name}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#e74c3c' }}>¥{price}</span>
        <span style={{ fontSize: 12, color: '#999' }}>{salesCount > 999 ? '1000+在售' : `${salesCount}在售`}</span>
      </div>
    </Card>
  )
}
