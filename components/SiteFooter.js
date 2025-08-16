export default function SiteFooter(){
  return (
    <footer className="app-footer" style={{textAlign:'left'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
        <div>
          <div style={{fontWeight:700,color:'#0b2b16'}}>FixItUp</div>
          <div className="muted">Campus repairs, reuse & recycling</div>
        </div>

        <div style={{display:'flex',gap:24}}>
          <div>
            <div style={{fontWeight:700}}>Community</div>
            <div className="muted"><a href="#">Environmental Club</a></div>
            <div className="muted"><a href="#">Donation Drives</a></div>
          </div>

          <div>
            <div style={{fontWeight:700}}>Support</div>
            <div className="muted"><a href="#">Help</a></div>
            <div className="muted"><a href="#">FAQ</a></div>
          </div>
        </div>
      </div>

      <div style={{marginTop:12,color:'var(--muted)'}}>© {new Date().getFullYear()} FixItUp — encouraging reuse and sustainable campus life</div>
    </footer>
  )
}
