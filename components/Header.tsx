'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { itemCount } = useCart()
  const pathname = usePathname()

  return (
    <header style={{ backgroundColor: '#111', borderBottom: '2px solid #dc2626', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', color: '#facc15' }}>🎮</span>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', color: '#facc15', lineHeight: 1, letterSpacing: '0.05em' }}>C&J PAWN</div>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '0.75rem', color: '#ef4444', lineHeight: 1, letterSpacing: '0.05em' }}>&amp; GAMES</div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { href: '/', label: 'HOME' },
            { href: '/browse', label: 'BROWSE' },
            { href: '/about', label: 'ABOUT' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                color: pathname === href ? '#ef4444' : '#d1d5db',
                borderBottom: pathname === href ? '2px solid #ef4444' : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.5rem 1rem',
            textDecoration: 'none',
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            position: 'relative',
          }}
        >
          🛒 CART
          {itemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#facc15',
              color: 'black',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Share Tech Mono, monospace',
            }}>
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
