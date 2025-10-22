/**
 * POST /api/webhooks/printful
 * Handles Printful webhook events (order status updates, tracking info, etc.)
 */

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse webhook payload
    const payload = await request.json();

    console.log('Received Printful webhook:', payload.type);

    // Handle different webhook types
    switch (payload.type) {
      case 'package_shipped': {
        const { order, shipment } = payload.data;

        console.log(`Order ${order.id} (external: ${order.external_id}) has shipped`);
        console.log(`Tracking: ${shipment.tracking_number} (${shipment.carrier})`);
        console.log(`Tracking URL: ${shipment.tracking_url}`);

        // TODO: Send tracking email to customer
        // You could:
        // 1. Store tracking info in database
        // 2. Send email notification with tracking link
        // 3. Update order status in your system

        break;
      }

      case 'package_returned': {
        const { order, reason } = payload.data;

        console.log(`Order ${order.id} (external: ${order.external_id}) was returned`);
        console.log(`Reason: ${reason}`);

        // TODO: Handle returned package
        // You could:
        // 1. Notify customer
        // 2. Process refund if applicable
        // 3. Log for investigation

        break;
      }

      case 'order_failed': {
        const { order, reason } = payload.data;

        console.log(`Order ${order.id} (external: ${order.external_id}) failed`);
        console.log(`Reason: ${reason}`);

        // TODO: Handle failed order
        // You could:
        // 1. Alert admin
        // 2. Process refund
        // 3. Contact customer

        break;
      }

      case 'order_canceled': {
        const { order, reason } = payload.data;

        console.log(`Order ${order.id} (external: ${order.external_id}) was canceled`);
        console.log(`Reason: ${reason}`);

        // TODO: Handle canceled order
        // You could:
        // 1. Process refund if payment was captured
        // 2. Notify customer
        // 3. Update order status

        break;
      }

      case 'product_synced': {
        const { sync_product } = payload.data;

        console.log(`Product ${sync_product.id} was synced`);

        // TODO: Handle product sync
        // You could:
        // 1. Update product cache
        // 2. Notify if new product was added
        // 3. Update product database

        break;
      }

      case 'order_put_hold': {
        const { order, reason } = payload.data;

        console.log(`Order ${order.id} (external: ${order.external_id}) was put on hold`);
        console.log(`Reason: ${reason}`);

        // TODO: Handle order on hold
        // You could:
        // 1. Alert admin for manual review
        // 2. Contact customer if action needed
        // 3. Log for investigation

        break;
      }

      case 'order_remove_hold': {
        const { order } = payload.data;

        console.log(`Order ${order.id} (external: ${order.external_id}) hold was removed`);

        // TODO: Handle hold removal
        // You could:
        // 1. Update order status
        // 2. Notify admin
        // 3. Resume normal processing

        break;
      }

      default:
        console.log(`Unhandled Printful webhook type: ${payload.type}`);
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
    console.error('Error processing Printful webhook:', error);

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
