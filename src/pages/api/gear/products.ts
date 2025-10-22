/**
 * GET /api/store/products
 * Fetches all products from Printful with their variants
 */

import type { APIRoute } from 'astro';
import { getAllProductsWithVariants } from '../../../lib/printful';

// Simple in-memory cache (5 minutes TTL)
let cachedProducts: any = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 0; // Temporarily disabled for deployment - will re-enable to 5 * 60 * 1000

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check cache
    const now = Date.now();
    if (cachedProducts && now - cacheTimestamp < CACHE_TTL) {
      return new Response(JSON.stringify(cachedProducts), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes in browser
        },
      });
    }

    // Fetch products from Printful
    const products = await getAllProductsWithVariants();

    // Transform for client consumption
    const transformedProducts = products.map((product) => {
      // Get mockup image from first variant's files (usually the last file in the array)
      const firstVariant = product.sync_variants[0];
      const mockupFile = firstVariant?.files?.[firstVariant.files.length - 1];
      const productThumbnail = mockupFile?.preview_url || product.sync_product.thumbnail_url;

      return {
        id: product.sync_product.id,
        name: product.sync_product.name,
        thumbnail: productThumbnail,
        variants: product.sync_variants.map((variant) => {
          // Use the last file in the files array as it contains the product mockup
          // The files array typically contains: [front design, back design, product mockup]
          const variantMockup = variant.files?.[variant.files.length - 1];
          const variantImage = variantMockup?.preview_url || variant.product.image;

          return {
            id: variant.id,
            variantId: variant.variant_id,
            name: variant.name,
            price: parseFloat(variant.retail_price),
            currency: variant.currency,
            sku: variant.sku,
            image: variantImage,
            files: variant.files.map((file) => ({
              url: file.url,
              preview: file.preview_url,
              thumbnail: file.thumbnail_url,
            })),
          };
        }),
      };
    });

    // Update cache
    cachedProducts = transformedProducts;
    cacheTimestamp = now;

    return new Response(JSON.stringify(transformedProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch products',
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
