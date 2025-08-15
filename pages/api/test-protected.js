import { parseToken } from '../lib/auth'

export default function handler(req, res){
  const token = parseToken(req)
  if (!token) return res.status(401).json({ error: 'not authenticated' })
  res.status(200).json({ ok: true, token })
}
