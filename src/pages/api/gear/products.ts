/**
 * GET /api/store/products
 * Fetches all products from Printful with their variants
 */

import type { APIRoute } from 'astro';
import { getAllProductsWithVariants } from '../../../lib/printful';

// Simple in-memory cache (5 minutes TTL)
let cachedProducts: any = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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

    // Map color names to their hash suffixes from downloaded mockups
    const mockupHashes: Record<string, string> = {
      'black': '68f9369d0e9f2',
      'light-pink': '68f9369d0f04a',
      'sky-blue': '68f9369d0ec72',
      'team-royal': '68f9369d0edd1',
      'white': '68f9369d0ef27',
    };

    // Transform for client consumption
    const transformedProducts = products.map((product) => {
      const productId = product.sync_product.id;

      return {
        id: productId,
        name: product.sync_product.name,
        // Use black-front mockup as thumbnail for product 398235774, otherwise use Printful thumbnail
        thumbnail: productId === 398235774
          ? `/images/mockups/cotton-heritage-m2580-i-unisex-premium-pullover-hoodie-black-front-${mockupHashes['black']}.png`
          : product.sync_product.thumbnail_url,
        variants: product.sync_variants.map((variant) => {
          // Extract color for mockup mapping
          const colorMatch = variant.name.match(/^([^/]+)/);
          const color = colorMatch ? colorMatch[1].trim().toLowerCase().replace(/\s+/g, '-') : '';
          const hash = mockupHashes[color];

          // Use mockup image if available, otherwise fall back to Printful image
          const mockupImage = (productId === 398235774 && hash)
            ? `/images/mockups/cotton-heritage-m2580-i-unisex-premium-pullover-hoodie-${color}-front-${hash}.png`
            : variant.product.image;

          return {
            id: variant.id,
            variantId: variant.variant_id,
            name: variant.name,
            price: parseFloat(variant.retail_price),
            currency: variant.currency,
            sku: variant.sku,
            image: mockupImage,
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
