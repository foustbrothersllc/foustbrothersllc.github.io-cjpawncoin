'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { InventoryItem, Condition } from '@/types/database'
import { useState } from 'react'

export function conditionColor(condition: Condition) {
  switch (condition) {
    case 'Excellent': return 'bg-green-100 text-green-800'
    case 'Good': return 'bg-blue-100 text-blue-800'
    case 'Fair': return 'bg-yellow-100 text-yellow-800'
    case 'Poor': return 'bg-red-100 text-red-800'
  }
}

export default function ProductCard({ item }: { item: InventoryItem }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/products/${item.id}`} className="block aspect-square relative bg-gray-50">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">📦</div>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        {item.category && (
          <span className="text-xs text-gray-400 uppercase tracking-wide">{item.category}</span>
        )}
        <Link href={`/products/${item.id}`}>
          <h3 className="font-semibold text-navy text-sm leading-snug hover:text-gold-dark transition-colors line-clamp-2">
            {item.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-gold-dark">${item.price.toFixed(2)}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${conditionColor(item.condition)}`}>
            {item.condition}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={item.stock_quantity === 0}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
            item.stock_quantity === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : added
              ? 'bg-green-500 text-white'
              : 'bg-navy text-white hover:bg-navy-light'
          }`}
        >
          {item.stock_quantity === 0 ? 'Out of Stock' : added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
