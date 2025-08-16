import Link from 'next/link'
import AuthWidget from './AuthWidget'
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">FI</div>
        <div>
          <div style={{fontWeight:700,color:'#fff'}}>FixItUp</div>
          <div className="muted" style={{fontSize:12,color:'rgba(255,255,255,0.9)'}}>Campus repairs, reuse & recycling</div>
        </div>
      </div>

      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/fixers">Fixers</Link>
        <Link href="/recycle">Recycle</Link>

        <div className="nav-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" style={{opacity:0.7}}><path d="M21 21l-4.35-4.35" stroke="#264d3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="#264d3a" strokeWidth="1.6"/></svg>
          <input placeholder="Search items or fixers" aria-label="Search" />
        </div>

        <Link href="/create" className="btn post-cta" aria-label="Post Item" title="Post Item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Post
        </Link>
        <AuthWidget />

        <button className="hamburger" aria-label="Open menu" onClick={()=>setOpen(!open)}>
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M3 12h18M3 17h18" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="mobile-nav" role="menu">
          <Link href="/">Home</Link>
          <Link href="/fixers">Fixers</Link>
          <Link href="/recycle">Recycle</Link>
          <Link href="/create" className="btn" style={{marginTop:8}}>Post Item</Link>
        </div>
      )}
    </header>
  )
}
