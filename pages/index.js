import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import ListingCard from '../components/ListingCard'

export default function Home({ listings }) {
  return (
    <>
      <section className="hero">
        <h1>FixItUp — Campus Marketplace</h1>
        <p>Connect with fellow students to repair, reuse, and recycle items on campus.</p>
      </section>

      <section>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2>Recent Listings</h2>
          <div>
            <Link href="/create"><button className="btn">Create Listing</button></Link>
          </div>
        </div>

        {listings.length === 0 ? <p className="muted">No listings yet. Create one!</p> : (
          <div className="grid">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>
    </>
  )
}

export async function getServerSideProps() {
  const dataPath = path.join(process.cwd(), 'data', 'listings.json')
  let listings = []
  try {
    const raw = fs.readFileSync(dataPath, 'utf8')
    listings = JSON.parse(raw).reverse()
  } catch (e) {
    // ignore
  }
  return { props: { listings } }
}
