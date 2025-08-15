import fs from 'fs'
import path from 'path'

export default function Listing({ listing }){
  if (!listing) return <div className="container">Listing not found</div>
  return (
    <div className="container">
      <h1>{listing.title}</h1>
      <p>Type: {listing.type}</p>
      <p>Condition: {listing.condition}</p>
      {listing.image && <img src={listing.image} style={{maxWidth:400}} />}
      <div style={{marginTop:12}}>
        <button>Request Fixer</button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }){
  const p = path.join(process.cwd(), 'data', 'listings.json')
  const raw = fs.readFileSync(p, 'utf8')
  const arr = JSON.parse(raw)
  const listing = arr.find(l => l.id === params.id) || null
  return { props: { listing } }
}
