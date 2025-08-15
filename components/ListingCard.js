import Link from 'next/link'

export default function ListingCard({ listing }){
  return (
    <article className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3 style={{margin:0}}>{listing.title}</h3>
        <div className="badge">{listing.type}</div>
      </div>

      {listing.image ? (
        <img className="listing-img" src={listing.image} alt={listing.title} />
      ) : (
        <div style={{height:140,background:'linear-gradient(180deg,#f7faf4,#eef7ea)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)'}}>No image</div>
      )}

      <p className="muted">Condition: {listing.condition}</p>

      <div className="meta">
        <div className="muted">Posted: {new Date(listing.createdAt).toLocaleString()}</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn">Request Bid</button>
          <Link href={`/listings/${listing.id}`}><button className="btn secondary">Details</button></Link>
        </div>
      </div>
    </article>
  )
}
