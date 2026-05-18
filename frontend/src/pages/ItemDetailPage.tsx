import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout, Row, Col, Button, Tag, Typography, Divider, Descriptions, Breadcrumb, message } from 'antd'
import Navbar from '../components/Navbar'
import { getItemById, items } from '../data/mockData'

const { Content } = Layout
const { Title, Text } = Typography

const STEAM_CDN = 'https://community.cloudflare.steamstatic.com/economy/image/'

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [item, setItem] = useState<ReturnType<typeof getItemById>>(undefined)

  useEffect(() => {
    if (id) {
      const found = getItemById(id)
      setItem(found || items.find((i) => i.name.includes(id || '')) || undefined)
    }
  }, [id])

  if (!item) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Navbar />
        <Content style={{ padding: 24, textAlign: 'center', marginTop: 60 }}>
          <Title level={3}>物品不存在</Title>
          <Button type="primary" onClick={() => navigate('/market')}>
            返回市场
          </Button>
        </Content>
      </Layout>
    )
  }

  const handleBuy = () => {
    navigate(`/purchase/${item.id}`)
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <Breadcrumb
            style={{ marginBottom: 16 }}
            items={[
              { title: <a onClick={() => navigate('/')}>首页</a> },
              { title: <a onClick={() => navigate('/market')}>饰品市场</a> },
              { title: item.name },
            ]}
          />

          {/* Main Content */}
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Row gutter={48}>
              {/* Left: Item Image */}
              <Col xs={24} lg={10}>
                <div
                  style={{
                    background: '#f5f5f5',
                    borderRadius: 8,
                    height: 360,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={`${STEAM_CDN}${item.iconUrl}`}
                    alt={item.name}
                    style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <div style={{ fontSize: 120, opacity: 0.3 }}></div>
                </div>
              </Col>

              {/* Right: Item Info */}
              <Col xs={24} lg={14}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <Tag color={item.qualityColor}>{item.quality}</Tag>
                  {item.rarityColor && (
                    <Tag color={item.rarityColor}>★ {item.rarity}</Tag>
                  )}
                </div>

                <Title level={3} style={{ margin: '0 0 16px' }}>{item.name}</Title>

                <Divider style={{ margin: '16px 0' }} />

                {/* Price */}
                <div style={{ marginBottom: 24 }}>
                  <Text type="secondary">价格</Text>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#e74c3c', marginTop: 8 }}>
                    ¥{item.price}
                  </div>
                </div>

                {/* Wear Value */}
                {item.wear !== undefined && (
                  <div style={{ marginBottom: 16 }}>
                    <Text type="secondary">磨损值</Text>
                    <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>
                      {item.wear.toFixed(6)}
                    </div>
                  </div>
                )}

                {/* Seller Info */}
                <div style={{ marginBottom: 24 }}>
                  <Text type="secondary">卖家</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: '#333',
                        color: '#f0c040',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                      }}
                    >
                      U
                    </div>
                    <span>文思有品官方</span>
                  </div>
                </div>

                {/* Stickers */}
                {item.stickers && item.stickers.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <Text type="secondary">印花</Text>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      {item.stickers.map((s, i) => (
                        <Tag key={i} color="blue">{s}</Tag>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sales Count */}
                <div style={{ marginBottom: 24 }}>
                  <Text type="secondary">在售数量</Text>
                  <div style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>
                    {item.salesCount} 件
                  </div>
                </div>

                {/* Action Buttons */}
                <Row gutter={16}>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      style={{ padding: '0 40px', height: 48, fontSize: 16 }}
                      onClick={handleBuy}
                    >
                      立即购买
                    </Button>
                  </Col>
                  <Col>
                    <Button size="large" style={{ height: 48, padding: '0 24px' }}>
                      加入收藏
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Item Properties */}
            <Divider />
            <Title level={4}>饰品属性</Title>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="物品名称">{item.name}</Descriptions.Item>
              <Descriptions.Item label="品质">{item.quality}</Descriptions.Item>
              <Descriptions.Item label="稀有度">{item.rarity}</Descriptions.Item>
              <Descriptions.Item label="在售数量">{item.salesCount}</Descriptions.Item>
              {item.wear !== undefined && (
                <Descriptions.Item label="磨损值">{item.wear.toFixed(6)}</Descriptions.Item>
              )}
              {item.stickers && item.stickers.length > 0 && (
                <Descriptions.Item label="印花">{item.stickers.join(', ')}</Descriptions.Item>
              )}
            </Descriptions>
          </div>
        </div>
      </Content>
    </Layout>
  )
}
