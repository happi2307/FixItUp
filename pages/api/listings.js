import fs from 'fs'
import path from 'path'

export default function handler(req, res){
  const dataPath = path.join(process.cwd(), 'data', 'listings.json')
  if (req.method === 'GET'){
    const raw = fs.readFileSync(dataPath, 'utf8')
    return res.status(200).json(JSON.parse(raw))
  }

  if (req.method === 'POST'){
    const { title, type, condition, image } = req.body
    if (!title) return res.status(400).json({ error: 'title required' })
    const raw = fs.readFileSync(dataPath, 'utf8')
    const arr = JSON.parse(raw)
    const id = 'l-' + Date.now()
    const item = { id, title, type, condition, image, createdAt: new Date().toISOString() }
    arr.push(item)
    fs.writeFileSync(dataPath, JSON.stringify(arr, null, 2), 'utf8')
    return res.status(201).json(item)
  }

  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
