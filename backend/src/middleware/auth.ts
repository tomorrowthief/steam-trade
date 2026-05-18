import { Request, Response, NextFunction } from 'express'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.steamId) {
    return next()
  }
  res.status(401).json({ error: 'Unauthorized' })
}

declare module 'express-session' {
  interface SessionData {
    steamId: string
    nickname: string
    avatar: string
  }
}
