# Machine King Labs - Internal Team Portal

**Created:** October 19, 2025
**Status:** Design Proposal
**Priority:** High

---

## 🎯 Purpose

Provide internal team members (Robert, Abakar, Kenil) with a centralized hub for:
- Quick access to all projects and tools
- Internal documentation and resources
- Team communication and updates
- Project status tracking
- Development environment links

---

## 🏗️ Architecture Options

### **Option 1: Simple Password-Protected Page** (RECOMMENDED - Fastest)
**Pros:**
- ✅ Fastest to implement (1-2 hours)
- ✅ No database required
- ✅ Minimal security surface area
- ✅ Easy to maintain

**Cons:**
- ❌ Single shared password (not individual accounts)
- ❌ No user tracking or analytics
- ❌ Limited to read-only content

**Implementation:**
- Route: `/portal` (password-protected)
- Password stored in environment variable
- Simple middleware check before rendering
- Static page with links and resources

**Security:**
- Password stored in `.env` file (not committed)
- Basic HTTP authentication or session-based
- HTTPS required (use Netlify/Vercel)

---

### **Option 2: Supabase Authentication** (Recommended for Growth)
**Pros:**
- ✅ Individual user accounts
- ✅ Already using Supabase for Hey You're Hired
- ✅ Role-based access control
- ✅ Audit logging built-in
- ✅ Easy to add team members later

**Cons:**
- ❌ Takes 4-6 hours to implement
- ❌ More complex than needed for 3 users
- ❌ Requires database setup

**Implementation:**
- Supabase Auth with email/password
- 3 accounts: robert@, abakar@, kenil@
- Protected routes using Supabase session
- Can expand to OAuth later

---

### **Option 3: Add to Navigation as Hidden Route** (Quick & Dirty)
**Pros:**
- ✅ Fastest (30 minutes)
- ✅ No authentication needed
- ✅ Purely internal URL

**Cons:**
- ❌ No security whatsoever
- ❌ Anyone with URL can access
- ❌ Not suitable for sensitive data

**Implementation:**
- Route: `/team-portal` (unlisted, not in navigation)
- Anyone with link can access
- No sensitive credentials or data

---

## 📋 Recommended Approach

**Phase 1: Simple Password Protection (Launch Today)**
- Implement `/portal` route with basic password
- Static page with links and resources
- No database, no complexity

**Phase 2: Supabase Auth (Add Later if Needed)**
- Upgrade to individual accounts when team grows
- Add role-based permissions
- Enable audit logging

---

## 🎨 Portal Design (Enterprise Minimal)

### **Page Structure**

```
/portal
├── Hero Section (Welcome back, Team)
├── Quick Actions (Most-used tools)
├── Project Links (All 4 projects)
├── Internal Tools (Presidium, etc.)
├── Resources (Docs, Design System)
└── Status Updates (Recent changes)
```

### **Layout Mockup**

```astro
---
// src/pages/portal.astro
import Layout from '../layouts/Layout.astro';

// Simple password check (Phase 1)
const password = Astro.url.searchParams.get('p');
if (password !== import.meta.env.PORTAL_PASSWORD) {
  // Show password prompt
}
---

<Layout title="Team Portal | Machine King Labs">
  <!-- Hero -->
  <section class="py-20 bg-gradient-to-br from-zinc-950 via-neutral-950 to-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-5xl font-bold mb-4">
        <span class="gradient-text">Welcome back, Team</span>
      </h1>
      <p class="text-xl text-zinc-400">
        Quick access to all projects, tools, and resources
      </p>
    </div>
  </section>

  <!-- Quick Actions -->
  <section class="py-12 bg-zinc-950 border-t border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-6 text-white">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Most-used links -->
      </div>
    </div>
  </section>

  <!-- Project Links -->
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-6 text-white">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Project cards with admin links -->
      </div>
    </div>
  </section>

  <!-- Internal Tools -->
  <section class="py-12 bg-zinc-950 border-t border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-6 text-white">Internal Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Presidium, Analytics, etc. -->
      </div>
    </div>
  </section>

  <!-- Resources -->
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-6 text-white">Resources</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Design system, docs, etc. -->
      </div>
    </div>
  </section>
</Layout>
```

---

## 🔗 Portal Content (What to Include)

### **Quick Actions Section**
```
┌─────────────────────────────────────────┐
│  🚀 Hey You're Hired Dashboard          │
│  👑 Presidium Email Interface           │
│  📊 Google Analytics (All Projects)     │
│  💬 Team Slack/Discord                  │
└─────────────────────────────────────────┘
```

### **Project Links Section**

**Hey You're Hired**
- Production: https://heyyourehired.com
- Admin Dashboard: https://heyyourehired.com/admin
- Supabase Console: [link]
- Vercel Dashboard: [link]
- Analytics: [link]

**TalkAdvantage Pro**
- Demo: [link]
- AWS Console: [link]
- Meeting Bot Dashboard: [link]

**Algorithm Institute**
- YouTube Studio: https://studio.youtube.com/channel/[ID]
- Analytics: [link]

**The Presidium**
- Email Interface: [link]
- Officer Configuration: [link]
- Usage Logs: [link]

### **Internal Tools Section**

- **Design System** → /DESIGN-SYSTEM.md
- **Site Audit** → /SITE-AUDIT.md
- **GitHub Repos** → Links to all repos
- **Upwork Dashboard** → Team contracts
- **Meeting Notes** → Shared doc link

### **Resources Section**

- Machine King Labs Brand Assets
- Logo Pack (transparent, white, variations)
- Octopus Video Assets
- Team Photos (all ratios)
- Documentation Library

---

## 🔐 Security Considerations

### **Phase 1: Password Protection**

**Environment Variable:**
```bash
# .env (DO NOT COMMIT)
PORTAL_PASSWORD=machine-king-2025-secure
```

**Middleware Check:**
```typescript
// src/middleware/portal.ts
export function onRequest({ url, redirect }) {
  if (url.pathname === '/portal') {
    const password = url.searchParams.get('p');
    if (password !== import.meta.env.PORTAL_PASSWORD) {
      return new Response('Unauthorized', { status: 401 });
    }
  }
}
```

**Access URL:**
```
https://machinekinglabs.com/portal?p=machine-king-2025-secure
```

**Benefits:**
- ✅ No login form needed
- ✅ Bookmark URL with password
- ✅ Works on all devices instantly
- ✅ No session management

**Limitations:**
- ❌ Password visible in browser history
- ❌ Anyone with link can access
- ⚠️ Use session storage for better security

---

### **Phase 2: Supabase Auth** (Future)

**Setup:**
```typescript
// Create 3 user accounts in Supabase
// robert@machinekinglabs.com
// abakar@[email]
// kenil@[email]

// Add RLS policies
CREATE POLICY "Only team members can access portal"
ON portal_content
FOR SELECT
USING (auth.email() IN (
  'robert@machinekinglabs.com',
  '[abakar-email]',
  '[kenil-email]'
));
```

---

## 📱 Mobile Access

**Requirements:**
- Must work on mobile devices
- Quick access to most-used tools
- Bookmarkable URL
- Responsive grid (1 column on mobile)

**Mobile-First Design:**
```css
/* Quick Actions: 1 column on mobile, 4 on desktop */
grid-cols-1 md:grid-cols-4

/* Project Links: 1 column on mobile, 2 on desktop */
grid-cols-1 md:grid-cols-2

/* Resources: 1 column on mobile, 3 on desktop */
grid-cols-1 md:grid-cols-3
```

---

## 🚀 Implementation Plan

### **Phase 1: MVP (2 hours)**

**Step 1: Create Password-Protected Route** (30 min)
- Create `src/pages/portal.astro`
- Add password check via URL param
- Show "Unauthorized" if wrong password

**Step 2: Build Portal Layout** (60 min)
- Hero section: "Welcome back, Team"
- Quick Actions grid (4 columns)
- Project Links section (2 columns)
- Internal Tools section (3 columns)
- Resources section (3 columns)

**Step 3: Add Content & Links** (30 min)
- Populate all external links (Hey You're Hired, YouTube, etc.)
- Add placeholders for admin dashboards (to be filled in)
- Link to DESIGN-SYSTEM.md and SITE-AUDIT.md

**Step 4: Test & Deploy** (15 min)
- Test password protection
- Verify all links work
- Deploy to production

---

### **Phase 2: Enhanced Features** (Future)

1. **Add to Navigation** (Optional)
   - Show "Portal" link only when authenticated
   - Or keep completely hidden (unlisted route)

2. **Upgrade to Supabase Auth** (4-6 hours)
   - Individual accounts for each team member
   - Login/logout flow
   - Session management
   - Audit logging

3. **Dynamic Content** (Future)
   - Recent git commits
   - Project deployment status
   - Analytics summary widgets
   - Team activity feed

4. **Admin Panel** (Future)
   - Manage portal links
   - Add/remove team members
   - Configure Quick Actions

---

## 🎯 Questions for User

1. **Authentication Preference:**
   - Option A: Simple password (fastest, shared password)
   - Option B: Individual accounts (Supabase, slower)
   - Option C: No auth, just unlisted URL

2. **Navigation Visibility:**
   - Should "Portal" appear in main navigation?
   - Or keep it completely unlisted (hidden)?

3. **Priority Links:**
   - Which 4 tools are most-used? (for Quick Actions)
   - What admin dashboards need to be linked?

4. **Existing Dashboards:**
   - Hey You're Hired admin URL?
   - AWS console links for TalkAdvantage?
   - Analytics dashboards?
   - Team communication (Slack/Discord)?

5. **Timeline:**
   - Launch portal today with Phase 1?
   - Or wait for Phase 2 with individual accounts?

---

## 📝 Recommended Immediate Action

**LAUNCH PHASE 1 TODAY:**

1. Create `/portal` route with password protection
2. Build clean enterprise design matching rest of site
3. Add all known links (Hey You're Hired, YouTube, GitHub, docs)
4. Add placeholders for admin links (fill in later)
5. Deploy to production
6. Share password with Abakar and Kenil

**Time Estimate:** 2 hours
**Result:** Functional team portal accessible today

**Future Enhancements:**
- Upgrade to Supabase Auth when team grows
- Add dynamic content and widgets
- Integrate with project APIs for live status

---

**End of Design Proposal**

*Waiting for user input on authentication preference and priority links.*
