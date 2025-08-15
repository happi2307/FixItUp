import { dbConnect } from '../../../lib/dbConnect'
import User from '../../../lib/userModel'
import bcrypt from 'bcryptjs'
import { signToken, setTokenCookie } from '../../../lib/auth'

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password, role } = req.body
  if (!email || !password || !name) return res.status(400).json({ error: 'missing fields' })

  await dbConnect()
  try{
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ error: 'email exists' })
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash: hash, role: role || 'requester' })
    const token = signToken({ id: user._id, email: user.email, role: user.role })
    setTokenCookie(res, token)
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (e){
    console.error(e)
    res.status(500).json({ error: 'server error' })
  }
}
