import Link from 'next/link'
import AuthWidget from './AuthWidget'

export default function Header(){
  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">FI</div>
        <div>
          <div style={{fontWeight:700,color:'var(--accent)'}}>FixItUp</div>
          <div className="muted" style={{fontSize:12}}>Campus repairs, reuse & recycling</div>
        </div>
      </div>

      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/create">Create</Link>
        <Link href="/fixers">Fixers</Link>
        <Link href="/recycle">Recycle</Link>
        <AuthWidget />
      </nav>
    </header>
  )
}
