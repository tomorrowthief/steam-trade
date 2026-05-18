import express, { Express } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import authRoutes from './routes/auth.routes'
import itemsRoutes from './routes/items.routes'
import ordersRoutes from './routes/orders.routes'

export function createApp(): Express {
  const app = express()

  app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
  app.use(express.json())

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/auth', authRoutes)
  app.use('/api/items', itemsRoutes)
  app.use('/api/orders', ordersRoutes)

  return app
}
