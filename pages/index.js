import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { useState, useMemo } from 'react'
import ListingCard from '../components/ListingCard'
import FixerCard from '../components/FixerCard'

export default function Home({ listings, fixers }) {
  const [query, setQuery] = useState('')

  const filteredListings = useMemo(() => {
    if (!query) return listings
    const q = query.toLowerCase()
    return listings.filter(l => (
      (l.title||'').toLowerCase().includes(q) ||
      (l.type||'').toLowerCase().includes(q) ||
      (l.condition||'').toLowerCase().includes(q)
    ))
  }, [listings, query])

  const filteredFixers = useMemo(() => {
    if (!query) return fixers
    const q = query.toLowerCase()
    return fixers.filter(f => (
      (f.name||'').toLowerCase().includes(q) ||
      (f.categories||[]).join(' ').toLowerCase().includes(q) ||
      (f.badge||'').toLowerCase().includes(q)
    ))
  }, [fixers, query])

  function pickCategory(cat){
    setQuery(cat)
  }

  return (
    <>
      <section className="hero">
        <h1>FixItUp — Campus Marketplace</h1>
        <p>Connect with fellow students to repair, reuse, and recycle items on campus.</p>
        <div className="search-hero">
          <div style={{flex:1}}>
            <div className="nav-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" style={{opacity:0.7}}><path d="M21 21l-4.35-4.35" stroke="#264d3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="#264d3a" strokeWidth="1.6"/></svg>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search items, categories or fixers" aria-label="Search listings and fixers" />
            </div>
            <div className="category-pills">
              <button className="pill" onClick={()=>pickCategory('Electronics')}>🔌 Electronics</button>
              <button className="pill" onClick={()=>pickCategory('Furniture')}>🪑 Furniture</button>
              <button className="pill" onClick={()=>pickCategory('Bicycles')}>🚲 Bicycles</button>
              <button className="pill" onClick={()=>pickCategory('Clothing')}>👚 Clothing</button>
            </div>
          </div>

          <div style={{width:320}}>
            <div className="card">
              <h3 style={{margin:0}}>Why reuse?</h3>
              <p className="muted">Save money, reduce waste, and get hands-on experience helping others.</p>
              <div style={{display:'flex',gap:8}}>
                <Link href="/create" className="btn">Post an item</Link>
                <Link href="/fixers" className="btn secondary">Find a fixer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-grid">
        <div className="main-column">
          <div className="tabs">
            <div className="tab">Recent Posts</div>
            <div className="tab">Your Posts</div>
            <div className="tab">Buyer Posts</div>
            <div className="tab">Seller Posts</div>
            <div className="tab">Repairer Posts</div>
          </div>

          {filteredListings.length === 0 ? <p className="muted">No listings match your search.</p> : (
            <div>
              {filteredListings.map(l => (
                <div key={l.id} className="post-row">
                  <div className="post-image">
                    {l.image ? <img src={l.image} alt={l.title} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:8}} /> : 'Image'}
                  </div>
                  <div className="post-desc">
                    <h3>{l.title}</h3>
                    <div className="muted">Type: {l.type} · Condition: {l.condition}</div>
                    <p style={{marginTop:8}}>{l.description || 'No description provided.'}</p>
                    <div style={{display:'flex',gap:8,marginTop:8}}>
                      <button className="btn">Request Bid</button>
                      <Link href={`/listings/${l.id}`} className="btn secondary">Details</Link>
                    </div>
                  </div>
                </div>
              ))}

              <div className="leaderboard">
                <div className="board">
                  <h4>Leaderboard</h4>
                  <ol className="muted">
                    <li>1. Alex Chen</li>
                    <li>2. Sam Park</li>
                    <li>3. Taylor Lee</li>
                  </ol>
                </div>
                <div className="rank-box">
                  <h4>Your Rank</h4>
                  <div className="muted">#12</div>
                  <h4 style={{marginTop:12}}>Current Points</h4>
                  <div className="muted">120</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="chat-column">
          <h4>Chat</h4>
          {filteredFixers.map(f => (
            <div key={f.id} className="chat-item">
              <div className="avatar">{f.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div>
                <div style={{fontWeight:700}}>{f.name}</div>
                <div className="muted" style={{fontSize:13}}>{f.badge}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>

      <div className="new-post-fixed">
        <Link href="/create" className="btn">+ New Post</Link>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const listingsPath = path.join(process.cwd(), 'data', 'listings.json')
  const fixersPath = path.join(process.cwd(), 'data', 'fixers.json')
  let listings = []
  let fixers = []
  try {
    listings = JSON.parse(fs.readFileSync(listingsPath, 'utf8')).reverse()
  } catch (e){}
  try {
    fixers = JSON.parse(fs.readFileSync(fixersPath, 'utf8'))
  } catch (e){}
  return { props: { listings, fixers } }
}
