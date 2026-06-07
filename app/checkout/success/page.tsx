'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-navy mb-4">Order Confirmed!</h1>
      <p className="text-gray-500 mb-2">Thank you for shopping with C&amp;J Pawn &amp; Games.</p>
      <p className="text-gray-500 mb-10">You'll receive a confirmation email shortly.</p>
      <Link href="/" className="bg-gold text-navy font-bold px-8 py-3 rounded-lg hover:bg-gold-dark transition-colors">
        Continue Shopping
      </Link>
    </div>
  )
}
