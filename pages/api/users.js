import { dbConnect } from '../../lib/dbConnect'
import User from '../../lib/userModel'

export default async function handler(req, res){
  if (req.method === 'GET'){
    await dbConnect()
    const users = await User.find().select('-passwordHash')
    return res.status(200).json(users)
  }
  res.status(405).end()
}
