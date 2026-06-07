import { getInventory, getAllOrders } from '@/lib/actions'
import AdminPanel from '@/components/AdminPanel'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  let inventory = []
  let orders = []

  try {
    const [inv, ord] = await Promise.all([getInventory(), getAllOrders()])
    inventory = inv
    orders = ord ?? []
  } catch (e) {
    console.error('Admin page error:', e)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-8">Admin Dashboard</h1>
      <AdminPanel inventory={inventory} orders={orders} />
    </div>
  )
}
