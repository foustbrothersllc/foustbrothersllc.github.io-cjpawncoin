import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'C&J Pawn & Games',
  description: 'Quality pre-owned electronics, games, instruments, jewelry and more. Honestly priced.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="bg-navy text-white text-center py-8 mt-16 text-sm">
            <p className="text-gray-400">© {new Date().getFullYear()} C&amp;J Pawn &amp; Games. All rights reserved.</p>
            <p className="text-gray-500 mt-1">Wentworth, NC</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
