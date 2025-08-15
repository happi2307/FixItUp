import fs from 'fs'
import path from 'path'

export default function handler(req, res){
  const p = path.join(process.cwd(), 'data', 'fixers.json')
  const raw = fs.readFileSync(p, 'utf8')
  return res.status(200).json(JSON.parse(raw))
}
