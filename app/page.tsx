import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import { getInventory } from '@/lib/actions'

export const revalidate = 60

export default async function HomePage() {
  const inventory = await getInventory()

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-navy mb-8">Shop Our Inventory</h2>
        <ProductGrid items={inventory} />
      </section>
    </>
  )
}
