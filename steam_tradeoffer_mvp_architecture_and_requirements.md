# Steam TradeOffer MVP 项目文档

## 1. 项目目标

### 1.1 项目名称

Steam TradeOffer MVP Demo

---

### 1.2 项目目标

实现一个最小可运行的 Steam 饰品交易 Demo。

系统只聚焦于：

- Steam 登录
- 展示 Bot 库存
- 用户点击购买
- Bot 自动发送 Trade Offer
- 用户确认交易
- 系统更新订单状态

不包含：

- 真正支付
- 行情系统
- 用户挂单
- P2P 交易
- 提现
- 风控
- 多 Bot 集群

本项目目标：

```text
跑通完整 Steam TradeOffer 链路
```

---

# 2. MVP 功能范围

## 2.1 用户功能

### Steam 登录

用户通过 Steam OpenID 登录系统。

登录后系统获取：

- steamId
- nickname
- avatar

---

### 查看商品

系统展示：

```text
Bot 当前库存
```

包括：

- 饰品名称
- 图标
- assetid
- 市场名称

---

### 购买商品

用户点击：

```text
购买
```

系统执行：

```text
Bot -> 用户
```

发送 Steam Trade Offer。

---

### 查看订单状态

用户可查看：

- 待确认
- 已接受
- 已取消
- 已完成

---

# 3. 技术栈

## 3.1 前端

| 模块 | 技术 |
|---|---|
| 前端框架 | React |
| 构建工具 | Vite |
| 路由 | React Router |
| UI | Ant Design |
| 请求 | Axios |
| 实时通信 | socket.io-client |

---

## 3.2 后端

| 模块 | 技术 |
|---|---|
| Runtime | Node.js |
| Web Framework | Express |
| Steam SDK | steam-user |
| TradeOffer | steam-tradeoffer-manager |
| Steam Community | steamcommunity |
| Steam Guard | steam-totp |
| 实时通信 | socket.io |
| 本地存储 | JSON File Storage |
| 文件系统 | fs/promises |
| Session | express-session |
| Steam 登录 | passport-steam |

---

# 4. 系统整体架构

## 4.1 架构图

```text
+----------------+
| React Frontend |
+--------+-------+
         |
         | HTTP / WebSocket
         |
+--------v-------+
| Node Backend   |
| Express API    |
+--------+-------+
         |
         |
+--------v----------------+
| Steam Service Layer     |
| - steam-user            |
| - tradeoffer-manager    |
| - steamcommunity        |
+--------+----------------+
         |
         |
+--------v-------+
| Steam Platform |
+----------------+
```

---

# 5. 核心业务流程

## 5.1 用户登录流程

```text
用户点击 Steam 登录
    ↓
跳转 Steam OpenID
    ↓
Steam 授权
    ↓
回调 backend
    ↓
创建 session
    ↓
返回前端
```

---

## 5.2 商品展示流程

```text
Bot 登录 Steam
    ↓
读取 Bot Inventory
    ↓
后端缓存库存
    ↓
前端请求 /items
    ↓
展示商品列表
```

---

## 5.3 购买流程

```text
用户点击购买
    ↓
POST /orders
    ↓
创建订单
    ↓
Bot 创建 TradeOffer
    ↓
Steam 发报价
    ↓
用户手机确认
    ↓
监听报价状态
    ↓
订单完成
```

---

# 6. 本地文件存储设计

## 6.1 存储方案

MVP 不使用数据库。

改为：

```text
JSON 文件本地存储
```

原因：

- 更轻量
- 更适合 Demo
- 无需数据库部署
- 更方便 Codex 一次性生成
- 更容易本地运行

---

## 6.2 文件结构

```text
backend/
├── storage/
│   ├── users.json
│   ├── items.json
│   └── orders.json
```

---

## 6.3 users.json

```json
[
  {
    "steamId": "7656119xxxx",
    "nickname": "test",
    "avatar": "xxx",
    "tradeUrl": "https://steamcommunity.com/tradeoffer/new/..."
  }
]
```

---

## 6.4 items.json

```json
[
  {
    "assetId": "123456",
    "classId": "1111",
    "marketHashName": "AK-47 Redline",
    "iconUrl": "xxx",
    "tradable": true,
    "ownerType": "BOT"
  }
]
```

---

## 6.5 orders.json

```json
[
  {
    "id": 1,
    "buyerSteamId": "7656119xxxx",
    "assetId": "123456",
    "tradeOfferId": "987654",
    "status": "ACCEPTED",
    "createdAt": "2026-05-14T00:00:00Z"
  }
]
```

---

## 6.6 storage.service.ts

新增统一文件存储服务。

职责：

- 读取 JSON 文件
- 写入 JSON 文件
- 自动创建文件
- 文件锁控制
- 原子写入

推荐封装：

```text
readJson()
writeJson()
appendJson()
updateJson()
```

---

## 6.7 文件写入策略

避免：

```text
并发覆盖写入
```

推荐：

- 单线程队列写入
- 临时文件替换
- debounce flush

推荐实现：

```text
fs/promises
```

---

# 7. 订单状态机

## 7.1 状态定义

```text
CREATED
```

订单创建。

---

```text
OFFER_SENT
```

Bot 已发送报价。

---

```text
PENDING_CONFIRMATION
```

等待用户确认。

---

```text
ACCEPTED
```

交易成功。

---

```text
DECLINED
```

用户拒绝。

---

```text
FAILED
```

交易失败。

---

# 8. Steam Bot 设计

## 8.1 Bot 职责

Bot 负责：

- 登录 Steam
- 维护 Session
- 读取库存
- 创建 TradeOffer
- 监听 TradeOffer 状态

---

## 8.2 Bot 启动流程

```text
启动服务
    ↓
Bot 登录 Steam
    ↓
Steam Guard 验证
    ↓
建立 Session
    ↓
初始化 TradeOfferManager
    ↓
同步库存
```

---

## 8.3 Bot 配置

.env:

```env
STEAM_ACCOUNT=bot_account
STEAM_PASSWORD=bot_password
STEAM_SHARED_SECRET=xxxx
STEAM_IDENTITY_SECRET=xxxx
```

---

# 9. Steam SDK 封装

## 9.1 steam.service.ts

职责：

- 登录 Steam
- 管理 Session
- 获取 Cookies
- 初始化 manager

---

## 9.2 inventory.service.ts

职责：

- 获取 Bot Inventory
- 转换数据格式
- 同步 items.json

---

## 9.3 trade.service.ts

职责：

- 创建 TradeOffer
- 发送报价
- 查询报价状态
- 监听状态变化

---

# 10. 后端模块设计

## 10.1 模块划分

```text
backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── steam/
│   ├── prisma/
│   ├── middleware/
│   ├── socket/
│   └── types/
```

---

# 11. API 设计

## 11.1 登录接口

### GET /auth/steam

跳转 Steam 登录。

---

### GET /auth/steam/return

Steam 登录回调。

---

### GET /auth/me

获取当前用户。

返回：

```json
{
  "steamId": "7656119xxxx",
  "nickname": "test",
  "avatar": "xxx"
}
```

---

# 11.2 商品接口

### GET /items

返回 Bot 商品列表。

返回：

```json
[
  {
    "assetId": "123",
    "marketHashName": "AK-47",
    "iconUrl": "xxx"
  }
]
```

---

# 11.3 订单接口

### POST /orders

请求：

```json
{
  "assetId": "123",
  "tradeUrl": "https://steamcommunity.com/tradeoffer/new/..."
}
```

返回：

```json
{
  "orderId": 1,
  "status": "OFFER_SENT"
}
```

---

### GET /orders/:id

获取订单详情。

---

# 12. WebSocket 设计

## 12.1 作用

用于：

```text
实时推送订单状态
```

---

## 12.2 推送事件

### order.updated

```json
{
  "orderId": 1,
  "status": "ACCEPTED"
}
```

---

# 13. 前端设计

## 13.1 页面结构

```text
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   └── router/
```

---

## 13.2 页面设计

# LoginPage

功能：

- Steam 登录

---

# MarketPage

功能：

- 展示商品
- 点击购买

---

# OrdersPage

功能：

- 展示订单状态

---

# 14. 前端组件设计

## ItemCard

属性：

```ts
interface ItemCardProps {
  assetId: string
  marketHashName: string
  iconUrl: string
}
```

功能：

- 展示商品
- 购买按钮

---

# 15. 安全设计

## 15.1 Session

使用：

```text
httpOnly cookie
```

---

## 15.2 Trade URL 校验

后端校验：

```text
trade url 是否属于当前 steamId
```

---

## 15.3 防重复购买

购买时：

```text
锁定 assetId
```

避免并发下重复下单。

---

# 16. Steam Guard 设计

## 16.1 自动 2FA

使用：

```text
steam-totp
```

自动生成验证码。

---

## 16.2 自动确认

使用：

```text
identity_secret
```

自动确认 TradeOffer。

---

# 17. 环境变量

## backend/.env

```env
PORT=3001
SESSION_SECRET=demo_secret
DATABASE_URL="file:./dev.db"

STEAM_ACCOUNT=bot_account
STEAM_PASSWORD=bot_password
STEAM_SHARED_SECRET=xxxx
STEAM_IDENTITY_SECRET=xxxx

STEAM_REALM=http://localhost:3001
STEAM_RETURN_URL=http://localhost:3001/auth/steam/return
```

---

# 18. 开发阶段规划

## Phase 1

实现：

- Bot 登录
- Inventory 获取

---

## Phase 2

实现：

- Steam 登录
- Session

---

## Phase 3

实现：

- 商品展示
- 创建订单

---

## Phase 4

实现：

- TradeOffer
- 状态监听
- WebSocket

---

# 19. TradeOffer 关键代码示例

## 创建报价

```ts
const offer = manager.createOffer(tradeUrl)

offer.addMyItem({
  assetid: assetId,
  appid: 730,
  contextid: 2
})

offer.send((err, status) => {
  console.log(status)
})
```

---

# 20. 订单状态监听

```ts
manager.on('sentOfferChanged', async (offer, oldState) => {
  console.log(offer.state)
})
```

---

# 21. 推荐代码规范

## TypeScript

后端建议：

```text
全部 TypeScript
```

---

## ESLint

启用：

- eslint
- prettier

---

# 22. 推荐部署方式

## 本地开发

```text
Frontend: localhost:5173
Backend: localhost:3001
```

---

## 生产部署

推荐：

- Docker
- Railway
- Render
- VPS

---

# 23. 后续扩展方向

## V2

用户上架。

---

## V3

Bot 自动收货。

---

## V4

P2P 交易。

---

## V5

行情系统。

---

## V6

多 Bot 集群。

---

# 24. Codex 代码生成要求

## 后端要求

- 使用 TypeScript
- 使用 Express
- 使用 steam-user
- 使用 tradeoffer-manager
- 使用 steamcommunity
- 使用 socket.io
- 模块化结构
- RESTful API

---

## 前端要求

- React + Vite
- TypeScript
- Axios
- React Router
- Ant Design
- socket.io-client

---

# 25. 最终 MVP 验收标准

必须满足：

```text
Steam 登录成功
```

---

```text
展示 Bot Inventory
```

---

```text
点击购买成功创建订单
```

---

```text
Bot 成功发送 TradeOffer
```

---

```text
用户手机确认成功
```

---

```text
订单状态更新为 ACCEPTED
```

---

# 26. 推荐 NPM 包

## 后端

```bash
npm install express socket.io prisma @prisma/client
npm install steam-user steamcommunity steam-totp steam-tradeoffer-manager
npm install passport passport-steam express-session
npm install cors dotenv axios
```

---

## 前端

```bash
npm install react-router-dom axios antd socket.io-client
```

---

# 27. Steam 测试建议

## 测试账号

建议：

```text
1 个 Bot
2 个测试用户
```

---

## 测试游戏

推荐：

```text
CS2
```

appid:

```text
730
```

contextid:

```text
2
```

---

# 28. 最终项目目标总结

本项目本质：

```text
Steam TradeOffer Playground
```

重点：

- Steam SDK
- TradeOffer
- Inventory
- 状态机
- WebSocket
- Steam Guard

不是：

```text
真正商业交易平台
```

