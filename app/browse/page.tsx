'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { InventoryItem } from '@/types/database'

const CATEGORIES = ['ALL', 'COINS', 'COLLECTIBLES', 'ELECTRONICS', 'GAMES', 'JEWELRY', 'OTHER']

export default function BrowsePage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [filtered, setFiltered] = useState<InventoryItem[]>([])
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    fetch('/api/inventory')
      .then(r => r.json())
      .then(data => {
        setItems(data)
        setFiltered(data)
      })
  }, [])

  useEffect(() => {
    let result = [...items]
    if (activeCategory !== 'ALL') {
      result = result.filter(i => i.category?.toUpperCase() === activeCategory || i.category?.toUpperCase().includes(activeCategory))
    }
    if (search) {
      result = result.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    setFiltered(result)
  }, [items, activeCategory, search, sort])

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.5rem', color: '#facc15', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
        INVENTORY MATRIX
      </h1>
      <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: '#6b7280', marginBottom: '2rem', letterSpacing: '0.05em' }}>
        {filtered.length} ITEMS AVAILABLE
      </p>

      {/* Search + Sort */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '0.9rem' }}>🔍</span>
          <input
            type="text"
            placeholder="SEARCH INVENTORY..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#242424',
              border: '1px solid #444',
              color: '#e0e0e0',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              outline: 'none',
            }}
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            backgroundColor: '#242424',
            border: '1px solid #444',
            color: '#e0e0e0',
            padding: '0.75rem 1rem',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="newest">NEWEST FIRST</option>
          <option value="price-asc">PRICE: LOW TO HIGH</option>
          <option value="price-desc">PRICE: HIGH TO LOW</option>
        </select>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace' }}>
          NO ITEMS FOUND
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {filtered.map((item, i) => (
            <ProductCard key={item.id} item={item} featured={i < 4} />
          ))}
        </div>
      )}
    </div>
  )
}
