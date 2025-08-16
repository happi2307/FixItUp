import Link from 'next/link'

export default function ListingCard({ listing }){
  const cond = listing?.condition || 'Unknown'
  const conditionClass = cond.toLowerCase().includes('good')
    ? 'cond-good'
    : cond.toLowerCase().includes('fair')
      ? 'cond-fair'
      : 'cond-poor'

  const posted = listing?.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'Unknown'

  return (
    <article className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3 style={{margin:0}}>{listing.title}</h3>
        <div className="badge">{listing.type}</div>
      </div>

      {listing.image ? (
        <img className="listing-img" src={listing.image} alt={listing.title} />
      ) : (
        <div style={{height:140,background:'linear-gradient(180deg,#f7faf4,#eef7ea)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)'}}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" stroke="#7a8f7e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 14l3-3 2 2 4-4" stroke="#7a8f7e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div className={conditionClass}>{cond}</div>
          <div className="muted" style={{fontSize:13}}>
            <svg width="14" height="14" viewBox="0 0 24 24" style={{verticalAlign:'middle',marginRight:6}} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.5A8.38 8.38 0 0012.5 2 8.5 8.5 0 004 10.5c0 5.25 7.5 11.5 8.5 11.5s8.5-6.25 8.5-11.5z" stroke="#6b8a72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {posted}
          </div>
        </div>

        <div style={{display:'flex',gap:8}}>
          <button className="btn">Request Bid</button>
          <Link href={`/listings/${listing.id}`} className="btn secondary">Details</Link>
        </div>
      </div>
    </article>
  )
}
