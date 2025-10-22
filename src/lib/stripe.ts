/**
 * Stripe Integration
 * Documentation: https://stripe.com/docs/api
 */

import Stripe from 'stripe';

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = import.meta.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY is not set. Payment functionality will not work.');
}

// Initialize Stripe
export const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })
  : null;

// Cart item interface
export interface CartItem {
  variantId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
  sku?: string;
}

/**
 * Create a Stripe Checkout Session
 */
export async function createCheckoutSession(
  cartItems: CartItem[],
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }

  // Transform cart items into Stripe line items
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.size || item.color ? `${item.size || ''} ${item.color || ''}`.trim() : undefined,
        images: item.image ? [item.image] : undefined,
        metadata: {
          variant_id: item.variantId.toString(),
          product_id: item.productId.toString(),
          sku: item.sku || '',
        },
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  // Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'JP'],
    },
    phone_number_collection: {
      enabled: true,
    },
    billing_address_collection: 'required',
    metadata: {
      source: 'machine-king-labs-store',
    },
    allow_promotion_codes: true,
  });

  return session;
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer'],
  });

  return session;
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error}`);
  }
}

/**
 * Extract shipping address from checkout session
 */
export function extractShippingAddress(session: Stripe.Checkout.Session) {
  const shipping = session.shipping;

  if (!shipping || !shipping.address) {
    throw new Error('No shipping address found in session');
  }

  return {
    name: shipping.name || '',
    address1: shipping.address.line1 || '',
    address2: shipping.address.line2 || '',
    city: shipping.address.city || '',
    state_code: shipping.address.state || '',
    country_code: shipping.address.country || '',
    zip: shipping.address.postal_code || '',
    phone: session.customer_details?.phone || '',
    email: session.customer_details?.email || '',
  };
}

/**
 * Extract line items from checkout session for Printful order
 */
export async function extractLineItemsForPrintful(session: Stripe.Checkout.Session) {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }

  // Expand line items if not already expanded
  let lineItems = session.line_items?.data;

  if (!lineItems) {
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });
    lineItems = expandedSession.line_items?.data;
  }

  if (!lineItems || lineItems.length === 0) {
    throw new Error('No line items found in session');
  }

  return lineItems.map((item) => {
    const variantId = item.price?.product
      ? typeof item.price.product === 'string'
        ? null
        : item.price.product.metadata?.variant_id
      : null;

    return {
      sync_variant_id: variantId ? parseInt(variantId) : undefined,
      quantity: item.quantity || 1,
      retail_price: item.price?.unit_amount
        ? (item.price.unit_amount / 100).toFixed(2)
        : undefined,
    };
  });
}

/**
 * Create a refund for a payment
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
): Promise<Stripe.Refund> {
  if (!stripe) {
    throw new Error('Stripe is not initialized');
  }

  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
    reason,
  });

  return refund;
}
