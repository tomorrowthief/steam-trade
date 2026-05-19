import { useState } from 'react'
import { Layout, Menu, Badge, Avatar, Drawer } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

const { Header } = Layout

const navItems = [
  { key: '/', label: '首页' },
  { key: '/market', label: '饰品市场' },
  { key: '/inventory', label: '我的库存' },
]

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNavClick = (key: string) => {
    navigate(key)
    setDrawerOpen(false)
  }

  const menuItems = navItems.map((item) => ({
    ...item,
    onClick: () => handleNavClick(item.key),
  }))

  return (
    <>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
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
          {!isMobile && (
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#333', lineHeight: 1.2 }}>
                文思有品
              </div>
              <div style={{ fontSize: 11, color: '#999', lineHeight: 1 }}>
                租饰品 买饰品 上文思有品
              </div>
            </div>
          )}
        </div>

        {/* Nav - Desktop */}
        {!isMobile && (
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottom: 'none',
              minWidth: 300,
            }}
          />
        )}

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
          {isMobile ? (
            <>
              <div
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={() => setDrawerOpen(true)}
              >
                <HamburgerIcon />
              </div>
              <Avatar
                style={{ background: '#333', color: '#f0c040', cursor: 'pointer', fontWeight: 600 }}
              >
                U
              </Avatar>
            </>
          ) : (
            <>
              <Badge dot>
                <Avatar
                  style={{ background: '#f0f0f0', color: '#999', cursor: 'pointer' }}
                  icon={<LockIcon />}
                />
              </Badge>
              <Badge dot>
                <Avatar
                  style={{ background: '#f0f0f0', color: '#999', cursor: 'pointer' }}
                  icon={<MailIcon />}
                />
              </Badge>
              <Avatar
                style={{ background: '#333', color: '#f0c040', cursor: 'pointer', fontWeight: 600 }}
              >
                U
              </Avatar>
            </>
          )}
        </div>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        width={250}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Badge dot>
              <Avatar
                style={{ background: '#f0f0f0', color: '#999', cursor: 'pointer' }}
                icon={<LockIcon />}
              />
            </Badge>
            <Badge dot>
              <Avatar
                style={{ background: '#f0f0f0', color: '#999', cursor: 'pointer' }}
                icon={<MailIcon />}
              />
            </Badge>
          </div>
          <span style={{ fontSize: 12, color: '#999' }}>通知与消息</span>
        </div>
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 'none' }}
        />
      </Drawer>
    </>
  )
}
