/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events (payment confirmation, refunds, etc.)
 */

import type { APIRoute } from 'astro';
import { verifyWebhookSignature, extractShippingAddress, getCheckoutSession } from '../../../lib/stripe';
import { createOrder } from '../../../lib/printful';
import type Stripe from 'stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get the raw body and signature
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Missing stripe-signature header' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return new Response(
        JSON.stringify({
          error: 'Webhook signature verification failed',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Received Stripe webhook: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log(`Payment successful for session: ${session.id}`);

        // Get full session details with line items
        const fullSession = await getCheckoutSession(session.id);

        // Extract shipping address
        const shippingAddress = extractShippingAddress(fullSession);

        // Extract line items and prepare Printful order
        const lineItems = fullSession.line_items?.data || [];

        const printfulItems = lineItems.map((item) => {
          // Extract variant ID from product metadata
          const price = item.price;
          let variantId: number | undefined;

          if (price && typeof price.product === 'object' && price.product.metadata) {
            variantId = parseInt(price.product.metadata.variant_id);
          }

          return {
            sync_variant_id: variantId,
            quantity: item.quantity || 1,
            retail_price: price?.unit_amount
              ? (price.unit_amount / 100).toFixed(2)
              : undefined,
          };
        });

        // Create Printful order
        try {
          const printfulOrder = await createOrder({
            external_id: session.id,
            shipping: 'STANDARD', // Can be made dynamic based on customer selection
            recipient: shippingAddress,
            items: printfulItems,
            retail_costs: {
              currency: 'USD',
              subtotal: (session.amount_subtotal! / 100).toFixed(2),
              shipping: (session.total_details?.amount_shipping || 0 / 100).toFixed(2),
              tax: (session.total_details?.amount_tax || 0 / 100).toFixed(2),
            },
          });

          console.log(`Printful order created: ${printfulOrder.id} (external: ${printfulOrder.external_id})`);
        } catch (printfulError) {
          console.error('Failed to create Printful order:', printfulError);
          // Log but don't fail the webhook - we'll handle this manually if needed
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment failed for PaymentIntent: ${paymentIntent.id}`);
        // Handle failed payment (e.g., send notification)
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`Charge refunded: ${charge.id}`);
        // Handle refund (may need to cancel Printful order if not yet shipped)
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);

    return new Response(
      JSON.stringify({
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
