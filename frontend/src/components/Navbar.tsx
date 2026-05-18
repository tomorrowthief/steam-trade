import { Layout, Menu, Badge, Avatar } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header } = Layout

const navItems = [
  { key: '/', label: '首页' },
  { key: '/market', label: '饰品市场' },
  { key: '/inventory', label: '我的库存' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        height: 64,
      }}
    >
      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: '#f0c040',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Y
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#333', lineHeight: 1.2 }}>
            文思有品
          </div>
          <div style={{ fontSize: 11, color: '#999', lineHeight: 1 }}>
            租饰品 买饰品 上文思有品
          </div>
        </div>
      </div>

      {/* Nav */}
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={navItems.map((item) => ({
          ...item,
          onClick: () => navigate(item.key),
        }))}
        style={{
          flex: 1,
          justifyContent: 'center',
          borderBottom: 'none',
          minWidth: 300,
        }}
      />

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Badge dot>
          <Avatar
            style={{ background: '#f0f0f0', color: '#999', cursor: 'pointer' }}
            icon={
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
              </svg>
            }
          />
        </Badge>
        <Badge dot>
          <Avatar
            style={{ background: '#f0f0f0', color: '#999', cursor: 'pointer' }}
            icon={
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            }
          />
        </Badge>
        <Avatar
          style={{ background: '#333', color: '#f0c040', cursor: 'pointer', fontWeight: 600 }}
        >
          U
        </Avatar>
      </div>
    </Header>
  )
}
