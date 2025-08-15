// Helper: if MongoDB is not configured, keep using file-backed JSON for listings and fixers.

import fs from 'fs'
import path from 'path'

export function readJSON(name){
  const p = path.join(process.cwd(),'data', name + '.json')
  try{ return JSON.parse(fs.readFileSync(p,'utf8')) } catch(e){ return [] }
}

export function writeJSON(name, data){
  const p = path.join(process.cwd(),'data', name + '.json')
  fs.writeFileSync(p, JSON.stringify(data,null,2),'utf8')
}
