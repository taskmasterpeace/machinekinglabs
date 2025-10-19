# Machine King Labs Design System

**Last Updated:** October 19, 2025
**Version:** 1.0

---

## 🎨 Color Palette

### Core Colors (ENTERPRISE ONLY)
```css
--black: #000000
--zinc-950: rgb(9, 9, 11)
--zinc-900: rgb(24, 24, 27)
--zinc-800: rgb(39, 39, 42)
--zinc-700: rgb(63, 63, 70)
--zinc-600: rgb(82, 82, 91)
--zinc-500: rgb(113, 113, 122)
--zinc-400: rgb(161, 161, 170)
--zinc-300: rgb(212, 212, 216)
--white: #FFFFFF
```

### Status Colors (Minimal Use Only)
```css
--green-400: rgb(74, 222, 128)   /* Just Launched badge */
--green-500/10: rgba(34, 197, 94, 0.1)  /* Badge background */
--red-400: rgb(248, 113, 113)    /* Live badge */
--blue-400: rgb(96, 165, 250)    /* Patent Pending badge */
```

### ❌ BANNED COLORS
- NO purple (except existing Presidium badge - to be phased out)
- NO cyan
- NO aqua
- NO teal
- NO colorful gradients

### Gradient (Text Only)
```css
.gradient-text {
  background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 📐 Typography

### Font Family
```css
font-family: system-ui, -apple-system, sans-serif
```

### Type Scale
```css
H1: 48-72px, font-bold, tracking-tight
H2: 36-48px, font-bold
H3: 24-32px, font-bold
Body Large: 18-20px, line-height 1.6
Body: 16px, line-height 1.5
Small: 14px
Tiny: 12px
Badge/Label: 10-12px, uppercase, tracking-widest
```

### Font Weights
```css
--regular: 400
--medium: 500
--semibold: 600
--bold: 700
```

---

## 🏗️ Layout & Spacing

### Container Widths
```css
max-w-7xl: 1280px
max-w-6xl: 1152px
max-w-5xl: 1024px
max-w-4xl: 896px
```

### Spacing Scale (8pt System)
```css
px-4: 16px
px-6: 24px
px-8: 32px
py-2: 8px
py-3: 12px
py-4: 16px
gap-1: 4px
gap-2: 8px
gap-3: 12px
gap-4: 16px
gap-6: 24px
gap-8: 32px
```

### Navigation
```css
Height: h-20 (80px)
Padding: px-6 lg:px-8
Backdrop: backdrop-blur-2xl
Background: bg-black/95
Border: border-b border-zinc-800/50
```

---

## 🎯 Components

### Buttons

#### Primary Button (CTA)
```html
<a class="px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-sm font-semibold transition-all hover:scale-105 uppercase tracking-wider text-sm">
  Button Text
</a>
```

#### Secondary Button (Ghost)
```html
<a class="px-6 py-3 bg-transparent hover:bg-white/10 rounded-sm font-semibold transition-all hover:scale-105 border border-zinc-600 hover:border-zinc-400 uppercase tracking-wider text-sm">
  Button Text
</a>
```

#### Nav Link
```html
<a class="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">
  Link
</a>
```

### Cards

#### Project Card
```html
<div class="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all">
  <!-- Content -->
</div>
```

#### Status Badge
```html
<!-- Just Launched -->
<span class="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs uppercase tracking-wider rounded-sm">
  Just Launched
</span>

<!-- Patent Pending -->
<span class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs uppercase tracking-wider rounded-sm">
  Patent Pending
</span>

<!-- Live -->
<span class="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-wider rounded-sm">
  Live
</span>

<!-- Internal Tool -->
<span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs uppercase tracking-wider rounded-sm">
  Internal Tool
</span>
```

#### Tech Stack Badge
```html
<span class="px-3 py-1 bg-zinc-900 text-zinc-400 text-xs rounded-sm">
  Next.js 15
</span>
```

### Form Inputs
```html
<input class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-sm focus:border-zinc-600 focus:outline-none transition-colors text-white" />
```

---

## 🎭 Animations

### GSAP ScrollTrigger Pattern
```javascript
gsap.from('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 60,
  duration: 0.8,
  ease: 'power3.out'
});
```

### Stagger Animation
```javascript
gsap.from('.cards', {
  scrollTrigger: {
    trigger: '.cards',
    start: 'top 70%',
  },
  opacity: 0,
  y: 60,
  stagger: 0.15,  // 150ms between each
  duration: 0.8,
  ease: 'power3.out'
});
```

### Hover States
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Approach
- Start with mobile design
- Use `md:` prefix for tablet
- Use `lg:` prefix for desktop

---

## 🚫 DON'T DO THIS

### Never Use:
- ❌ Colorful gradients on backgrounds (slate-950 via-cyan-950)
- ❌ Rounded corners > 4px (use `rounded-sm` or `rounded-md`)
- ❌ Purple/blue/aqua as primary colors
- ❌ Multiple font families
- ❌ Emojis in production (use icons instead - coming soon)
- ❌ `uppercase` on long text (badges/labels only)

### Always Do:
- ✅ Use zinc-950/900/800 for backgrounds
- ✅ Use white for primary CTAs
- ✅ Keep corners minimal (`rounded-sm`)
- ✅ Maintain 8pt spacing system
- ✅ Use GSAP for scroll animations
- ✅ White text on dark backgrounds
- ✅ Uppercase only for small labels (tracking-wider or tracking-widest)

---

## 🎯 Page Structure Template

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title | Machine King Labs">
  <!-- Hero Section -->
  <section class="py-20 bg-gradient-to-br from-zinc-950 via-neutral-950 to-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-5xl md:text-6xl font-bold mb-6">
        <span class="gradient-text">Page Title</span>
      </h1>
      <p class="text-xl text-zinc-300 max-w-3xl mx-auto">
        Description text
      </p>
    </div>
  </section>

  <!-- Content Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Cards or content -->
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-black border-t border-zinc-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-bold mb-6 text-white">CTA Heading</h2>
      <p class="text-xl text-zinc-400 mb-8">
        CTA description
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#" class="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-sm font-semibold transition-all hover:scale-105 uppercase tracking-wider text-sm">
          Primary Action
        </a>
        <a href="#" class="px-8 py-4 bg-transparent hover:bg-white/10 rounded-sm font-semibold transition-all hover:scale-105 border border-zinc-600 hover:border-zinc-400 uppercase tracking-wider text-sm">
          Secondary Action
        </a>
      </div>
    </div>
  </section>
</Layout>
```

---

## 📝 Copy Guidelines

### Tone
- **Direct** - No fluff
- **Confident** - We build real shit
- **Enterprise** - Professional but not stuffy
- **Action-oriented** - Clear CTAs

### Terminology
- Use "Portfolio" not "Projects"
- Use "Solutions" not "Applications"
- Use "Innovation Lab" not "R&D Projects"
- Use "Schedule Consultation" not "Get in Touch"

### Headlines
- Keep under 60 characters
- Use gradient-text class for main headings
- Avoid ALL CAPS for long headings

---

## 🔗 External Resources

### Icons (Coming Soon)
- Heroicons (https://heroicons.com)
- Lucide Icons (https://lucide.dev)

### Fonts
- System fonts only (no web fonts needed)

### Inspiration
- Linear.app (enterprise minimal)
- Vercel (clean dark mode)
- Stripe (professional confidence)

---

**Remember:** This isn't about being flashy. It's about looking like we know what the fuck we're doing - because we do. Clean, professional, enterprise-grade. That's the Machine King Labs look.
