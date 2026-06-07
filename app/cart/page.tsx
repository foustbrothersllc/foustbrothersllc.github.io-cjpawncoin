'use client'

import { useCart } from '@/lib/cart-context'
import { createCheckoutSession } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
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
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="text-2xl font-bold text-navy mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Find something you love in our inventory.</p>
        <Link href="/" className="bg-gold text-navy font-bold px-8 py-3 rounded-lg hover:bg-gold-dark transition-colors">
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-navy mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-navy">{item.name}</h3>
              <p className="text-gold-dark font-bold">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">−</button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
            </div>

            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 ml-2 text-xl">×</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between text-lg font-bold text-navy mb-6">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gold text-navy font-bold py-4 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
        >
          {loading ? 'Redirecting to checkout...' : 'Proceed to Checkout'}
        </button>
        <p className="text-center text-sm text-gray-400 mt-3">Secure checkout powered by Stripe</p>
      </div>
    </div>
  )
}
