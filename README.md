# Machine King Labs Website

A modern, animated website built with Astro, Tailwind CSS, and GSAP for Machine King Labs.

## 🎬 What We Built

### Tech Stack
- **Framework**: Astro 4.x (optimal for static sites)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + ScrollTrigger for smooth scroll animations
- **Images**: Your provided logos and office mockup
- **Hosting Ready**: Optimized for Vercel deployment

### Pages Created

1. **Homepage** (`/`) - Hero with parallax, animated metrics, 4 project cards
2. **Team Page** (`/team`) - 3 team member cards with scroll animations
3. **Projects Page** (`/projects`) - Detailed showcases for each project
4. **Innovation Lab** (`/innovation-lab`) - The Presidium + R&D projects
5. **About Page** (`/about`) - Company overview and vision
6. **Contact Page** (`/contact`) - Contact methods and form

### 🎨 Animations Implemented

#### Hero Section
- ✅ Parallax background scrolling effect
- ✅ Floating logo animation (CSS keyframe)
- ✅ Sequential fade-in animations (staggered delays)
- ✅ Smooth scroll indicator

#### Scroll Animations
- ✅ **Metrics Bar**: Staggered fade-up when scrolling into view
- ✅ **Project Cards**: Staggered fade-up with hover lift effects
- ✅ **Team Cards**: Staggered slide-up (0.2s stagger)
- ✅ **Officer Cards**: Fast stagger (0.08s) for grid animation
- ✅ All sections trigger at 80% viewport height

#### Hover Effects
- ✅ Project cards: Lift up 8px + shadow increase
- ✅ Team cards: GSAP-powered smooth lift (12px)
- ✅ Officer cards: Scale to 1.05
- ✅ All buttons: Scale to 1.05

### 📸 Images Used

Your images are in `public/images/`:
- `hey-youre-hired-logo.png` - Project card
- `machine-king-labs-logo.png` - Nav and hero
- `office-mockup.webp` - Parallax background

**Image Ratios Analyzed:**
1. Hey You're Hired Logo: Portrait (~1:1.5)
2. Machine King Labs Logo: Square (1:1)
3. Office Mockup: Landscape (16:9)

## 🚀 Running the Project

### Development Server
```bash
cd machine-king-labs
npm run dev
```
Visit: http://localhost:4321/

### Build for Production
```bash
npm run build
npm run preview
```

## ✨ What You Need to Add

### 1. Team Photos
For the team page, you'll need square photos (1:1 ratio):
- **Location**: Place in `public/images/team/`
- **File names**: `robert.png`, `abakar.png`, `kenil.png`
- **Format**: Transparent background preferred
- **Size**: Minimum 500x500px

Then update `src/pages/team.astro` to use real images instead of gradient placeholders.

### 2. LinkedIn URLs
Update `src/pages/team.astro` - Replace `#` placeholders with actual LinkedIn URLs

### 3. Calendly Link
Update `src/pages/contact.astro` - Replace `#` with your Calendly scheduling URL

## 🎯 Animation Customization

### Adjusting Scroll Trigger Timing
```javascript
gsap.from('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',  // Adjust this (50%, 90%, etc.)
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 60,              // Distance to move
  stagger: 0.15,      // Delay between elements
  duration: 0.8,      // Animation duration
  ease: 'power3.out'
});
```

### Stagger Speed
- **Faster**: Decrease (e.g., `0.1`)
- **Slower**: Increase (e.g., `0.3`)

## 📁 File Structure

```
machine-king-labs/
├── public/
│   └── images/
│       ├── hey-youre-hired-logo.png
│       ├── machine-king-labs-logo.png
│       └── office-mockup.webp
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Main layout with nav/footer
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro           # About
│   │   ├── team.astro            # Team
│   │   ├── projects.astro        # Projects
│   │   ├── innovation-lab.astro  # Innovation Lab
│   │   └── contact.astro         # Contact
│   └── styles/
│       └── global.css            # Global styles
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

## 🎉 Key Features

✅ Hero parallax background
✅ Floating logo animation
✅ Staggered scroll animations on all pages
✅ Team card slide-up animations
✅ Project card hover effects
✅ Smooth page transitions
✅ Officer cards with fast stagger
✅ Responsive on mobile and desktop
✅ Custom scrollbar styling
✅ Gradient text effects
✅ Mobile navigation menu

## 🚢 Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Astro
4. Deploy!

Expected Lighthouse scores:
- Performance: 95-100
- Accessibility: 95-100
- SEO: 100

Enjoy your new animated website! 🚀
