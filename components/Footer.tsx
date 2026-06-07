import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111', borderTop: '2px solid #dc2626', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🎮</span>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', color: '#facc15', lineHeight: 1 }}>C&J PAWN</div>
              <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '0.75rem', color: '#ef4444', lineHeight: 1 }}>&amp; GAMES</div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: 1.6, fontFamily: 'Share Tech Mono, monospace' }}>
            Your local pawn shop, now online.<br />
            Electronics • Games • Jewelry • Collectibles
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', fontSize: '1.25rem' }}>
            <span>🎮</span><span>🏆</span><span>💎</span><span>👤</span>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: 'Bebas Neue, cursive', color: '#ef4444', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>NAVIGATE</h3>
          {['HOME', 'BROWSE', 'ABOUT', 'CART'].map(item => (
            <Link
              key={item}
              href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              style={{ display: 'block', color: '#9ca3af', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Share Tech Mono, monospace', marginBottom: '0.5rem', letterSpacing: '0.05em' }}
            >
              {item}
            </Link>
          ))}
        </div>

        <div>
          <h3 style={{ fontFamily: 'Bebas Neue, cursive', color: '#ef4444', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>CONTACT</h3>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'Share Tech Mono, monospace', lineHeight: 2 }}>
            <div>📍 Wentworth, NC</div>
            <div>📞 (555) 000-0000</div>
            <div>✉️ info@cjpawnandgames.com</div>
          </div>
          <div style={{ marginTop: '1rem', border: '1px solid #dc2626', padding: '0.75rem' }}>
            <div style={{ fontFamily: 'Bebas Neue, cursive', color: '#facc15', fontSize: '0.9rem', letterSpacing: '0.05em' }}>TRUSTED SINCE 1985</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontFamily: 'Share Tech Mono, monospace' }}>Certified Authentic • Fair Evaluations</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #333', padding: '1rem', display: 'flex', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <span style={{ fontSize: '0.7rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace' }}>© 2024 C&J PAWN & GAMES. ALL RIGHTS RESERVED.</span>
        <Link href="/admin" style={{ fontSize: '0.7rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace', textDecoration: 'none' }}>ADMIN</Link>
      </div>
    </footer>
  )
}
