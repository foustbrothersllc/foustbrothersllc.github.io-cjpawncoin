import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import { getInventory } from '@/lib/actions'

export const revalidate = 60

export default async function HomePage() {
  const inventory = await getInventory()
  const featured = inventory.slice(0, 4)
  const newArrivals = inventory.slice(0, 10)

  const categories = ['ALL', 'COINS', 'COLLECTIBLES', 'ELECTRONICS', 'GAMES', 'JEWELRY', 'OTHER']

  return (
    <>
      <Hero />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>

        {/* Weekly Featured */}
        <section style={{ marginBottom: '4rem' }}>
          <div className="section-title">
            ★ WEEKLY FEATURED
            <div className="section-title-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {featured.map((item) => (
              <ProductCard key={item.id} item={item} featured={true} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div className="section-title" style={{ marginBottom: 0 }}>
              NEW ARRIVALS
              <div className="section-title-line" />
            </div>
            <Link href="/browse" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: '#ef4444', textDecoration: 'none', letterSpacing: '0.05em' }}>
              VIEW ALL →
            </Link>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button key={cat} className={`category-btn ${i === 0 ? 'active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {newArrivals.map((item, i) => (
              <ProductCard key={item.id} item={item} featured={i < 4} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
