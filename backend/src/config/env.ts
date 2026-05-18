import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  sessionSecret: process.env.SESSION_SECRET || 'dev_secret',
  steamAccount: process.env.STEAM_ACCOUNT || '',
  steamPassword: process.env.STEAM_PASSWORD || '',
  steamSharedSecret: process.env.STEAM_SHARED_SECRET || '',
  steamIdentitySecret: process.env.STEAM_IDENTITY_SECRET || '',
  steamRealm: process.env.STEAM_REALM || 'http://localhost:3001',
  steamReturnUrl: process.env.STEAM_RETURN_URL || 'http://localhost:3001/auth/steam/return',
}
