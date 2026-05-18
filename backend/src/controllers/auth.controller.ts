import { Request, Response } from 'express'

export function getMe(req: Request, res: Response) {
  if (!req.session?.steamId) {
    return res.json(null)
  }
  res.json({
    steamId: req.session.steamId,
    nickname: req.session.nickname,
    avatar: req.session.avatar,
  })
}
