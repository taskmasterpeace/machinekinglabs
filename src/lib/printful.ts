/**
 * Printful API Integration
 * Documentation: https://developers.printful.com/docs/
 */

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_TOKEN = import.meta.env.PRINTFUL_API_TOKEN;

if (!PRINTFUL_API_TOKEN) {
  console.warn('⚠️ PRINTFUL_API_TOKEN is not set. Store functionality will not work.');
}

// Type definitions
export interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    hash: string;
    url: string;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
  }>;
}

export interface PrintfulProductWithVariants extends PrintfulProduct {
  sync_variants: PrintfulVariant[];
}

export interface PrintfulOrder {
  external_id: string;
  shipping: string;
  recipient: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
    phone?: string;
    email: string;
  };
  items: Array<{
    sync_variant_id?: number;
    external_variant_id?: string;
    quantity: number;
    retail_price?: string;
  }>;
  retail_costs?: {
    currency: string;
    subtotal: string;
    discount?: string;
    shipping: string;
    tax: string;
  };
}

export interface PrintfulOrderResponse {
  id: number;
  external_id: string;
  status: string;
  shipping: string;
  created: number;
  updated: number;
  recipient: any;
  items: any[];
  costs: any;
  retail_costs: any;
  shipments: any[];
}

/**
 * Make a request to the Printful API
 */
async function printfulRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${PRINTFUL_API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${PRINTFUL_API_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Printful API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Get all sync products from your Printful store
 */
export async function getStoreProducts(): Promise<PrintfulProduct[]> {
  try {
    const response = await printfulRequest('/store/products');
    return response.result || [];
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    throw error;
  }
}

/**
 * Get a specific product with all its variants
 */
export async function getProductWithVariants(productId: string | number): Promise<PrintfulProductWithVariants> {
  try {
    const response = await printfulRequest(`/store/products/${productId}`);
    return response.result;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
}

/**
 * Get all products with their variants (for store display)
 */
export async function getAllProductsWithVariants(): Promise<PrintfulProductWithVariants[]> {
  try {
    const products = await getStoreProducts();

    // Fetch variants for each product in parallel
    const productsWithVariants = await Promise.all(
      products.map(product => getProductWithVariants(product.id))
    );

    return productsWithVariants;
  } catch (error) {
    console.error('Error fetching all products with variants:', error);
    throw error;
  }
}

/**
 * Create an order in Printful
 * This is called after successful payment via Stripe
 */
export async function createOrder(orderData: PrintfulOrder): Promise<PrintfulOrderResponse> {
  try {
    const response = await printfulRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });

    return response.result;
  } catch (error) {
    console.error('Error creating Printful order:', error);
    throw error;
  }
}

/**
 * Get order details by ID
 */
export async function getOrder(orderId: string | number): Promise<PrintfulOrderResponse> {
  try {
    const response = await printfulRequest(`/orders/${orderId}`);
    return response.result;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
}

/**
 * Get order details by external ID (e.g., Stripe session ID)
 */
export async function getOrderByExternalId(externalId: string): Promise<PrintfulOrderResponse | null> {
  try {
    const response = await printfulRequest(`/orders/@${externalId}`);
    return response.result;
  } catch (error) {
    console.error(`Error fetching order by external ID ${externalId}:`, error);
    return null;
  }
}

/**
 * Calculate shipping rates for items
 */
export async function calculateShipping(
  recipient: PrintfulOrder['recipient'],
  items: PrintfulOrder['items']
) {
  try {
    const response = await printfulRequest('/shipping/rates', {
      method: 'POST',
      body: JSON.stringify({ recipient, items }),
    });

    return response.result;
  } catch (error) {
    console.error('Error calculating shipping:', error);
    throw error;
  }
}

/**
 * Estimate order costs (for displaying shipping + taxes before checkout)
 */
export async function estimateOrderCosts(orderData: Partial<PrintfulOrder>) {
  try {
    const response = await printfulRequest('/orders/estimate-costs', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });

    return response.result;
  } catch (error) {
    console.error('Error estimating order costs:', error);
    throw error;
  }
}
