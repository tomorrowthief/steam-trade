import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout, Row, Col, Card, Button, Radio, Typography, Divider, message, Steps } from 'antd'
import Navbar from '../components/Navbar'
import { getItemById, items } from '../data/mockData'

const { Content } = Layout
const { Title, Text } = Typography

const STEAM_CDN = 'https://community.cloudflare.steamstatic.com/economy/image/'

export default function PurchasePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [item, setItem] = useState<ReturnType<typeof getItemById>>(undefined)
  const [tradeMethod, setTradeMethod] = useState('steam')
  const [currentStep, setCurrentStep] = useState(0)

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

  const handleConfirm = () => {
    setCurrentStep(1)
    // Mock: simulate order creation
    setTimeout(() => {
      setCurrentStep(2)
      message.success('订单创建成功！请前往 Steam 确认交易报价')
    }, 1500)
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={3} style={{ marginBottom: 24 }}>确认购买</Title>

          {/* Steps */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <Steps
              current={currentStep}
              items={[
                { title: '确认订单' },
                { title: '提交中' },
                { title: '待确认' },
              ]}
            />
          </div>

          <Row gutter={24}>
            {/* Left: Item Info */}
            <Col xs={24} lg={14}>
              <Card
                style={{ marginBottom: 16 }}
                title="购买物品"
              >
                <Row gutter={16} align="middle">
                  <Col>
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        background: '#f5f5f5',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={`${STEAM_CDN}${item.iconUrl}`}
                        alt={item.name}
                        style={{ maxWidth: 80, maxHeight: 80, objectFit: 'contain' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  </Col>
                  <Col flex="auto">
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, padding: '2px 8px', background: item.qualityColor, color: '#fff', borderRadius: 4 }}>
                        {item.quality}
                      </span>
                    </div>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8 }}>{item.name}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#e74c3c' }}>¥{item.price}</div>
                  </Col>
                </Row>
              </Card>

              {/* Trade Method */}
              <Card title="交易方式">
                <Radio.Group
                  value={tradeMethod}
                  onChange={(e) => setTradeMethod(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Row gutter={16}>
                    <Col xs={24}>
                      <Radio.Button value="steam" style={{ width: '100%', height: 'auto', padding: 16, textAlign: 'left' }}>
                        <div style={{ fontWeight: 600 }}>Steam 报价</div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                          通过 Steam 发送交易报价，需双方确认
                        </div>
                      </Radio.Button>
                    </Col>
                    <Col xs={24} style={{ marginTop: 12 }}>
                      <Radio.Button value="platform" style={{ width: '100%', height: 'auto', padding: 16, textAlign: 'left' }}>
                        <div style={{ fontWeight: 600 }}>平台担保</div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                          平台担保交易，更安全可靠
                        </div>
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </Card>
            </Col>

            {/* Right: Order Summary */}
            <Col xs={24} lg={10}>
              <Card title="订单信息">
                <div style={{ marginBottom: 16 }}>
                  <Row justify="space-between">
                    <Text type="secondary">物品价格</Text>
                    <Text>¥{item.price}</Text>
                  </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Row justify="space-between">
                    <Text type="secondary">手续费</Text>
                    <Text>¥0</Text>
                  </Row>
                </div>
                <Divider />
                <div>
                  <Row justify="space-between">
                    <Text strong>应付总额</Text>
                    <Text strong style={{ fontSize: 20, color: '#e74c3c' }}>¥{item.price}</Text>
                  </Row>
                </div>

                <Divider />

                <div style={{ marginBottom: 16 }}>
                  <Text type="secondary">交易方式</Text>
                  <div style={{ marginTop: 4 }}>{tradeMethod === 'steam' ? 'Steam 报价' : '平台担保'}</div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  loading={currentStep === 1}
                  onClick={handleConfirm}
                  disabled={currentStep >= 2}
                  style={{ height: 48, fontSize: 16, marginTop: 16 }}
                >
                  {currentStep === 0 && '确认购买'}
                  {currentStep === 1 && '提交中...'}
                  {currentStep === 2 && '订单已创建'}
                </Button>

                {currentStep >= 2 && (
                  <Button
                    block
                    onClick={() => navigate('/')}
                    style={{ marginTop: 12 }}
                  >
                    返回首页
                  </Button>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}
