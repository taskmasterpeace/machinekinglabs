# Machine King Labs - Implementation Plan

**Created:** October 19, 2025
**Status:** Planning Phase
**Scope:** Team Pages, Portal UI, Mobile Enhancements, Icon Set

---

## 🎯 Strategic Overview

### **Goal:**
Transform the site into a premium, investor-ready platform that demonstrates:
- High-end technical execution
- Serious team with individual spotlights
- Internal infrastructure (portal = we're organized)
- Professional polish (icons, animations, mobile perfection)

### **Timeline:**
- **Phase 1:** Team Member Pages (4-6 hours)
- **Phase 2:** Portal UI Frontend (3-4 hours)
- **Phase 3:** Icon Set Replacement (2-3 hours)
- **Phase 4:** Mobile Menu Enhancements (1-2 hours)
- **Phase 5:** Polish & Deploy (1 hour)

**Total Estimated:** 11-16 hours

---

## 📋 Phase 1: Individual Team Member Pages

### **Concept:**
Each team member gets their own dedicated page with:
- **21x9 looping video background** (cinematic hero)
- Full biography and detailed achievements
- Project contributions showcase
- Tech stack expertise
- External links (LinkedIn, portfolio, GitHub)
- Professional stats and metrics

### **Route Structure:**
```
/team              → Team overview (existing)
/team/robert       → Robert L. Smith III
/team/abakar       → Abakar Ibrahim
/team/kenil        → Kenil Togadiya
```

### **Page Design Mockup:**

```astro
---
// Example: src/pages/team/robert.astro
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Robert L. Smith III | Machine King Labs">
  <!-- Hero with 21x9 Looping Video Background -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Video Background (21x9 ratio, object-cover for full screen) -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover opacity-20"
    >
      <source src="/videos/team/robert-21x9.mp4" type="video/mp4" />
    </video>

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 text-center">
      <h1 class="text-6xl md:text-7xl font-bold mb-4">
        <span class="gradient-text">Robert L. Smith III</span>
      </h1>
      <p class="text-2xl text-white font-semibold mb-2">Founder & CEO</p>
      <p class="text-xl text-zinc-400 mb-8">Taskophilus Tanner</p>
      <p class="text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
        "With AI anything is possible"
      </p>
    </div>
  </section>

  <!-- Biography Section -->
  <section class="py-20 bg-zinc-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold mb-8">
        <span class="gradient-text">About</span>
      </h2>
      <p class="text-lg text-zinc-300 leading-relaxed mb-6">
        Founder & CEO with a background in filmmaking, bringing cinematic storytelling
        and visual innovation to product development. Founded Machine King Labs with
        the vision that AI fundamentally transforms what's possible in technology.
      </p>
      <!-- More bio content -->
    </div>
  </section>

  <!-- Achievements Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold mb-12">
        <span class="gradient-text">Key Achievements</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Achievement cards with metrics -->
      </div>
    </div>
  </section>

  <!-- Projects Led Section -->
  <section class="py-20 bg-zinc-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold mb-12">
        <span class="gradient-text">Projects Led</span>
      </h2>
      <!-- Project cards -->
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-black border-t border-zinc-800">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold mb-6 text-white">Get in Touch</h2>
      <p class="text-xl text-zinc-400 mb-8">
        Connect on LinkedIn or schedule a consultation
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://linkedin.com/in/robert-smith" class="btn-primary">
          LinkedIn
        </a>
        <a href="/contact" class="btn-secondary">
          Schedule Meeting
        </a>
      </div>
    </div>
  </section>
</Layout>
```

### **Video Requirements:**
- **Format:** MP4 (H.264 codec)
- **Aspect Ratio:** 21:9 (2.33:1)
- **Resolution:** 1920x823px or 2560x1097px
- **File Size:** Under 5MB (compressed, 10-15 second loop)
- **Framerate:** 30fps or 60fps
- **Quality:** High enough to look good but compressed for fast loading

### **Why 21x9 Works:**
- ✅ Ultrawide cinematic feel (like movie theaters)
- ✅ Perfect for hero backgrounds (covers wide screens)
- ✅ Less vertical space = smaller file size than 16:9
- ✅ Looks premium and high-end
- ✅ Works great with `object-cover` for any screen size

### **Content for Each Page:**

**Robert L. Smith III** (`/team/robert`)
- Video: robert-21x9.mp4
- Bio: Founder story, filmmaking background, vision
- Achievements:
  - Founded Machine King Labs (Pre-seed)
  - Built Hey You're Hired to production
  - Filed provisional patent for meeting intelligence
  - Established 30K+ YouTube community (Algorithm Institute)
  - Developed 8-officer AI coordination system (Presidium)
- Projects Led: Hey You're Hired, The Presidium, Algorithm Institute
- Expertise: AI Product Strategy, Storytelling, Multi-Project Management

**Abakar Ibrahim** (`/team/abakar`)
- Video: abakar-21x9.mp4
- Bio: Lead developer story, Upwork success, enterprise experience
- Achievements:
  - Top Rated Plus on Upwork (100% success rate, 21 projects)
  - Built Hey You're Hired as solo developer (enterprise platform)
  - Scalable subscription system (Stripe + Supabase)
  - Real-time application tracking dashboard
  - Next.js 15 & modern stack expertise
- Projects Led: Hey You're Hired (technical lead)
- Tech Stack: React, Next.js, FastAPI, Supabase, Node.js

**Kenil Togadiya** (`/team/kenil`)
- Video: kenil-21x9.mp4
- Bio: Senior developer, cloud architect, MERN specialist
- Achievements:
  - AWS cloud architecture for TalkAdvantage Pro
  - Real-time meeting bot infrastructure
  - Voice-activated widget ecosystem
  - GraphQL API design & optimization
  - Scalable microservices architecture
- Projects Led: TalkAdvantage Pro (technical lead)
- Tech Stack: Next.js, Node.js, AWS, Azure, GraphQL

### **Implementation Steps:**

1. **Create Page Templates** (2 hours)
   - Create `src/pages/team/robert.astro`
   - Create `src/pages/team/abakar.astro`
   - Create `src/pages/team/kenil.astro`
   - Each with 21x9 video hero, bio, achievements, projects, CTA

2. **Add Video Backgrounds** (1 hour)
   - Wait for you to create looping videos from 21x9 images
   - Place in `/public/videos/team/`
   - Test autoplay, loop, muted on all browsers

3. **Link from Team Overview** (30 min)
   - Update `/team` page to link to individual pages
   - Add "View Full Profile" buttons on each card

4. **GSAP Animations** (1 hour)
   - Hero content fade-in
   - Scroll-triggered section reveals
   - Achievement card stagger animations

5. **Mobile Optimization** (1 hour)
   - Test video backgrounds on mobile (some browsers block autoplay)
   - Fallback to static images on mobile if needed
   - Ensure touch targets are adequate

---

## 📋 Phase 2: Team Portal UI (Frontend Only)

### **Concept:**
Professional internal dashboard that signals to investors:
- "We have infrastructure"
- "We're organized and serious"
- "We have internal tools and systems"

### **Route:** `/portal`

### **Design Strategy:**

**Investor-Friendly Approach:**
- Keep it visible but password-protected
- Shows you have internal systems
- Demonstrates team coordination
- Signals operational maturity

**NOT visible in main navigation** (too casual)
**INSTEAD:** Add to footer as "Team Portal" link

### **Page Structure:**

```astro
---
// src/pages/portal.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="Team Portal | Machine King Labs">
  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-zinc-950 via-neutral-950 to-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-5xl md:text-6xl font-bold mb-6">
        <span class="gradient-text">Team Portal</span>
      </h1>
      <p class="text-xl text-zinc-300 max-w-3xl">
        Centralized access to projects, tools, and resources
      </p>
    </div>
  </section>

  <!-- Quick Actions -->
  <section class="py-12 bg-zinc-950 border-t border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-8 text-white">Quick Access</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Quick action cards -->
        <a href="https://heyyourehired.com/admin" class="portal-card">
          <div class="text-4xl mb-3">🚀</div>
          <h3 class="font-semibold text-white mb-1">Hey You're Hired</h3>
          <p class="text-sm text-zinc-400">Admin Dashboard</p>
        </a>

        <a href="mailto:presidium@machinekinglabs.com" class="portal-card">
          <div class="text-4xl mb-3">👑</div>
          <h3 class="font-semibold text-white mb-1">The Presidium</h3>
          <p class="text-sm text-zinc-400">Email Interface</p>
        </a>

        <a href="https://directorpal.com" class="portal-card">
          <div class="text-4xl mb-3">🎬</div>
          <h3 class="font-semibold text-white mb-1">Director's Pal</h3>
          <p class="text-sm text-zinc-400">Production Dashboard</p>
        </a>

        <a href="https://studio.youtube.com" class="portal-card">
          <div class="text-4xl mb-3">📺</div>
          <h3 class="font-semibold text-white mb-1">Algorithm Institute</h3>
          <p class="text-sm text-zinc-400">YouTube Studio</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Project Dashboards -->
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-8 text-white">Project Dashboards</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Project dashboard cards with admin links -->
      </div>
    </div>
  </section>

  <!-- Internal Resources -->
  <section class="py-12 bg-zinc-950 border-t border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-8 text-white">Resources</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/DESIGN-SYSTEM.md" class="resource-card">
          Design System
        </a>
        <a href="/SITE-AUDIT.md" class="resource-card">
          Site Audit
        </a>
        <!-- More resource links -->
      </div>
    </div>
  </section>
</Layout>

<style>
  .portal-card {
    @apply bg-zinc-950 rounded-sm p-6 border border-zinc-800 hover:border-zinc-600 transition-all hover:transform hover:-translate-y-1;
    display: block;
    text-align: center;
  }

  .resource-card {
    @apply bg-zinc-900 rounded-sm p-4 border border-zinc-800 hover:border-zinc-600 transition-all text-white font-medium text-sm;
    display: block;
  }
</style>
```

### **Where to Add Portal Link:**

**Footer Update** (subtle, professional):
```astro
<!-- Add to footer in Layout.astro -->
<div>
  <h3 class="font-bold text-sm mb-4 uppercase tracking-wider text-white">Team</h3>
  <ul class="space-y-2 text-zinc-500 text-sm">
    <li><a href="/team" class="hover:text-zinc-300 transition-colors">Meet the Team</a></li>
    <li><a href="/portal" class="hover:text-zinc-300 transition-colors">Team Portal</a></li>
  </ul>
</div>
```

**Why Footer, Not Navigation:**
- ✅ Signals internal infrastructure without being too casual
- ✅ Accessible but not prominent (intentional)
- ✅ Investors who explore will find it = "they have systems"
- ✅ Not distracting from main CTAs (Portfolio, Contact)

### **Authentication (Phase 2 - Later):**
For now: Just build the UI
Later: Add Supabase Auth with individual accounts

---

## 📋 Phase 3: Icon Set Replacement

### **Current Emojis to Replace:**

**Innovation Lab Page:**
- 👑 Crown (Presidium)
- 📞 Phone (Meeting Optimizer)
- ⚡ Lightning (Parallel Pipelines)
- 🎤 Microphone (Voice Widgets)
- 🧠 Brain (Strategic Coordinator)
- 🔍 Magnifying Glass (Competitive Intelligence)
- 📊 Chart (Financial Strategy)
- 💾 Floppy Disk (Memory & Knowledge)
- ✍️ Writing (Content Creation)
- 👥 People (Behavioral Intelligence)
- 🔎 SEO (SEO & Acquisition)

**Team Page (Our Values):**
- 🚀 Rocket (Ship Fast)
- 🔧 Wrench (Build Real Shit)
- 🌍 Globe (Remote First)

**Contact Page:**
- ✉️ Envelope (Email)
- 📅 Calendar (Schedule Meeting)
- 📍 Pin (Location)

**Portal Page (if using emojis):**
- 🚀 Rocket (Hey You're Hired)
- 👑 Crown (Presidium)
- 🎬 Clapper (Director's Pal)
- 📺 TV (Algorithm Institute)

### **Recommended Icon Library:**

**Heroicons** (Recommended)
- Clean, modern, minimal
- Matches enterprise aesthetic
- Easy to use in Astro
- Free and MIT licensed

**Installation:**
```bash
npm install @heroicons/react
```

**Usage Example:**
```astro
---
// Import specific icons
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
---

<RocketLaunchIcon class="w-12 h-12 text-zinc-400" />
```

### **Icon Mapping:**

| Current Emoji | Heroicon Replacement |
|--------------|---------------------|
| 👑 Crown | `SparklesIcon` or `StarIcon` |
| 📞 Phone | `PhoneIcon` |
| ⚡ Lightning | `BoltIcon` |
| 🎤 Microphone | `MicrophoneIcon` |
| 🧠 Brain | `LightBulbIcon` or `CpuChipIcon` |
| 🔍 Search | `MagnifyingGlassIcon` |
| 📊 Chart | `ChartBarIcon` |
| 💾 Storage | `CircleStackIcon` (database) |
| ✍️ Writing | `PencilIcon` |
| 👥 People | `UsersIcon` |
| 🔎 SEO | `MagnifyingGlassCircleIcon` |
| 🚀 Rocket | `RocketLaunchIcon` |
| 🔧 Wrench | `WrenchScrewdriverIcon` |
| 🌍 Globe | `GlobeAltIcon` |
| ✉️ Email | `EnvelopeIcon` |
| 📅 Calendar | `CalendarIcon` |
| 📍 Location | `MapPinIcon` |
| 🎬 Clapper | `FilmIcon` |
| 📺 TV | `TvIcon` |

### **Implementation:**
Replace all emojis with Heroicons across all pages (2-3 hours)

---

## 📋 Phase 4: Mobile Menu Enhancements

### **Critical Fixes (30 min):**

1. **Auto-close on link click**
2. **Escape key support**
3. **Outside click detection**

**Code Update** (`Layout.astro`):
```javascript
<script>
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle menu
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu?.classList.contains('hidden')) {
      mobileMenu?.classList.add('hidden');
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileMenu?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      mobileMenu?.classList.add('hidden');
    }
  });
</script>
```

### **Enhanced UX (30 min):**

4. **Active page indicator**
5. **Slide animation** (optional, if time allows)

---

## 📋 Phase 5: Final Polish

### **1. Add Calendly Link**
- Contact page: Replace `#` with actual Calendly URL
- (You mentioned you gave it earlier - I'll search for it)

### **2. Test All External Links**
- Hey You're Hired: https://heyyourehired.com ✅
- Director's Pal: https://directorpal.com (add to portal)
- Algorithm Institute YouTube: https://www.youtube.com/@AlgorithmInstitute ✅
- LinkedIn profiles: Abakar, Kenil ✅

### **3. Final Design System Check**
- All pages using zinc palette ✅
- No purple/blue/cyan (except status badges) ✅
- Consistent spacing and typography ✅

### **4. Deploy**
- Build production: `npm run build`
- Deploy to Netlify/Vercel
- Test on live site

---

## 📊 Summary Checklist

### **Phase 1: Team Member Pages**
- [ ] Create `/team/robert.astro` with 21x9 video hero
- [ ] Create `/team/abakar.astro` with 21x9 video hero
- [ ] Create `/team/kenil.astro` with 21x9 video hero
- [ ] Add "View Full Profile" links on `/team` overview
- [ ] Wait for you to create looped videos
- [ ] GSAP scroll animations on all sections
- [ ] Mobile optimization and testing

### **Phase 2: Portal UI**
- [ ] Create `/portal.astro` with Quick Access section
- [ ] Add Project Dashboards section
- [ ] Add Internal Resources section
- [ ] Add "Team Portal" link to footer (not main nav)
- [ ] Style with enterprise zinc palette
- [ ] Test all external links (Hey You're Hired admin, Director's Pal, etc.)

### **Phase 3: Icon Replacement**
- [ ] Install Heroicons (`npm install @heroicons/react`)
- [ ] Replace all emojis on Innovation Lab page
- [ ] Replace all emojis on Team page (Our Values)
- [ ] Replace all emojis on Contact page
- [ ] Replace all emojis on Portal page
- [ ] Verify icons match design system (zinc colors)

### **Phase 4: Mobile Menu**
- [ ] Add auto-close on link click
- [ ] Add Escape key support
- [ ] Add outside click detection
- [ ] Add active page indicator
- [ ] (Optional) Add slide animation
- [ ] Test on real mobile devices

### **Phase 5: Polish**
- [ ] Add Calendly link to Contact page
- [ ] Final design system audit
- [ ] Test all external links
- [ ] Production build and deploy

---

## 🎯 Recommended Execution Order

1. **Start with Portal UI** (quickest win, shows infrastructure)
2. **Mobile Menu Fixes** (critical UX improvements)
3. **Icon Replacement** (visual polish)
4. **Add Calendly Link** (completes Contact page)
5. **Wait for your videos** → Build Team Member Pages

---

**Ready to proceed with implementation when you give the signal.**

You handle the video loops, I'll build the pages and infrastructure. Let me know when videos are ready!
