'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const { itemCount } = useCart()

  return (
    <header className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gold tracking-tight">
          C&amp;J Pawn &amp; Games
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <Link href="/" className="hover:text-gold transition-colors">Shop</Link>
          <Link href="/admin" className="hover:text-gold transition-colors">Admin</Link>
        </nav>

        <Link href="/cart" className="relative flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
          <span className="text-xl">🛒</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="hidden md:inline text-sm">Cart</span>
        </Link>
      </div>
    </header>
  )
}
