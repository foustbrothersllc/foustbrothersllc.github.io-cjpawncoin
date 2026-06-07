'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { InventoryItem, Condition } from '@/types/database'
import { useState } from 'react'

export function conditionColor(condition: Condition): string {
  switch (condition) {
    case 'Excellent': return 'bg-green-500 text-black'
    case 'Good': return 'bg-yellow-400 text-black'
    case 'Fair': return 'bg-orange-500 text-black'
    case 'Poor': return 'bg-red-700 text-white'
  }
}

export function conditionLabel(condition: Condition): string {
  switch (condition) {
    case 'Excellent': return 'MINT'
    case 'Good': return 'GOOD'
    case 'Fair': return 'VG'
    case 'Poor': return 'POOR'
  }
}

export default function ProductCard({ item, featured = false }: { item: InventoryItem; featured?: boolean }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: item.id, name: item.name, price: item.price, image_url: item.image_url })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div style={{ backgroundColor: '#242424', border: '1px solid #333', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {featured && (
        <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10, backgroundColor: '#facc15', color: 'black', fontSize: '0.65rem', fontFamily: 'Share Tech Mono, monospace', fontWeight: 'bold', padding: '2px 6px', letterSpacing: '0.05em' }}>
          ★ FEATURED
        </div>
      )}

      <Link href={`/products/${item.id}`} style={{ display: 'block', aspectRatio: '1', position: 'relative', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
        {item.image_url ? (
          <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#444' }}>📦</div>
        )}
      </Link>

      <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link href={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', color: '#e0e0e0', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.name}
          </h3>
        </Link>

        <span style={{
          display: 'inline-block',
          fontSize: '0.65rem',
          fontFamily: 'Share Tech Mono, monospace',
          fontWeight: 'bold',
          padding: '2px 6px',
          backgroundColor: item.condition === 'Excellent' ? '#22c55e' : item.condition === 'Good' ? '#facc15' : item.condition === 'Fair' ? '#f97316' : '#dc2626',
          color: 'black',
          letterSpacing: '0.05em',
          width: 'fit-content',
        }}>
          {conditionLabel(item.condition)}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem' }}>
          <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.3rem', color: '#facc15', letterSpacing: '0.05em' }}>
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={item.stock_quantity === 0}
            style={{
              backgroundColor: item.stock_quantity === 0 ? '#444' : added ? '#22c55e' : '#dc2626',
              color: 'white',
              border: 'none',
              padding: '0.4rem 0.75rem',
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              cursor: item.stock_quantity === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            {item.stock_quantity === 0 ? 'SOLD' : added ? '✓ ADDED' : '🛒 ADD'}
          </button>
        </div>
      </div>
    </div>
  )
}
