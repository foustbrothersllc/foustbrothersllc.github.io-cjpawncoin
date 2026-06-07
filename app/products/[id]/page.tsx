import { getInventoryItem } from '@/lib/actions'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import { conditionColor } from '@/components/ProductCard'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const item = await getInventoryItem(params.id)
  if (!item) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
          {item.image_url ? (
            <Image src={item.image_url} alt={item.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">📦</div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {item.category && (
            <span className="text-sm text-gray-500 uppercase tracking-wide">{item.category}</span>
          )}
          <h1 className="text-3xl font-bold text-navy">{item.name}</h1>
          <p className="text-3xl font-bold text-gold-dark">${item.price.toFixed(2)}</p>

          <span className={`inline-block w-fit px-3 py-1 rounded-full text-sm font-medium ${conditionColor(item.condition)}`}>
            {item.condition}
          </span>

          {item.description && (
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          )}

          <div className="mt-4">
            {item.stock_quantity > 0 ? (
              <AddToCartButton item={item} />
            ) : (
              <button disabled className="w-full py-3 rounded-lg bg-gray-200 text-gray-400 font-medium cursor-not-allowed">
                Out of Stock
              </button>
            )}
          </div>

          <p className="text-sm text-gray-400">
            {item.stock_quantity > 0 ? `${item.stock_quantity} in stock` : 'Currently unavailable'}
          </p>
        </div>
      </div>
    </div>
  )
}
