import fs from 'fs'
import path from 'path'

export default function Fixers({ fixers }) {
  return (
    <div className="container">
      <h1>Campus Fixers</h1>
      <div className="grid">
        {fixers.map(f => (
          <div key={f.id} className="card">
            <h3>{f.name}</h3>
            <p>Categories: {f.categories.join(', ')}</p>
            <p>Badge: {f.badge}</p>
            <p>Available: {f.available ? 'Yes' : 'No'}</p>
            <button>Message / Bid</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  const p = path.join(process.cwd(), 'data', 'fixers.json')
  const raw = fs.readFileSync(p, 'utf8')
  return { props: { fixers: JSON.parse(raw) } }
}
