'use client'

import { useCart } from '@/lib/cart-context'
import { createCheckoutSession } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { url } = await createCheckoutSession(items)
      if (url) window.location.href = url
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '5rem 1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</p>
        <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: '#facc15', letterSpacing: '0.05em', marginBottom: '1rem' }}>YOUR CART IS EMPTY</h1>
        <p style={{ fontFamily: 'Share Tech Mono, monospace', color: '#9ca3af', fontSize: '0.8rem', marginBottom: '2rem' }}>Find something you love in our inventory.</p>
        <Link href="/browse" style={{ backgroundColor: '#dc2626', color: 'white', padding: '1rem 2rem', textDecoration: 'none', fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
          SHOP NOW
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: '#facc15', letterSpacing: '0.05em', marginBottom: '2rem' }}>YOUR CART</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#242424', border: '1px solid #333', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '70px', height: '70px', position: 'relative', backgroundColor: '#1a1a1a', flexShrink: 0 }}>
              {item.image_url ? (
                <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📦</div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.85rem', color: '#e0e0e0', marginBottom: '0.25rem' }}>{item.name}</h3>
              <p style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', color: '#facc15' }}>${item.price.toFixed(2)}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', border: '1px solid #444', backgroundColor: 'transparent', color: '#e0e0e0', cursor: 'pointer', fontFamily: 'Share Tech Mono, monospace' }}>−</button>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.85rem', color: '#e0e0e0', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', border: '1px solid #444', backgroundColor: 'transparent', color: '#e0e0e0', cursor: 'pointer', fontFamily: 'Share Tech Mono, monospace' }}>+</button>
            </div>

            <button onClick={() => removeItem(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', padding: '0 0.5rem' }}>×</button>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#242424', border: '1px solid #333', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.25rem', color: '#e0e0e0', letterSpacing: '0.05em' }}>SUBTOTAL</span>
          <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.5rem', color: '#facc15' }}>${subtotal.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} disabled={loading} style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '1rem', fontFamily: 'Bebas Neue, cursive', fontSize: '1.25rem', letterSpacing: '0.1em', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'REDIRECTING...' : 'PROCEED TO CHECKOUT'}
        </button>
        <p style={{ textAlign: 'center', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#6b7280', marginTop: '0.75rem' }}>SECURED BY STRIPE 🔒</p>
      </div>
    </div>
  )
}
