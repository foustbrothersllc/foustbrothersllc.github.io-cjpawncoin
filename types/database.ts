export type Condition = 'Excellent' | 'Good' | 'Fair' | 'Poor'
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'

export interface InventoryItem {
  id: string
  name: string
  description: string | null
  price: number
  condition: Condition
  category: string | null
  image_url: string | null
  stock_quantity: number
  created_at: string
}

export interface Order {
  id: string
  customer_email: string
  status: OrderStatus
  total_amount: number
  stripe_payment_id: string | null
  shipping_address: ShippingAddress | null
  items: CartItem[]
  created_at: string
}

export interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string | null
  quantity: number
}
