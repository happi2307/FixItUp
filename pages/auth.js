import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Auth(){
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e){
    e.preventDefault()
    const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const body = mode === 'login' ? { email, password } : { name, email, password }
    const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    if (res.ok) router.push('/')
    else alert('Error')
  }

  return (
    <div className="container">
      <h1>{mode==='login' ? 'Sign in' : 'Register'}</h1>
      <form className="card" onSubmit={submit}>
        {mode==='register' && <label>Name<input value={name} onChange={e=>setName(e.target.value)} required/></label>}
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} required/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" type="submit">{mode==='login' ? 'Sign in' : 'Register'}</button>
          <button type="button" className="btn secondary" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login' ? 'Create account' : 'Have account?'}</button>
        </div>
      </form>
    </div>
  )
}
