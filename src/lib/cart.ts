/**
 * Shopping Cart Management (Client-Side)
 * Uses localStorage for persistence
 */

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

const CART_STORAGE_KEY = 'machine-king-labs-cart';

/**
 * Get cart from localStorage
 */
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event so cart components can update
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Add item to cart
 */
export function addToCart(item: CartItem): void {
  const cart = getCart();

  // Check if item already exists in cart (same variant and options)
  const existingItemIndex = cart.findIndex(
    (cartItem) =>
      cartItem.variantId === item.variantId &&
      cartItem.size === item.size &&
      cartItem.color === item.color
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item to cart
    cart.push(item);
  }

  saveCart(cart);
}

/**
 * Remove item from cart by index
 */
export function removeFromCart(index: number): void {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

/**
 * Remove item from cart by variant ID and options
 */
export function removeItemByVariant(
  variantId: number,
  size?: string,
  color?: string
): void {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) =>
      !(
        item.variantId === variantId &&
        item.size === size &&
        item.color === color
      )
  );
  saveCart(updatedCart);
}

/**
 * Update item quantity in cart
 */
export function updateQuantity(index: number, quantity: number): void {
  if (quantity < 1) {
    removeFromCart(index);
    return;
  }

  const cart = getCart();
  if (cart[index]) {
    cart[index].quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Get cart item count (total number of items)
 */
export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart subtotal (sum of all item prices)
 */
export function getCartSubtotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Format price as USD
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Check if cart has items
 */
export function hasItems(): boolean {
  return getCart().length > 0;
}

/**
 * Get specific cart item by index
 */
export function getCartItem(index: number): CartItem | undefined {
  const cart = getCart();
  return cart[index];
}

/**
 * Find cart item by variant and options
 */
export function findCartItem(
  variantId: number,
  size?: string,
  color?: string
): { item: CartItem; index: number } | null {
  const cart = getCart();
  const index = cart.findIndex(
    (item) =>
      item.variantId === variantId &&
      item.size === size &&
      item.color === color
  );

  if (index >= 0) {
    return { item: cart[index], index };
  }

  return null;
}

/**
 * Listen to cart updates
 */
export function onCartUpdate(callback: (cart: CartItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<CartItem[]>;
    callback(customEvent.detail);
  };

  window.addEventListener('cart-updated', handler);

  // Return cleanup function
  return () => {
    window.removeEventListener('cart-updated', handler);
  };
}
