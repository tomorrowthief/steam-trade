import { Button, Result } from 'antd'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        title="Steam TradeOffer MVP"
        subTitle="登录以浏览和购买 Bot 库存饰品"
        extra={
          <Button type="primary" size="large" href="/auth/steam">
            通过 Steam 登录
          </Button>
        }
      />
    </div>
  )
}
