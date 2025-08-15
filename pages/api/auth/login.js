import { dbConnect } from '../../../lib/dbConnect'
import User from '../../../lib/userModel'
import bcrypt from 'bcryptjs'
import { signToken, setTokenCookie } from '../../../lib/auth'

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'missing fields' })

  await dbConnect()
  try{
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'invalid' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'invalid' })
    const token = signToken({ id: user._id, email: user.email, role: user.role })
    setTokenCookie(res, token)
    res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch(e){
    console.error(e)
    res.status(500).json({ error: 'server error' })
  }
}
