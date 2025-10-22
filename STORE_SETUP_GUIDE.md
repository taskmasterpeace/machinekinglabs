# Machine King Labs Store - Setup Guide

## 🎉 Implementation Complete!

Your custom Printful store is now integrated into your website! This guide will help you configure API keys and set up products.

---

## 📋 Quick Setup Checklist

- [ ] Create Printful account
- [ ] Get Printful API token
- [ ] Get Stripe API keys (test + production)
- [ ] Add products to Printful
- [ ] Configure environment variables
- [ ] Test in development
- [ ] Deploy to production
- [ ] Configure webhooks

---

## 🔧 Step 1: Printful Account Setup

### 1.1 Create Printful Account
1. Go to https://www.printful.com
2. Sign up for a free account (no monthly fees!)
3. Complete your profile

### 1.2 Get API Token
1. Log into Printful dashboard
2. Navigate to **Settings** → **API**
3. Click **Generate New API Token**
4. Name it: "Machine King Labs Website"
5. Copy the token (starts with `pk_...`)

### 1.3 Enable White-Label Branding
1. Go to **Settings** → **Branding**
2. Upload Machine King Labs logo
3. Enable:
   - Custom packing slip
   - Custom sender name: "Machine King Labs"
   - Custom return address (your business address)
4. Save changes

---

## 🎨 Step 2: Create Products in Printful

### 2.1 Choose Products
Recommended initial lineup:
- **T-Shirts**: Unisex Staple T-Shirt (Bella+Canvas 3001)
- **Hoodies**: Unisex Heavy Blend Hoodie (Gildan 18500)
- **Hats**: Classic Dad Hat or Trucker Hat (embroidered)

### 2.2 Upload Designs
1. In Printful dashboard, click **Add Product**
2. Select product type (e.g., "T-Shirts")
3. Choose specific product (e.g., "Unisex Staple T-Shirt")
4. Click **Design**

**Design Requirements:**
- Format: PNG with transparent background
- Resolution: 300 DPI minimum
- Use your Machine King Labs logo from `/public/images/machine-king-labs-logo.png`

### 2.3 Set Pricing
Example pricing strategy:
- **T-Shirt**: Printful base ~$12-14 → **Sell for $28-34**
- **Hoodie**: Printful base ~$22-30 → **Sell for $48-65**
- **Hat**: Printful base ~$12-16 → **Sell for $28-38**

Account for:
- Printful base cost
- Stripe fees (2.9% + $0.30)
- Desired profit margin (50-70%)

### 2.4 Publish to Store
1. After designing, click **Proceed to Mockups**
2. Review mockup images
3. Click **Sync to Store** → Choose "API"
4. Product is now available via API!

---

## 💳 Step 3: Stripe Configuration

### 3.1 Get Stripe API Keys

**Test Keys (for development):**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

**Live Keys (for production):**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy:
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

---

## 🔐 Step 4: Configure Environment Variables

### 4.1 Development Configuration
Open `.env.development` and fill in your keys:

```env
# Printful Configuration
PRINTFUL_API_TOKEN=your_printful_api_token_here

# Stripe Configuration (TEST MODE)
STRIPE_SECRET_KEY=sk_test_your_test_secret_key
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_test_webhook_secret

# Environment
NODE_ENV=development
PUBLIC_SITE_URL=http://localhost:4321
```

### 4.2 Production Configuration
Open `.env.production` and fill in LIVE keys:

```env
# Printful Configuration
PRINTFUL_API_TOKEN=your_printful_api_token_here

# Stripe Configuration (LIVE MODE)
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_production_webhook_secret

# Environment
NODE_ENV=production
PUBLIC_SITE_URL=https://www.machinekinglabs.com
```

---

## 🧪 Step 5: Test in Development

### 5.1 Start Dev Server
```bash
npm run dev
```

### 5.2 Test Features
1. **View Store**: Navigate to `http://localhost:4321/store`
2. **Check Products**: Should see your Printful products loading
3. **Add to Cart**: Click "View Details" → Select options → "Add to Cart"
4. **View Cart**: Click cart icon (bottom right)
5. **Test Checkout**: Click "Proceed to Checkout"

### 5.3 Stripe Test Cards
Use these test cards in checkout:

**Success:**
```
Card: 4242 4242 4242 4242
Exp: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**Declined:**
```
Card: 4000 0000 0000 0002
```

### 5.4 Verify Order Flow
After successful test payment:
1. Check browser redirects to `/store/success`
2. Check console logs for Printful order creation
3. Check Printful dashboard for test order

---

## 🚀 Step 6: Production Deployment

### 6.1 Pre-Deployment Checklist
- [ ] Switch to LIVE Stripe keys in `.env.production`
- [ ] Verify Printful API token (same for dev/prod)
- [ ] Test with real payment (small amount)
- [ ] Verify order appears in Printful
- [ ] Enable production webhooks

### 6.2 Build and Deploy
```bash
npm run build
# Deploy using your hosting provider (Vercel, Netlify, etc.)
```

### 6.3 Post-Deployment
1. Visit `https://www.machinekinglabs.com/store`
2. Test complete purchase flow with real payment
3. Verify Printful receives order
4. Confirm customer emails are sent

---

## 🔗 Step 7: Configure Webhooks

### 7.1 Stripe Webhooks (IMPORTANT!)

**Development (using Stripe CLI):**
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:4321/api/webhooks/stripe
# Copy the webhook secret (whsec_...) to .env.development
```

**Production:**
1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add Endpoint**
3. Endpoint URL: `https://www.machinekinglabs.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the **Signing Secret** to `.env.production`

### 7.2 Printful Webhooks

1. Go to Printful dashboard → **Settings** → **API** → **Webhooks**
2. Click **Add Webhook**
3. URL: `https://www.machinekinglabs.com/api/webhooks/printful`
4. Select events:
   - `package_shipped`
   - `package_returned`
   - `order_failed`
   - `order_canceled`
5. Save

---

## 📊 Monitoring & Analytics

### Track Key Metrics
- Store page views
- Conversion rate (visits → purchases)
- Top-selling products
- Revenue (Stripe Dashboard)
- Order fulfillment time (Printful Dashboard)

### Error Monitoring
Check server logs for:
- Failed Printful API calls
- Failed Stripe payments
- Webhook processing errors

---

## 🛠 Troubleshooting

### Products not loading
- Check Printful API token in `.env`
- Verify products are "published" in Printful dashboard
- Check browser console for API errors
- Check server logs: `/api/store/products`

### Checkout not working
- Verify Stripe keys in `.env`
- Check cart has items
- Verify shipping address is entered
- Check browser console for errors

### Order not created in Printful
- Check webhook logs in server
- Verify Stripe webhook is configured
- Check Printful dashboard for failed orders
- Look for errors in `/api/webhooks/stripe` logs

---

## 🎯 Next Steps

1. **Create More Products**
   - Add seasonal designs
   - Offer limited editions
   - Create product bundles

2. **Marketing**
   - Announce store launch on social media
   - Email your subscribers
   - Add store banner to homepage

3. **Analytics**
   - Set up Google Analytics for /store pages
   - Track conversion funnel
   - A/B test product images and pricing

4. **Customer Experience**
   - Monitor first orders closely
   - Respond quickly to support emails
   - Collect feedback and reviews

---

## 📧 Support

**Questions or Issues?**
- Email: robertsmith@machinekinglabs.com
- Check Printful Help Center: https://help.printful.com
- Check Stripe Docs: https://stripe.com/docs

---

## 🎉 You're Ready to Launch!

Your store is fully implemented and ready for testing. Once you've:
1. Configured your API keys
2. Added products to Printful
3. Tested in development
4. Deployed to production
5. Set up webhooks

You'll be ready to start selling Machine King Labs apparel!

**Built with ❤️ by Claude Code**
