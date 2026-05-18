import { Router, RequestHandler } from 'express'
import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'
import { config } from '../config/env'
import { getMe } from '../controllers/auth.controller'

const router: ReturnType<typeof Router> = Router()

passport.use(
  new SteamStrategy(
    {
      returnURL: config.steamReturnUrl,
      realm: config.steamRealm,
      apiKey: '',
    },
    (identifier, profile, done) => {
      return done(null, profile)
    }
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj as Express.User))

router.get('/steam', passport.authenticate('steam'))

router.get(
  '/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user as any
    if (user?._json) {
      req.session.steamId = user._json.steamid
      req.session.nickname = user._json.personaname
      req.session.avatar = user._json.avatarfull
    }
    res.redirect('/')
  }
)

router.get('/me', getMe)

export default router
