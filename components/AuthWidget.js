import { useEffect, useState } from 'react'

export default function AuthWidget(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.ok? r.json().then(setUser): setUser(null)).catch(()=>setUser(null))
  },[])
  if (!user) return <a href="/auth">Sign in</a>
  return <span>Hi, {user.name}</span>
}
