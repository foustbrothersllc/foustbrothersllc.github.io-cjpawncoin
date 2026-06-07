export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
      
      <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.5rem', color: '#facc15', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>ABOUT US</h1>
      <div style={{ width: '60px', height: '3px', backgroundColor: '#dc2626', marginBottom: '2rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        
        <div>
          <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            C&J Pawn & Games has been your trusted local pawn shop since 1985. We buy, sell, and trade electronics, video games, jewelry, watches, and collectibles.
          </p>
          <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.8 }}>
            Every item in our inventory is carefully evaluated by our expert team. We stand behind every product we sell — if it's in our store, it's been inspected and verified.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { icon: '🏅', title: 'CERTIFIED AUTHENTIC', desc: 'Every item thoroughly inspected before listing' },
            { icon: '⚖️', title: 'FAIR EVALUATIONS', desc: 'Honest prices for buyers and sellers alike' },
            { icon: '⚡', title: 'FAST TURNAROUND', desc: 'Quick cash offers on quality items' },
            { icon: '📍', title: 'LOCAL & TRUSTED', desc: 'Serving our community since 1985' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ backgroundColor: '#242424', border: '1px solid #333', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.25rem', color: '#dc2626' }}>{icon}</span>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, cursive', color: '#facc15', fontSize: '1rem', letterSpacing: '0.05em' }}>{title}</div>
                <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#9ca3af' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
