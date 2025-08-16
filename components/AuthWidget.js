import { useEffect, useState } from 'react'

export default function AuthWidget(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.ok? r.json().then(setUser): setUser(null)).catch(()=>setUser(null))
  },[])
  if (!user) return <a href="/auth" className="btn secondary" style={{padding:'8px 10px'}}>Sign in</a>
  return <span style={{color:'white',fontWeight:600}}>Hi, {user.name}</span>
}
