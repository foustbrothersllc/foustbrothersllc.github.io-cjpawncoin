'use client'

import { useState } from 'react'
import { InventoryItem, Order, Condition } from '@/types/database'
import { addInventoryItem, updateInventoryItem, deleteInventoryItem } from '@/lib/actions'
import { useRouter } from 'next/navigation'

const CONDITIONS: Condition[] = ['Excellent', 'Good', 'Fair', 'Poor']
const CATEGORIES = ['Electronics', 'Games', 'Instruments', 'Jewelry', 'Tools', 'Collectibles', 'Coins', 'Other']
const emptyForm = { name: '', description: '', price: '', condition: 'Good' as Condition, category: '', image_url: '', stock_quantity: '1' }

const sidebarStyle: React.CSSProperties = {
  width: '180px',
  backgroundColor: '#111',
  borderRight: '2px solid #dc2626',
  minHeight: 'calc(100vh - 60px)',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 0',
  position: 'fixed',
  top: '60px',
  left: 0,
}

export default function AdminPanel({ inventory, orders }: { inventory: InventoryItem[]; orders: Order[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<'dashboard' | 'inventory' | 'orders'>('dashboard')
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

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
      if (editId) await updateInventoryItem(editId, payload)
      else await addInventoryItem(payload)
      setForm(emptyForm)
      setEditId(null)
      setShowForm(false)
      router.refresh()
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const handleEdit = (item: InventoryItem) => {
    setForm({ name: item.name, description: item.description ?? '', price: item.price.toString(), condition: item.condition, category: item.category ?? '', image_url: item.image_url ?? '', stock_quantity: item.stock_quantity.toString() })
    setEditId(item.id)
    setShowForm(true)
    setTab('inventory')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await deleteInventoryItem(id)
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #444',
    color: '#e0e0e0',
    padding: '0.5rem 0.75rem',
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: '0.75rem',
    width: '100%',
    outline: 'none',
  }

  const filteredInventory = inventory.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0)
  const lowStock = inventory.filter(i => i.stock_quantity <= 1).length

  const navItems = [
    { key: 'dashboard', label: 'DASHBOARD', icon: '⊞' },
    { key: 'inventory', label: 'INVENTORY', icon: '📦' },
    { key: 'orders', label: 'ORDERS', icon: '📋' },
  ]

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: '0 1rem 1.5rem', borderBottom: '1px solid #333', marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1rem', color: '#facc15', letterSpacing: '0.05em' }}>C&J PAWN</div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#ef4444', letterSpacing: '0.05em' }}>ADMIN HUD</div>
        </div>

        {navItems.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key as any)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: tab === key ? '#dc2626' : 'transparent',
              border: 'none',
              color: tab === key ? 'white' : '#9ca3af',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <span>{icon}</span> {label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid #333' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            ← VIEW STORE
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            ⎋ LOGOUT
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: '180px', flex: 1, padding: '2rem', minHeight: 'calc(100vh - 60px)' }}>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: '#facc15', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>COMMAND CENTER</h1>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#6b7280', marginBottom: '2rem', letterSpacing: '0.05em' }}>C&J PAWN & GAMES ADMIN HUD</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'INVENTORY ITEMS', value: inventory.length, color: '#22d3ee', icon: '⊞' },
                { label: 'TOTAL ORDERS', value: orders.length, color: '#ef4444', icon: '📋' },
                { label: 'TOTAL REVENUE', value: `$${totalRevenue.toFixed(2)}`, color: '#22c55e', icon: '$' },
                { label: 'LOW STOCK', value: lowStock, color: '#f59e0b', icon: '⚠' },
              ].map(({ label, value, color, icon }) => (
                <div key={label} style={{ backgroundColor: '#242424', border: `1px solid ${color}`, padding: '1.25rem' }}>
                  <div style={{ color, fontSize: '1.25rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color, letterSpacing: '0.05em' }}>{value}</div>
                  <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#6b7280', letterSpacing: '0.05em' }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#242424', border: '1px solid #333', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'Bebas Neue, cursive', color: '#ef4444', fontSize: '1.1rem', letterSpacing: '0.05em' }}>RECENT ORDERS</h2>
                <button onClick={() => setTab('orders')} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>VIEW ALL →</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #333' }}>
                    {['EMAIL', 'TOTAL', 'STATUS', 'DATE'].map(h => (
                      <th key={h} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#6b7280', padding: '0.5rem', textAlign: 'left', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order: any) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: '#d1d5db', padding: '0.75rem 0.5rem' }}>{order.customer_email}</td>
                      <td style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1rem', color: '#facc15', padding: '0.75rem 0.5rem' }}>${Number(order.total_amount).toFixed(2)}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span style={{ backgroundColor: order.status === 'paid' ? '#22c55e' : '#f59e0b', color: 'black', fontSize: '0.65rem', fontFamily: 'Share Tech Mono, monospace', padding: '2px 6px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                          {order.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#6b7280', padding: '0.75rem 0.5rem' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem' }}>NO ORDERS YET</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {tab === 'inventory' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: '#facc15', letterSpacing: '0.05em' }}>INVENTORY</h1>
              <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.75rem 1.5rem', fontFamily: 'Bebas Neue, cursive', fontSize: '1rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
                + ADD ITEM
              </button>
            </div>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#6b7280', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{inventory.length} ITEMS TOTAL</p>

            {showForm && (
              <div style={{ backgroundColor: '#242424', border: '1px solid #444', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Bebas Neue, cursive', color: '#facc15', fontSize: '1.1rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>{editId ? 'EDIT ITEM' : 'NEW ITEM'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input placeholder="Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                  <input placeholder="Price *" type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} style={inputStyle} />
                  <select value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value as Condition }))} style={inputStyle}>
                    {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
                    <option value="">Category...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input placeholder="Stock quantity" type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))} style={inputStyle} />
                  <input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} style={inputStyle} />
                  <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...inputStyle, gridColumn: 'span 2', resize: 'none' }} rows={3} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button onClick={handleSubmit} disabled={saving} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.75rem 1.5rem', fontFamily: 'Bebas Neue, cursive', fontSize: '1rem', letterSpacing: '0.1em', cursor: 'pointer', opacity: saving ? 0.5 : 1 }}>
                    {saving ? 'SAVING...' : editId ? 'SAVE CHANGES' : 'ADD ITEM'}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={{ backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #444', padding: '0.75rem 1rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', cursor: 'pointer' }}>
                    CANCEL
                  </button>
                </div>
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <input placeholder="🔍 SEARCH INVENTORY..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
            </div>

            <div style={{ backgroundColor: '#242424', border: '1px solid #333', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
                    {['ITEM', 'CATEGORY', 'PRICE', 'STOCK', 'CONDITION', 'ACTIONS'].map(h => (
                      <th key={h} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#6b7280', padding: '0.75rem', textAlign: 'left', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: '#e0e0e0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {item.image_url && <img src={item.image_url} alt="" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />}
                          <span>{item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#9ca3af' }}>{item.category}</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Bebas Neue, cursive', fontSize: '1rem', color: '#facc15' }}>${item.price.toFixed(2)}</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: item.stock_quantity <= 1 ? '#ef4444' : '#e0e0e0' }}>{item.stock_quantity}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{
                          fontSize: '0.65rem', fontFamily: 'Share Tech Mono, monospace', fontWeight: 'bold', padding: '2px 6px',
                          backgroundColor: item.condition === 'Excellent' ? '#22c55e' : item.condition === 'Good' ? '#facc15' : item.condition === 'Fair' ? '#f97316' : '#dc2626',
                          color: 'black',
                        }}>
                          {item.condition === 'Excellent' ? 'MINT' : item.condition === 'Good' ? 'GOOD' : item.condition === 'Fair' ? 'VG' : 'POOR'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer', fontSize: '0.9rem' }}>✏️</button>
                          <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: '#facc15', letterSpacing: '0.05em' }}>ORDERS</h1>
              <button onClick={() => router.refresh()} style={{ backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #444', padding: '0.5rem 1rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.05em' }}>⟳ REFRESH</button>
            </div>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#6b7280', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{orders.length} TOTAL</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {['ALL', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'].map((s, i) => (
                <button key={s} style={{ padding: '0.4rem 0.75rem', fontSize: '0.7rem', fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.05em', border: '1px solid #444', backgroundColor: i === 0 ? '#dc2626' : 'transparent', color: i === 0 ? 'white' : '#9ca3af', cursor: 'pointer' }}>{s}</button>
              ))}
            </div>

            <div style={{ backgroundColor: '#242424', border: '1px solid #333' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
                    {['EMAIL', 'TOTAL', 'STRIPE ID', 'STATUS', 'ITEMS', 'DATE'].map(h => (
                      <th key={h} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: '#6b7280', padding: '0.75rem', textAlign: 'left', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: '#d1d5db' }}>{order.customer_email}</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Bebas Neue, cursive', fontSize: '1rem', color: '#facc15' }}>${Number(order.total_amount).toFixed(2)}</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: '#6b7280' }}>{order.stripe_payment_id?.slice(0, 20) || '-'}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ backgroundColor: order.status === 'paid' ? '#22c55e' : '#f59e0b', color: 'black', fontSize: '0.65rem', fontFamily: 'Share Tech Mono, monospace', padding: '2px 6px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                          {order.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: '#9ca3af' }}>{Array.isArray(order.items) ? order.items.length : 0} items</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#6b7280' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem' }}>NO ORDERS YET</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
