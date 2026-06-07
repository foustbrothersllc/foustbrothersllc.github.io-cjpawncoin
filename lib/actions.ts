'use server'

import { supabase, supabaseAdmin } from './supabase'
import { stripe } from './stripe'
import { CartItem, InventoryItem } from '@/types/database'

export async function getInventory(): Promise<InventoryItem[]> {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inventory:', error)
    return []
  }

  return data as InventoryItem[]
}

export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as InventoryItem
}

export async function createCheckoutSession(items: CartItem[], customerEmail?: string) {
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: item.image_url ? [item.image_url] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    shipping_address_collection: { allowed_countries: ['US'] },
    metadata: { items: JSON.stringify(items) },
  })

  return { url: session.url }
}

export async function addInventoryItem(item: Omit<InventoryItem, 'id' | 'created_at'>) {
  const admin = supabaseAdmin()
  const { data, error } = await admin.from('inventory').insert(item).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateInventoryItem(id: string, item: Partial<InventoryItem>) {
  const admin = supabaseAdmin()
  const { data, error } = await admin.from('inventory').update(item).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteInventoryItem(id: string) {
  const admin = supabaseAdmin()
  const { error } = await admin.from('inventory').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function getAllOrders() {
  const admin = supabaseAdmin()
  const { data, error } = await admin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}
