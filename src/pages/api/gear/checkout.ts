/**
 * POST /api/store/checkout
 * Creates a Stripe Checkout Session for the cart items
 */

import type { APIRoute } from 'astro';
import { createCheckoutSession, type CartItem } from '../../../lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { items } = body as { items: CartItem[] };

    console.log('Checkout request - Items count:', items?.length);

    // Validate cart items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Invalid cart',
          message: 'Cart must contain at least one item',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get the base URL for success/cancel redirects
    const baseUrl = url.origin;
    const successUrl = `${baseUrl}/gear/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/gear`;

    // Create Stripe Checkout Session
    const session = await createCheckoutSession(items, successUrl, cancelUrl);

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to create checkout session',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
