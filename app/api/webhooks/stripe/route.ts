import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const items = session.metadata?.items ? JSON.parse(session.metadata.items) : []
    const shippingDetails = session.shipping_details

    const admin = supabaseAdmin()
    await admin.from('orders').insert({
      customer_email: session.customer_email,
      status: 'paid',
      total_amount: (session.amount_total ?? 0) / 100,
      stripe_payment_id: session.payment_intent,
      shipping_address: shippingDetails?.address ?? null,
      items,
    })
  }

  return NextResponse.json({ received: true })
}
