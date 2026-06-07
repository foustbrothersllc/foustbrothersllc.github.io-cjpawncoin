import ProductCard from './ProductCard'
import { InventoryItem } from '@/types/database'

export default function ProductGrid({ items, featured = [] }: { items: InventoryItem[]; featured?: string[] }) {
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace' }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏪</p>
        <p>NO INVENTORY YET. CHECK BACK SOON!</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {items.map((item) => (
        <ProductCard key={item.id} item={item} featured={featured.includes(item.id)} />
      ))}
    </div>
  )
}
