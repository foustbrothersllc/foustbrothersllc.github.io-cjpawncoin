'use client'

import { useState } from 'react'
import { InventoryItem, Order, Condition } from '@/types/database'
import { addInventoryItem, updateInventoryItem, deleteInventoryItem } from '@/lib/actions'
import { useRouter } from 'next/navigation'

const CONDITIONS: Condition[] = ['Excellent', 'Good', 'Fair', 'Poor']
const CATEGORIES = ['Electronics', 'Games', 'Instruments', 'Jewelry', 'Tools', 'Collectibles', 'Other']

const emptyForm = { name: '', description: '', price: '', condition: 'Good' as Condition, category: '', image_url: '', stock_quantity: '1' }

export default function AdminPanel({ inventory, orders }: { inventory: InventoryItem[]; orders: Order[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<'inventory' | 'orders'>('inventory')
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.price) return
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        price: parseFloat(form.price),
        condition: form.condition,
        category: form.category || null,
        image_url: form.image_url || null,
        stock_quantity: parseInt(form.stock_quantity) || 1,
      }
      if (editId) {
        await updateInventoryItem(editId, payload)
      } else {
        await addInventoryItem(payload)
      }
      setForm(emptyForm)
      setEditId(null)
      setShowForm(false)
      router.refresh()
    } catch (e) {
      console.error(e)
    }
    setSaving(false)
  }

  const handleEdit = (item: InventoryItem) => {
    setForm({
      name: item.name,
      description: item.description ?? '',
      price: item.price.toString(),
      condition: item.condition,
      category: item.category ?? '',
      image_url: item.image_url ?? '',
      stock_quantity: item.stock_quantity.toString(),
    })
    setEditId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await deleteInventoryItem(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {(['inventory', 'orders'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-colors ${tab === t ? 'border-gold text-navy' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
            {t} ({t === 'inventory' ? inventory.length : orders.length})
          </button>
        ))}
      </div>

      {tab === 'inventory' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-navy">Inventory</h2>
            <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }} className="bg-gold text-navy text-sm font-bold px-4 py-2 rounded-lg hover:bg-gold-dark transition-colors">
              + Add Item
            </button>
          </div>

          {showForm && (
            <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-navy mb-4">{editId ? 'Edit Item' : 'New Item'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Price *" type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <select value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value as Condition }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Category...</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input placeholder="Stock quantity" type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm md:col-span-2 resize-none" rows={3} />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleSubmit} disabled={saving} className="bg-navy text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-navy-light disabled:opacity-50">
                  {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add Item'}
                </button>
                <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Condition</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inventory.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-navy">{item.name}</td>
                    <td className="px-4 py-3 text-gold-dark font-bold">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-500">{item.condition}</td>
                    <td className="px-4 py-3">{item.stock_quantity}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-500 hover:underline text-xs">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{order.customer_email}</td>
                  <td className="px-4 py-3 capitalize">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-gold-dark">${Number(order.total_amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-400">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
