import { useState } from 'react'
import { Layout, Row, Col, Select, Input, Button, Tabs } from 'antd'
import Navbar from '../components/Navbar'
import ItemCard from '../components/ItemCard'
import { categories, items } from '../data/mockData'
import { useIsMobile } from '../hooks/useIsMobile'

const { Content } = Layout
const { Search } = Input

const weaponIcons: Record<string, string> = {
  dagger: '🔪',
  pistol: '',
  rifle: '',
  smg: '🔫',
  shotgun: '🔫',
  machinegun: '🔫',
  gloves: '',
  other: '',
  sticker: '',
  gear: '⚙️',
  charm: '',
}

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [tradeTab, setTradeTab] = useState<'sell' | 'rent'>('sell')
  const isMobile = useIsMobile()

  const filteredItems = selectedCategory
    ? items.filter(() => true) // mock: show all, in real app filter by category
    : items

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <Content style={{ padding: isMobile ? 12 : 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Category Icons */}
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: isMobile ? 16 : 24,
              marginBottom: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ marginBottom: 20, fontSize: 14, color: '#666' }}>饰品市场</div>
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              {categories.map((cat) => (
                <Col xs={6} sm={4} md={2} key={cat.key}>
                  <div
                    style={{
                      textAlign: 'center',
                      cursor: 'pointer',
                      padding: '8px 0',
                      color: selectedCategory === cat.key ? '#2563eb' : '#333',
                      transition: 'all 0.2s',
                    }}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat.key ? '' : cat.key)
                    }
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>
                      {weaponIcons[cat.key] || cat.name[0]}
                    </div>
                    <div style={{ fontSize: 12 }}>{cat.name}</div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Filters */}
            <Row gutter={[12, 12]} align="middle">
              <Col xs={12} sm={8} md={4}>
                <Select placeholder="品质" style={{ width: '100%' }} allowClear>
                  <Select.Option value="new">崭新出厂</Select.Option>
                  <Select.Option value="minimal">略有磨损</Select.Option>
                  <Select.Option value="field">久经沙场</Select.Option>
                </Select>
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select placeholder="类别" style={{ width: '100%' }} allowClear />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select placeholder="外观" style={{ width: '100%' }} allowClear />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select placeholder="颜色" style={{ width: '100%' }} allowClear />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select placeholder="收藏品" style={{ width: '100%' }} allowClear />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Select placeholder="印花搜枪" style={{ width: '100%' }} allowClear />
              </Col>
              <Col xs={24} sm={16} md={8} flex="auto">
                <Search
                  placeholder="请输入物品名称"
                  allowClear
                  enterButton="搜索"
                  size="middle"
                  onSearch={() => {}}
                />
              </Col>
            </Row>
          </div>

          {/* Trade Tab */}
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: isMobile ? 16 : 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {isMobile ? (
              <>
                <Tabs
                  activeKey={tradeTab}
                  onChange={(key) => setTradeTab(key as 'sell' | 'rent')}
                  items={[
                    { key: 'sell', label: '出售' },
                    { key: 'rent', label: '租赁' },
                  ]}
                />
                <Row gutter={[8, 8]} style={{ marginBottom: 20 }}>
                  <Col xs={12}>
                    <Input placeholder="¥ 最低价" style={{ width: '100%' }} />
                  </Col>
                  <Col xs={12}>
                    <Input placeholder="¥ 最高价" style={{ width: '100%' }} />
                  </Col>
                  <Col xs={24}>
                    <Select placeholder="排序" style={{ width: '100%' }} allowClear>
                      <Select.Option value="price-asc">价格从低到高</Select.Option>
                      <Select.Option value="price-desc">价格从高到低</Select.Option>
                      <Select.Option value="newest">最新上架</Select.Option>
                    </Select>
                  </Col>
                </Row>
              </>
            ) : (
              <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
                <Col>
                  <Tabs
                    activeKey={tradeTab}
                    onChange={(key) => setTradeTab(key as 'sell' | 'rent')}
                    items={[
                      { key: 'sell', label: '出售' },
                      { key: 'rent', label: '租赁' },
                    ]}
                  />
                </Col>
                <Col>
                  <Row gutter={8} align="middle">
                    <Col>
                      <Input placeholder="¥ 最低价" style={{ width: 100 }} />
                    </Col>
                    <Col>-</Col>
                    <Col>
                      <Input placeholder="¥ 最高价" style={{ width: 100 }} />
                    </Col>
                    <Col>
                      <Select placeholder="排序" style={{ width: 100 }} allowClear>
                        <Select.Option value="price-asc">价格从低到高</Select.Option>
                        <Select.Option value="price-desc">价格从高到低</Select.Option>
                        <Select.Option value="newest">最新上架</Select.Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

            {/* Item Grid */}
            <Row gutter={[16, 16]}>
              {filteredItems.map((item) => (
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
        </div>
      </Content>
    </Layout>
  )
}
