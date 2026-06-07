import ProductCard from './ProductCard'
import { InventoryItem } from '@/types/database'

export default function ProductGrid({ items }: { items: InventoryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="text-5xl mb-4">🏪</p>
        <p className="text-lg">No inventory yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div id="shop" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  )
}
