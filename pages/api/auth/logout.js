import { clearTokenCookie } from '../../../lib/auth'

export default function handler(req, res){
  clearTokenCookie(res)
  res.status(200).json({ ok: true })
}
