export default function FixerCard({ fixer }){
  return (
    <div className="card" style={{minWidth:220}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:56,height:56,borderRadius:12,background:'linear-gradient(135deg,var(--accent),var(--accent-2))',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700}}>{fixer.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div>
          <div style={{fontWeight:700}}>{fixer.name}</div>
          <div className="muted" style={{fontSize:13}}>{fixer.badge}</div>
        </div>
      </div>
      <div style={{marginTop:10}} className="muted">Categories: {fixer.categories.join(', ')}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
        <div className={fixer.available? 'badge' : 'muted'}>{fixer.available? 'Available' : 'Away'}</div>
        <button className="btn secondary">Message</button>
      </div>
    </div>
  )
}
