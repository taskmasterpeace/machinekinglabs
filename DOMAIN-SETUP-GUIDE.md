# Domain Configuration Guide for Machine King Labs

**Last Updated:** October 19, 2025
**Primary Domain:** machinekinglabs.com
**DNS Provider:** GoDaddy

---

## Overview

This guide covers the complete domain configuration for Machine King Labs infrastructure, including:
- Main website (Vercel)
- Supabase custom domains (API endpoints)
- Subdomain strategy for multiple projects
- SSL/TLS certificate setup

---

## Table of Contents

1. [GoDaddy DNS Configuration](#1-godaddy-dns-configuration)
2. [Vercel Domain Setup](#2-vercel-domain-setup)
3. [Supabase Custom Domain](#3-supabase-custom-domain)
4. [Subdomain Strategy](#4-subdomain-strategy)
5. [SSL/TLS Certificates](#5-ssltls-certificates)
6. [DNS Records Reference](#6-dns-records-reference)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. GoDaddy DNS Configuration

### Step 1: Access GoDaddy DNS Management

1. Log in to [GoDaddy.com](https://www.godaddy.com/)
2. Navigate to **My Products** → **Domains**
3. Click the three dots (**⋯**) next to `machinekinglabs.com`
4. Select **Manage DNS**

### Step 2: Configure Root Domain for Vercel

**Add A Records:**

| Type | Name | Value             | TTL  |
|------|------|-------------------|------|
| A    | @    | 76.76.21.21       | 600  |

**Add CNAME Record for www:**

| Type  | Name | Value               | TTL  |
|-------|------|---------------------|------|
| CNAME | www  | cname.vercel-dns.com | 3600 |

> **Note:** Vercel's IP address may change. Always check [Vercel's documentation](https://vercel.com/docs/projects/domains/add-a-domain) for the latest DNS values.

### Step 3: Add CNAME Records for Subdomains

| Type  | Name   | Value                  | TTL  | Purpose              |
|-------|--------|------------------------|------|----------------------|
| CNAME | portal | cname.vercel-dns.com   | 3600 | Team Portal          |
| CNAME | api    | [Supabase CNAME value] | 3600 | Supabase API         |
| CNAME | app    | cname.vercel-dns.com   | 3600 | Web Applications     |

### Step 4: Verify DNS Propagation

Use these tools to verify DNS changes:
```bash
# Command line (Windows PowerShell)
nslookup machinekinglabs.com
nslookup www.machinekinglabs.com

# Command line (Mac/Linux)
dig machinekinglabs.com
dig www.machinekinglabs.com

# Online tool
# Visit: https://dnschecker.org/
```

DNS propagation typically takes:
- **5-15 minutes** for most changes
- **Up to 48 hours** for global propagation (rare)

---

## 2. Vercel Domain Setup

### Step 1: Access Vercel Project

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your Machine King Labs project
3. Go to **Settings** → **Domains**

### Step 2: Add Domain

1. Click **Add Domain**
2. Enter `machinekinglabs.com`
3. Click **Add**

Vercel will provide DNS configuration instructions. Follow them exactly.

### Step 3: Add www Subdomain

1. Click **Add Domain** again
2. Enter `www.machinekinglabs.com`
3. Click **Add**
4. Choose **Redirect to machinekinglabs.com** (recommended)

### Step 4: Verify Domain

Vercel will automatically verify your domain once DNS is configured. This usually takes 1-5 minutes.

**Expected Result:**
```
✓ machinekinglabs.com - Valid Configuration
✓ www.machinekinglabs.com - Redirects to root domain
```

### Step 5: Enable Automatic HTTPS

Vercel automatically provisions SSL certificates via Let's Encrypt. No action required.

**Verify HTTPS:**
- Visit `https://machinekinglabs.com`
- Look for the lock icon 🔒 in browser address bar

---

## 3. Supabase Custom Domain

### Step 1: Access Supabase Project Settings

1. Log in to [Supabase Dashboard](https://app.supabase.com/)
2. Select your **Hey You're Hired** project (or relevant project)
3. Navigate to **Project Settings** → **API**

### Step 2: Configure Custom Domain

1. Scroll to **Custom Domains** section
2. Click **Add custom domain**
3. Enter `api.machinekinglabs.com`
4. Click **Verify Domain**

Supabase will provide a CNAME record value like:
```
CNAME: api → xxx-yyy-zzz.supabase.co
```

### Step 3: Add CNAME to GoDaddy

Go back to GoDaddy DNS Management and add:

| Type  | Name | Value                        | TTL  |
|-------|------|------------------------------|------|
| CNAME | api  | xxx-yyy-zzz.supabase.co      | 3600 |

Replace `xxx-yyy-zzz.supabase.co` with the exact value Supabase provides.

### Step 4: Verify in Supabase

Return to Supabase and click **Verify DNS Configuration**. This may take 5-10 minutes.

**Expected Result:**
```
✓ api.machinekinglabs.com - Verified
SSL Certificate: Provisioning (automatic)
```

### Step 5: Update API Endpoints

Once verified, update your application code to use the custom domain:

**Before:**
```typescript
const supabaseUrl = 'https://xxxyyyzz.supabase.co'
```

**After:**
```typescript
const supabaseUrl = 'https://api.machinekinglabs.com'
```

---

## 4. Subdomain Strategy

### Recommended Subdomain Structure

| Subdomain            | Purpose                          | Hosted On | Status      |
|----------------------|----------------------------------|-----------|-------------|
| machinekinglabs.com  | Main marketing site              | Vercel    | Production  |
| www.machinekinglabs.com | Redirects to root             | Vercel    | Production  |
| portal.machinekinglabs.com | Team portal (internal)     | Vercel    | Planned     |
| api.machinekinglabs.com | Supabase API endpoints        | Supabase  | Planned     |
| app.heyyourehired.com | Hey You're Hired web app        | Vercel    | Production  |
| staging.machinekinglabs.com | Staging environment       | Vercel    | Planned     |
| docs.machinekinglabs.com | Documentation site           | Vercel    | Future      |

### Adding New Subdomains

**For Vercel-hosted subdomains:**
1. Add CNAME record in GoDaddy: `subdomain → cname.vercel-dns.com`
2. Add domain in Vercel project settings
3. Wait for DNS propagation (5-15 min)
4. Verify HTTPS is enabled

**For Supabase subdomains:**
1. Configure custom domain in Supabase project
2. Add CNAME record in GoDaddy with Supabase's value
3. Verify in Supabase dashboard
4. Update application code with new endpoint

---

## 5. SSL/TLS Certificates

### Automatic Certificate Management

Both Vercel and Supabase handle SSL certificates automatically via **Let's Encrypt**.

**Certificate Details:**
- **Issuer:** Let's Encrypt
- **Validity:** 90 days (auto-renewed)
- **Type:** Domain Validated (DV)
- **Encryption:** TLS 1.3 (modern browsers)

### Force HTTPS Redirects

**Vercel (automatic):**
- All HTTP traffic automatically redirects to HTTPS
- No configuration needed

**Custom redirects (if needed):**
```javascript
// vercel.json
{
  "redirects": [
    {
      "source": "http://machinekinglabs.com/:path*",
      "destination": "https://machinekinglabs.com/:path*",
      "permanent": true
    }
  ]
}
```

### Verify SSL Configuration

Use these tools to check SSL health:
- [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/)
- Expected grade: **A or A+**

---

## 6. DNS Records Reference

### Complete DNS Configuration

```
; machinekinglabs.com DNS Zone File

; Root domain (Vercel)
@       IN  A       76.76.21.21                     ; TTL: 600

; WWW subdomain (Vercel)
www     IN  CNAME   cname.vercel-dns.com.           ; TTL: 3600

; Portal subdomain (Vercel) - Planned
portal  IN  CNAME   cname.vercel-dns.com.           ; TTL: 3600

; API subdomain (Supabase) - Planned
api     IN  CNAME   xxx-yyy-zzz.supabase.co.        ; TTL: 3600

; Email records (if using G Suite / Google Workspace)
@       IN  MX  1   aspmx.l.google.com.             ; TTL: 3600
@       IN  MX  5   alt1.aspmx.l.google.com.        ; TTL: 3600
@       IN  MX  5   alt2.aspmx.l.google.com.        ; TTL: 3600

; SPF record (email authentication)
@       IN  TXT     "v=spf1 include:_spf.google.com ~all"

; DKIM record (if using Google Workspace)
google._domainkey IN TXT "v=DKIM1; k=rsa; p=[YOUR_PUBLIC_KEY]"
```

### DNS Record Types Explained

| Type  | Purpose                                    | Example                        |
|-------|--------------------------------------------|--------------------------------|
| A     | Points domain to IPv4 address              | @ → 76.76.21.21               |
| AAAA  | Points domain to IPv6 address              | @ → 2606:4700::1              |
| CNAME | Creates alias to another domain            | www → cname.vercel-dns.com    |
| MX    | Mail exchange (email routing)              | @ → aspmx.l.google.com        |
| TXT   | Text records (SPF, DKIM, verification)     | @ → "v=spf1..."               |

---

## 7. Troubleshooting

### Issue: Domain not resolving

**Symptoms:**
- "This site can't be reached" error
- DNS_PROBE_FINISHED_NXDOMAIN error

**Solutions:**
1. Verify DNS records in GoDaddy match configuration exactly
2. Wait 15-30 minutes for propagation
3. Clear DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns

   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

   # Linux
   sudo systemd-resolve --flush-caches
   ```
4. Check DNS propagation at https://dnschecker.org/

### Issue: SSL certificate not provisioning

**Symptoms:**
- "Not secure" warning in browser
- SSL certificate errors

**Solutions:**
1. Wait 10-15 minutes after adding domain
2. Verify DNS is correctly configured
3. In Vercel: **Settings** → **Domains** → Click **Refresh** next to domain
4. Check Vercel deployment logs for errors

### Issue: Supabase custom domain not verifying

**Symptoms:**
- Supabase shows "DNS verification failed"
- API requests fail with SSL errors

**Solutions:**
1. Double-check CNAME record in GoDaddy exactly matches Supabase value
2. Remove any conflicting DNS records (A, AAAA on same subdomain)
3. Wait up to 30 minutes for propagation
4. Contact Supabase support if issue persists after 1 hour

### Issue: Subdomain showing wrong content

**Symptoms:**
- Subdomain loads but shows incorrect project
- 404 errors on subdomain

**Solutions:**
1. Verify domain is added to correct Vercel project
2. Check Vercel project settings → Domains list
3. Ensure branch is deployed (usually `main` or `production`)
4. Redeploy project: **Deployments** → **⋯** → **Redeploy**

---

## Quick Start Checklist

Use this checklist for setting up a new domain or subdomain:

### Main Domain Setup
- [ ] Purchase domain at GoDaddy (if not already owned)
- [ ] Access GoDaddy DNS Management
- [ ] Add A record: `@ → 76.76.21.21`
- [ ] Add CNAME record: `www → cname.vercel-dns.com`
- [ ] Add domain in Vercel project settings
- [ ] Wait for DNS propagation (15-30 min)
- [ ] Verify HTTPS is working
- [ ] Test domain in multiple browsers
- [ ] Update social media links
- [ ] Update email signatures

### Subdomain Setup (Vercel)
- [ ] Add CNAME in GoDaddy: `subdomain → cname.vercel-dns.com`
- [ ] Add domain in Vercel project
- [ ] Wait for DNS propagation (15-30 min)
- [ ] Verify HTTPS certificate
- [ ] Test subdomain functionality
- [ ] Update internal documentation

### Subdomain Setup (Supabase)
- [ ] Configure custom domain in Supabase
- [ ] Copy CNAME value from Supabase
- [ ] Add CNAME in GoDaddy with Supabase value
- [ ] Click "Verify" in Supabase dashboard
- [ ] Wait for SSL certificate provisioning (5-10 min)
- [ ] Update application code with new API endpoint
- [ ] Test API calls with custom domain
- [ ] Update environment variables in Vercel

---

## Support Resources

### Vercel Documentation
- [Custom Domains](https://vercel.com/docs/projects/domains/add-a-domain)
- [DNS Records](https://vercel.com/docs/projects/domains/dns-records)
- [Troubleshooting Domains](https://vercel.com/docs/projects/domains/troubleshooting)

### Supabase Documentation
- [Custom Domains](https://supabase.com/docs/guides/platform/custom-domains)
- [API Reference](https://supabase.com/docs/reference)

### GoDaddy Support
- [Manage DNS](https://www.godaddy.com/help/manage-dns-records-680)
- [DNS Propagation](https://www.godaddy.com/help/what-is-dns-propagation-and-how-long-does-it-take-19915)

### DNS Tools
- **DNS Checker:** https://dnschecker.org/
- **SSL Labs:** https://www.ssllabs.com/ssltest/
- **What's My DNS:** https://whatsmydns.net/

---

## Contact

For questions or issues with domain configuration, contact:

**Robert L. Smith III**
Founder & CEO, Machine King Labs
📧 robert@machinekinglabs.com
🌐 machinekinglabs.com

---

**Document Version:** 1.0
**Last Reviewed:** October 19, 2025
**Next Review:** January 19, 2026
