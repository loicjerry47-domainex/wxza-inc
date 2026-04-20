# Diamond-Cut Animation System

## Overview
This document describes the comprehensive animation ecosystem for the WXZA platform. All animations are designed with performance, accessibility, and a premium "diamond-cut" aesthetic in mind.

## Architecture

### 1. Centralized Configuration (`/utils/animationConfig.ts`)
All animation constants, easing curves, variants, and configurations are centralized in a single file for consistency.

**Key Components:**
- **EASING**: Custom easing curves including our signature "diamond" easing
- **DURATION**: Standardized animation durations
- **STAGGER**: Consistent stagger delays for sequential animations
- **SPRING**: Pre-configured spring animations
- **VARIANTS**: Reusable Motion variants (fadeIn, scaleIn, etc.)
- **INTERACTIONS**: Standard hover and tap animations
- **PAGE_TRANSITIONS**: Page-level transition configs
- **CANVAS**: Configuration for BreathingTileBackground

### 2. Performance Optimizations

**GPU Acceleration:**
- All animated elements use `translateZ(0)` for hardware acceleration
- `will-change` properties are carefully managed to avoid memory issues
- Transforms are preferred over position/dimension changes

**Reduced Motion Support:**
- Automatic detection via `useReducedMotion` hook
- Respects `prefers-reduced-motion` system preference
- Provides instant animations when reduced motion is enabled

**Canvas Optimization:**
- Dirty rectangle rendering for minimal redraw
- Offscreen canvas caching for static elements
- Frame-skipping for breathing animations when mouse is idle
- ~60fps target with intelligent throttling

### 3. Animation Layers

**Layer 1: Background (z-0)**
- `BreathingTileBackground`: Canvas-based interactive tile grid
- Dynamic color shifts and breathing effects
- Mouse-reactive with wave propagation

**Layer 2: Content (z-10)**
- Page transitions using AnimatePresence
- Scroll-triggered animations with whileInView
- Staggered entrance animations for lists

**Layer 3: Interactive (z-50+)**
- Micro-interactions on buttons and cards
- Hover states with scale and glow
- Tap feedback animations

## Usage Examples

### Basic Page Animation
```tsx
import { motion } from 'motion/react';
import { VARIANTS, createTransition } from '@/utils/animationConfig';

<motion.div
  variants={VARIANTS.fadeInUp}
  transition={createTransition('normal', 'diamond')}
  initial="initial"
  animate="animate"
>
  Content
</motion.div>
```

### Staggered List
```tsx
<motion.div
  initial="initial"
  animate="animate"
  variants={VARIANTS.staggerContainer}
>
  {items.map((item, idx) => (
    <motion.div
      key={idx}
      variants={VARIANTS.staggerItem}
      transition={createTransition('normal', 'diamond', getStaggerDelay(idx))}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Interactive Button
```tsx
<motion.button
  whileHover={INTERACTIONS.buttonHover}
  whileTap={INTERACTIONS.buttonTap}
>
  Click Me
</motion.button>
```

### Parallax Effect
```tsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);

<motion.div style={{ y }}>
  Parallax Content
</motion.div>
```

### Reduced Motion Support
```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

## Animation Principles

### 1. Diamond-Cut Easing
Our signature easing curve: `cubic-bezier(0.33, 0, 0.1, 1)`
- Fast start, smooth deceleration
- Creates a premium, responsive feel
- Use for most transitions

### 2. Timing Standards
- **instant** (0.1s): Immediate feedback
- **fast** (0.2s): Quick interactions
- **normal** (0.4s): Standard transitions
- **slow** (0.6s): Deliberate movements
- **glacial** (1.2s): Ambient animations

### 3. Stagger Philosophy
- Use subtle stagger (0.02-0.05s) for tight groups
- Use medium stagger (0.1s) for card grids
- Never exceed 0.2s to maintain rhythm

### 4. Performance Rules
- Never animate more than 3 properties simultaneously
- Always use transforms instead of top/left
- Batch related animations in single RAF cycle
- Monitor for layout thrashing

## CSS Utilities

### Glass Morphism
- `.glass-ultra`: Lightest blur (12px)
- `.glass-light`: Standard blur (16px)
- `.glass-medium`: Medium blur (20px)
- `.glass-strong`: Heavy blur (24px)

### Hover States
- `.glass-hover`: Full transform + effects
- `.glass-hover-static`: No transform (for Motion components)
- `.liquid-border`: Animated gradient border on hover

### Performance
- `.gpu-accelerated`: Force GPU acceleration
- `.animate-smooth`: Smooth easing
- `.animate-diamond`: Diamond-cut easing

## Component-Specific Notes

### BreathingTileBackground
- Renders static grid to offscreen canvas once
- Only redraws dirty rectangles around mouse
- Breathing effect uses sine/cosine waves
- Dynamic HSL color interpolation
- Frame-skip optimization when idle

### ScrollToTop
- AnimatePresence for smooth enter/exit
- Bouncing chevron animation
- Scale + glow on hover
- Positioned bottom-right to avoid conflicts

### KeyboardShortcutsPanel
- Modal with backdrop blur
- Staggered list items
- Smooth dialog animations
- Click-outside to dismiss

## Maintenance

### Adding New Animations
1. Define constants in `animationConfig.ts`
2. Use existing EASING and DURATION values
3. Test with reduced motion enabled
4. Verify GPU acceleration (check Layers in DevTools)

### Performance Monitoring
- Use Chrome DevTools Performance tab
- Target: 60fps with < 16ms frame time
- Monitor: Paint, Composite, and Layout times
- Watch for layout thrashing

### Accessibility Checklist
- [ ] Respects prefers-reduced-motion
- [ ] No flashing/strobing effects
- [ ] Animations don't interfere with focus
- [ ] Alternative non-animated content paths exist

## Browser Support
- Modern browsers with CSS backdrop-filter
- Fallbacks for older browsers in canvas rendering
- Progressive enhancement approach

## Future Enhancements
- [ ] Add gesture support for mobile swipes
- [ ] Implement physics-based spring animations
- [ ] Create animation playground for testing
- [ ] Add animation presets for common patterns
- [ ] Performance monitoring dashboard

---

*Last Updated: January 2025*
*Diamond-cut animations for diamond-cut experiences.*
