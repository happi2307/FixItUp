import { dbConnect } from '../../../lib/dbConnect'
import User from '../../../lib/userModel'
import { parseToken } from '../../../lib/auth'

export default async function handler(req, res){
  const token = parseToken(req)
  if (!token) return res.status(401).json({ error: 'not authenticated' })
  await dbConnect()
  const user = await User.findById(token.id).select('-passwordHash')
  if (!user) return res.status(404).json({ error: 'not found' })
  res.status(200).json(user)
}
