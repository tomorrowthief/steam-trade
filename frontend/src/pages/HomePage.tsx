import { Layout, Row, Col, Button, Typography, Divider, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ItemCard from '../components/ItemCard'
import { freeRentItems, items } from '../data/mockData'

const { Content } = Layout
const { Title, Text } = Typography

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <Content>
        {/* Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #4a7cf7 0%, #2563eb 50%, #1d4ed8 100%)',
            padding: '60px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Row justify="center" align="middle" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Col xs={24} lg={14}>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 24, fontWeight: 500 }}>
                文思有品APP
              </Text>
              <Title level={1} style={{ color: '#fff', margin: '16px 0', fontSize: 52, fontWeight: 800 }}>
                周周0元免费租
              </Title>
              <Title level={1} style={{ color: '#fff', margin: '0 0 32px', fontSize: 52, fontWeight: 800 }}>
                百万饰品官方补贴
              </Title>
            </Col>
            <Col xs={24} lg={10} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 180, opacity: 0.3, color: '#fff' }}>🎁</div>
            </Col>
          </Row>
        </div>

        {/* Free Rent Section */}
        <div style={{ maxWidth: 1200, margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Row align="middle" style={{ marginBottom: 16 }}>
              <Col flex="auto">
                <Title level={4} style={{ margin: 0 }}>
                  <span style={{ color: '#f0c040' }}>周周免费租</span>
                </Title>
              </Col>
              <Col>
                <Button type="link">查看更多 &gt;</Button>
              </Col>
            </Row>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
              {freeRentItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    minWidth: 160,
                    background: '#fafafa',
                    borderRadius: 8,
                    padding: 12,
                    cursor: 'pointer',
                    border: '1px solid #f0f0f0',
                    textAlign: 'center',
                  }}
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🔪</div>
                  <div style={{ fontSize: 12, color: '#333', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </div>
                  <Tag color="#f0c040" style={{ margin: 0 }}>¥0/天</Tag>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buy Items Section */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          <Row align="middle" style={{ marginBottom: 20 }}>
            <Col flex="auto">
              <Title level={3} style={{ margin: 0 }}>买饰品</Title>
            </Col>
            <Col>
              <Button type="link" onClick={() => navigate('/market')}>
                进入市场 &gt;
              </Button>
            </Col>
          </Row>
          <Divider style={{ margin: '12px 0 20px' }} />
          <Row gutter={[16, 16]}>
            {items.slice(0, 10).map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                <ItemCard
                  id={item.id}
                  name={item.name}
                  iconUrl={item.iconUrl}
                  quality={item.quality}
                  qualityColor={item.qualityColor}
                  price={item.price}
                  salesCount={item.salesCount}
                  rarityColor={item.rarityColor}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  )
}
