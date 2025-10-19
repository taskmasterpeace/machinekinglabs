# Mobile Menu Implementation

**Created:** October 19, 2025
**Status:** Implemented, needs testing
**Location:** `src/layouts/Layout.astro`

---

## 📱 Current Implementation

### **Navigation Structure**

The mobile menu is currently implemented in the global Layout component with:
- Hamburger button (visible only on `< lg` breakpoints)
- Dropdown menu (hidden by default)
- JavaScript toggle functionality

### **Code Location**

**File:** `C:\git\homepage\machine-king-labs\src\layouts\Layout.astro`
**Lines:** 51-70

---

## 🎨 Design Specifications

### **Hamburger Button**

```html
<!-- Mobile menu button -->
<button
  class="lg:hidden p-2 rounded-md hover:bg-zinc-900/50 transition-colors"
  id="mobile-menu-btn"
  aria-label="Toggle menu"
>
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>
```

**Styling:**
- Only visible on screens `< 1024px` (`lg:hidden`)
- Padding: `p-2` (8px)
- Rounded corners: `rounded-md` (6px)
- Hover state: `hover:bg-zinc-900/50`
- Icon size: `w-6 h-6` (24px)

---

### **Mobile Menu Dropdown**

```html
<!-- Mobile menu -->
<div class="lg:hidden hidden" id="mobile-menu">
  <div class="px-4 pt-2 pb-4 space-y-1 bg-zinc-950 border-t border-zinc-800/50">
    <a href="/" class="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">Home</a>
    <a href="/about" class="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">About</a>
    <a href="/projects" class="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">Portfolio</a>
    <a href="/innovation-lab" class="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">Innovation Lab</a>
    <a href="/team" class="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">Team</a>
    <a href="/contact" class="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-all">Contact</a>
  </div>
</div>
```

**Styling:**
- Hidden on desktop: `lg:hidden`
- Hidden by default: `hidden` (toggled with JavaScript)
- Background: `bg-zinc-950`
- Border top: `border-t border-zinc-800/50`
- Padding: `px-4 pt-2 pb-4`
- Link spacing: `space-y-1` (4px gap)

**Link Styling:**
- Display: `block` (full width)
- Padding: `px-4 py-3` (16px horizontal, 12px vertical)
- Font size: `text-sm` (14px)
- Font weight: `font-medium` (500)
- Default color: `text-zinc-300`
- Hover color: `hover:text-white`
- Hover background: `hover:bg-zinc-900/50`
- Corners: `rounded-md`

---

## ⚙️ JavaScript Toggle

**Code Location:** Lines 108-116 in `Layout.astro`

```javascript
<script>
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
</script>
```

**Functionality:**
1. Get references to button and menu elements
2. Add click listener to hamburger button
3. Toggle `hidden` class on menu div
4. Uses optional chaining (`?.`) to prevent errors if elements not found

---

## 📋 Testing Checklist

### **Desktop Testing (≥ 1024px)**
- [ ] Hamburger button is hidden
- [ ] Desktop navigation is visible
- [ ] All 6 links visible in horizontal layout
- [ ] Hover states work on desktop links
- [ ] Mobile menu never appears

### **Tablet Testing (768px - 1023px)**
- [ ] Hamburger button is visible in top right
- [ ] Desktop navigation is hidden
- [ ] Clicking hamburger opens dropdown menu
- [ ] Clicking hamburger again closes dropdown
- [ ] All 6 links visible in vertical stack
- [ ] Links are full width and tappable
- [ ] Hover/tap states work correctly

### **Mobile Testing (< 768px)**
- [ ] Hamburger button is visible and tappable
- [ ] Button is properly sized for touch (min 44x44px)
- [ ] Menu opens below navigation bar
- [ ] Menu doesn't cover logo
- [ ] All links are readable and tappable
- [ ] Touch target size is adequate (min 44px height)
- [ ] Scrolling works if menu is taller than viewport
- [ ] Menu closes when link is clicked (needs implementation)

### **Accessibility Testing**
- [ ] Hamburger button has `aria-label="Toggle menu"`
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces menu state
- [ ] Focus states are visible
- [ ] Menu can be closed with Escape key (needs implementation)

---

## 🐛 Known Issues & Improvements Needed

### **1. Menu Doesn't Auto-Close on Link Click**
**Issue:** When user clicks a link, menu stays open
**Fix Needed:**
```javascript
// Add to script section
const mobileLinks = mobileMenu?.querySelectorAll('a');
mobileLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
  });
});
```

### **2. No Escape Key Support**
**Issue:** Can't close menu with Escape key
**Fix Needed:**
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu?.classList.contains('hidden')) {
    mobileMenu?.classList.add('hidden');
  }
});
```

### **3. No Outside Click Detection**
**Issue:** Clicking outside menu doesn't close it
**Fix Needed:**
```javascript
document.addEventListener('click', (e) => {
  if (!mobileMenu?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
    mobileMenu?.classList.add('hidden');
  }
});
```

### **4. No Slide Animation**
**Issue:** Menu appears/disappears instantly (not smooth)
**Enhancement:**
- Add CSS transition for slide-down effect
- Use `max-height` or `transform` animation
- Keep performance smooth (avoid layout thrashing)

**Recommended Implementation:**
```css
#mobile-menu {
  transition: max-height 0.3s ease-in-out;
  max-height: 0;
  overflow: hidden;
}

#mobile-menu.open {
  max-height: 500px;
}
```

### **5. No Active Page Indicator**
**Issue:** Current page not highlighted in menu
**Enhancement:**
- Add logic to detect current page
- Apply different styling to active link
- Use `text-white` and `bg-zinc-900` for active state

---

## 🎯 Recommended Improvements

### **Priority 1: Critical Functionality**

1. **Auto-close on link click**
   - Essential for good UX
   - Users expect menu to close when navigating

2. **Escape key support**
   - Accessibility requirement
   - Standard UX pattern

3. **Outside click detection**
   - Users expect clicking outside to close menu
   - Prevents menu from getting "stuck"

### **Priority 2: Enhanced UX**

4. **Slide animation**
   - Makes menu feel polished
   - Less jarring than instant toggle

5. **Active page indicator**
   - Shows users where they are
   - Standard navigation pattern

### **Priority 3: Nice-to-Have**

6. **Focus trap**
   - Keep keyboard focus within menu when open
   - Improve accessibility

7. **Smooth icon animation**
   - Hamburger → X icon transition
   - Visual feedback for toggle state

8. **Touch-optimized sizing**
   - Ensure all tap targets ≥ 44x44px
   - Add more padding if needed

---

## 🚀 Implementation Plan

### **Phase 1: Fix Critical Issues** (30 minutes)

```javascript
<script>
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle menu on button click
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu?.classList.contains('hidden')) {
      mobileMenu?.classList.add('hidden');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!mobileMenu?.contains(target) && !mobileMenuBtn?.contains(target)) {
      mobileMenu?.classList.add('hidden');
    }
  });
</script>
```

### **Phase 2: Add Slide Animation** (15 minutes)

```astro
<!-- Replace hidden class with open/closed state -->
<div class="lg:hidden mobile-menu-wrapper" id="mobile-menu">
  <div class="px-4 pt-2 pb-4 space-y-1 bg-zinc-950 border-t border-zinc-800/50">
    <!-- Links -->
  </div>
</div>

<style>
  .mobile-menu-wrapper {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .mobile-menu-wrapper.open {
    max-height: 500px;
  }
</style>

<script>
  // Update toggle to use 'open' class instead of 'hidden'
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
  });
</script>
```

### **Phase 3: Active Page Indicator** (20 minutes)

```astro
---
const currentPath = Astro.url.pathname;
---

<div class="lg:hidden hidden" id="mobile-menu">
  <div class="px-4 pt-2 pb-4 space-y-1 bg-zinc-950 border-t border-zinc-800/50">
    <a
      href="/"
      class={`block px-4 py-3 text-sm font-medium rounded-md transition-all ${
        currentPath === '/'
          ? 'bg-zinc-900 text-white'
          : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
      }`}
    >
      Home
    </a>
    <!-- Repeat for other links -->
  </div>
</div>
```

---

## 📱 Responsive Breakpoints

**Tailwind Breakpoints:**
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop (mobile menu hidden) */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large desktop */
```

**Mobile Menu Visibility:**
- `< 1024px` (lg): Mobile menu shown, desktop nav hidden
- `≥ 1024px` (lg): Desktop nav shown, mobile menu hidden

---

## 🎨 Design System Compliance

### **Colors**
- ✅ Background: `bg-zinc-950` (matches design system)
- ✅ Border: `border-zinc-800/50` (subtle separator)
- ✅ Text: `text-zinc-300` default, `text-white` hover/active
- ✅ Hover background: `hover:bg-zinc-900/50`

### **Typography**
- ✅ Font size: `text-sm` (14px)
- ✅ Font weight: `font-medium` (500)
- ✅ No uppercase (reserved for buttons/labels)

### **Spacing**
- ✅ Padding: `px-4 py-3` (16px horizontal, 12px vertical)
- ✅ Gap between links: `space-y-1` (4px)
- ✅ Container padding: `px-4 pt-2 pb-4`

### **Corners**
- ✅ Links: `rounded-md` (6px)
- ✅ Button: `rounded-md` (6px)

---

## ✅ Testing Results

**Status:** Not yet tested

**Devices to Test:**
- [ ] iPhone SE (375px width)
- [ ] iPhone 12/13/14 (390px width)
- [ ] iPhone 14 Pro Max (430px width)
- [ ] iPad Mini (768px width)
- [ ] iPad Air (820px width)
- [ ] Samsung Galaxy S21 (360px width)

**Browsers to Test:**
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (Android)
- [ ] Samsung Internet

---

## 📝 Next Steps

1. **Implement Phase 1 fixes** (auto-close, Escape, outside click)
2. **Test on real mobile devices** (not just browser DevTools)
3. **Add slide animation** (Phase 2)
4. **Implement active page indicator** (Phase 3)
5. **Conduct accessibility audit** (keyboard nav, screen reader)
6. **Document test results** in this file

---

**End of Mobile Menu Documentation**

*Last updated: October 19, 2025*
