import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a0a0a 50%, #1a1a1a 100%)', borderBottom: '2px solid #dc2626', padding: '5rem 1rem 4rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '0.7rem', fontFamily: 'Share Tech Mono, monospace', padding: '0.3rem 0.75rem', letterSpacing: '0.1em' }}>
            ★ NOW ACCEPTING TRADE-INS
          </span>
        </div>

        <h1 style={{ fontFamily: 'Bebas Neue, cursive', lineHeight: 0.9, marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', fontSize: '6rem', color: '#facc15', textShadow: '4px 4px 0px #dc2626', letterSpacing: '0.02em' }}>C&J PAWN</span>
          <span style={{ display: 'block', fontSize: '6rem', color: '#ef4444', textShadow: '4px 4px 0px #7f1d1d', letterSpacing: '0.02em' }}>&amp; GAMES</span>
        </h1>

        <p style={{ fontFamily: 'Share Tech Mono, monospace', color: '#d1d5db', fontSize: '0.9rem', maxWidth: '400px', lineHeight: 1.7, marginBottom: '2rem' }}>
          Your local pawn shop, now online. Browse hundreds of electronics, games, jewelry &amp; collectibles.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <Link href="/browse" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '1rem 2rem',
            textDecoration: 'none',
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '1.1rem',
            letterSpacing: '0.1em',
            border: '2px solid #ef4444',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            BROWSE INVENTORY ›
          </Link>
          <Link href="/browse?new=1" style={{
            backgroundColor: 'transparent',
            color: '#facc15',
            padding: '1rem 2rem',
            textDecoration: 'none',
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '1.1rem',
            letterSpacing: '0.1em',
            border: '2px solid #facc15',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            NEW ARRIVALS
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { icon: '⏰', text: 'TRUSTED SINCE 1985' },
            { icon: '🏅', text: 'CERTIFIED AUTHENTIC' },
            { icon: '⚡', text: 'FAST SHIPPING' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem' }}>{icon}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '0.05em' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
