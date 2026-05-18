# Steam Trade

CS2 饰品交易平台（MVP Demo），实现完整的 Steam TradeOffer 链路：登录 → 浏览 Bot 库存 → 购买 → 自动发送 Trade Offer → 订单状态追踪。

## Tech Stack

| 层 | 技术 |
|---|---|
| 前端 | React 18 + Vite + TypeScript + Ant Design 5 |
| 后端 | Express + Socket.IO + TypeScript |
| Steam | steam-user, steam-tradeoffer-manager, steamcommunity, steam-totp |
| 认证 | Passport (Steam OpenID) + express-session |
| 存储 | JSON 文件（MVP 阶段，无数据库） |

## Quick Start

```bash
pnpm install

# 后端
cd backend && cp .env.example .env   # 填入 Steam Bot 凭证
pnpm --filter backend dev            # localhost:3001

# 前端
pnpm --filter frontend dev           # localhost:5173
```

## 核心流程

```
用户 Steam 登录 → 查看 Bot 库存 → 点击购买 → Bot 发送 TradeOffer → 用户手机确认 → 订单完成
```

## 项目结构

```
├── backend/src/
│   ├── routes/         # REST API 路由
│   ├── controllers/    # 请求处理
│   ├── services/       # Steam / 库存 / 交易 / 存储逻辑
│   ├── socket/         # WebSocket 实时推送
│   └── middleware/     # 认证中间件
├── frontend/src/
│   ├── pages/          # 页面组件
│   ├── components/     # 公共组件
│   └── services/       # API & Socket 客户端
├── static.md           # 静态页面需求（文思有品风格）
└── steam_tradeoffer_mvp_architecture_and_requirements.md  # MVP 架构文档
```

## 部署

- **前端**：Cloudflare Pages / Vercel（纯静态构建）
- **后端**：Railway / Render / VPS（需支持 Node.js 长连接）

> 后端使用 `steam-user` 等库维持与 Steam 的持久 TCP 连接，无法部署到 Cloudflare Workers 等无状态环境。
