import jwt from 'jsonwebtoken'
import cookie from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const TOKEN_NAME = 'fixitup_token'

export function signToken(payload){
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function parseToken(req){
  const header = req.headers?.cookie
  if (!header) return null
  const cookies = cookie.parse(header || '')
  const token = cookies[TOKEN_NAME]
  if (!token) return null
  try{
    return jwt.verify(token, JWT_SECRET)
  } catch(e){
    return null
  }
}

export function setTokenCookie(res, token){
  const serialized = cookie.serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7*24*60*60
  })
  res.setHeader('Set-Cookie', serialized)
}

export function clearTokenCookie(res){
  const serialized = cookie.serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })
  res.setHeader('Set-Cookie', serialized)
}
