'use client'

import { useCart } from '@/lib/cart-context'
import { InventoryItem } from '@/types/database'
import { useState } from 'react'

export default function AddToCartButton({ item }: { item: InventoryItem }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image_url: item.image_url })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
        added ? 'bg-green-500 text-white' : 'bg-gold text-navy hover:bg-gold-dark'
      }`}
    >
      {added ? '✓ Added to Cart!' : 'Add to Cart'}
    </button>
  )
}
