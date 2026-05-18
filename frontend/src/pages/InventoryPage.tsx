import { Layout, Row, Col, Select, Input, Button, Table, Checkbox, Empty } from 'antd'
import Navbar from '../components/Navbar'

const { Content } = Layout
const { Search } = Input

export default function InventoryPage() {
  const columns = [
    {
      title: <span>时间 <span style={{ color: '#999', fontSize: 12 }}>↓</span></span>,
      dataIndex: 'time',
      key: 'time',
      width: 180,
    },
    {
      title: <span>价格 <span style={{ color: '#999', fontSize: 12 }}>↓</span></span>,
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => <span style={{ color: '#e74c3c', fontWeight: 600 }}>¥{price}</span>,
    },
    {
      title: <span>磨损 <span style={{ color: '#999', fontSize: 12 }}>↓</span></span>,
      dataIndex: 'wear',
      key: 'wear',
      width: 100,
    },
    {
      title: '物品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '品质',
      dataIndex: 'quality',
      key: 'quality',
      width: 100,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Inventory Header */}
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Steam库存</span>
              </Col>
              <Col>
                <span style={{ color: '#999', marginRight: 24 }}>件数: --</span>
                <span style={{ color: '#999' }}>估值: --</span>
              </Col>
            </Row>

            {/* Filters */}
            <Row gutter={12} align="middle">
              <Col>
                <Select placeholder="类型" style={{ width: 100 }} allowClear />
              </Col>
              <Col>
                <Select placeholder="品质" style={{ width: 100 }} allowClear />
              </Col>
              <Col>
                <Select placeholder="类别" style={{ width: 100 }} allowClear />
              </Col>
              <Col>
                <Select placeholder="外观" style={{ width: 100 }} allowClear />
              </Col>
              <Col>
                <Select placeholder="状态" style={{ width: 100 }} allowClear />
              </Col>
              <Col flex="auto">
                <Search
                  placeholder="请输入物品名称"
                  allowClear
                  enterButton="搜索"
                  style={{ maxWidth: 300 }}
                />
              </Col>
            </Row>
          </div>

          {/* Table Header */}
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Row
              justify="space-between"
              align="middle"
              style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0' }}
            >
              <Col>
                <span style={{ color: '#999', marginRight: 16 }}>已选 0/0</span>
                <Checkbox>全选</Checkbox>
              </Col>
              <Col>
                <Row gutter={8}>
                  <Col>
                    <Button disabled>合并</Button>
                  </Col>
                  <Col>
                    <Button>刷新库存</Button>
                  </Col>
                  <Col>
                    <Button type="primary" ghost>出售上架</Button>
                  </Col>
                  <Col>
                    <Button type="primary">租赁上架</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Table */}
            <div style={{ padding: 24 }}>
              <Empty description="暂无库存物品，请先刷新库存" />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}
