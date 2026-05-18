import { useEffect, useState } from 'react'
import { Table, Tag, Layout, Typography, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { getSocket } from '../services/socket'

const { Header, Content } = Layout

interface Order {
  id: number
  assetId: string
  tradeOfferId: string | null
  status: string
  createdAt: string
  updatedAt: string
}

const statusColor: Record<string, string> = {
  CREATED: 'default',
  OFFER_SENT: 'processing',
  PENDING_CONFIRMATION: 'warning',
  ACCEPTED: 'success',
  DECLINED: 'error',
  FAILED: 'error',
}

export default function OrdersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    api.get<Order[]>('/orders').then((res) => {
      setOrders(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const socket = getSocket()
    socket.on('order.updated', () => fetchOrders())
    return () => {
      socket.off('order.updated')
    }
  }, [])

  const columns = [
    { title: '订单 ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'Asset ID', dataIndex: 'assetId', key: 'assetId' },
    { title: 'Trade Offer ID', dataIndex: 'tradeOfferId', key: 'tradeOfferId', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (status: string) => <Tag color={statusColor[status]}>{status}</Tag>,
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 200, render: (t: string) => new Date(t).toLocaleString() },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
          Steam TradeOffer MVP
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { key: 'market', label: '商品', onClick: () => navigate('/') },
            { key: 'orders', label: '我的订单' },
            user ? { key: 'user', label: user.nickname } : { key: 'login', label: '登录', onClick: () => navigate('/login') },
          ]}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        <Table columns={columns} dataSource={orders} rowKey="id" loading={loading} />
      </Content>
    </Layout>
  )
}
