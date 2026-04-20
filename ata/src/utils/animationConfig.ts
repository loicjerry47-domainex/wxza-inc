/**
 * Centralized Animation Configuration
 * Diamond-cut precision for all animations across the platform
 */

// Easing Functions - Premium, sophisticated curves
export const EASING = {
  // Standard easings
  smooth: [0.4, 0, 0.2, 1] as const,
  snappy: [0.65, 0, 0.35, 1] as const,
  gentle: [0.25, 0.1, 0.25, 1] as const,
  
  // Specialized easings
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  
  // Diamond-cut signature easing
  diamond: [0.33, 0, 0.1, 1] as const,
  diamondIn: [0.85, 0, 0.15, 1] as const,
  diamondOut: [0.33, 0, 0, 1] as const,
} as const;

// Duration Standards (in seconds)
export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  glacial: 1.2,
} as const;

// Stagger Delays
export const STAGGER = {
  micro: 0.02,
  tiny: 0.05,
  small: 0.08,
  medium: 0.1,
  large: 0.15,
  xl: 0.2,
} as const;

// Spring Configurations
export const SPRING = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 15 },
  normal: { type: "spring" as const, stiffness: 150, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
} as const;

// Common Animation Variants
export const VARIANTS = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  scalePop: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  
  // Slide animations
  slideInUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  
  // Container variants for stagger
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: STAGGER.medium,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

// Hover & Tap Animations
export const INTERACTIONS = {
  // Card hover
  cardHover: {
    scale: 1.02,
    y: -8,
    transition: { duration: DURATION.normal, ease: EASING.diamond },
  },
  
  cardTap: {
    scale: 0.98,
  },
  
  // Button interactions
  buttonHover: {
    scale: 1.05,
    transition: { duration: DURATION.fast, ease: EASING.snappy },
  },
  
  buttonTap: {
    scale: 0.95,
  },
  
  // Subtle lift
  subtleLift: {
    y: -4,
    transition: { duration: DURATION.normal, ease: EASING.diamond },
  },
  
  // Glow effect
  glowHover: {
    boxShadow: "0 0 40px rgba(14, 165, 233, 0.3)",
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
} as const;

// Page Transition Configs
export const PAGE_TRANSITIONS = {
  default: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATION.fast, ease: EASING.diamond },
  },
  
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: DURATION.normal, ease: EASING.diamond },
  },
  
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
} as const;

// Scroll-based Animation Configs
export const SCROLL_ANIMATIONS = {
  viewport: {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px",
  },
  
  viewportRepeat: {
    once: false,
    amount: 0.3,
  },
} as const;

// Canvas Animation Configs (for BreathingTileBackground)
export const CANVAS = {
  // Tile configuration
  tile: {
    baseSize: 40,
    gap: 4,
    radius: 8,
    radiusInfluence: 6,
  },
  
  // Animation timing
  breathing: {
    frequency: 0.0008, // Lower = slower breathing
    amplitude: 0.15,   // Intensity of breathing
    waveSpeed: 0.001,  // Speed of wave propagation
  },
  
  // Color animation
  color: {
    baseOpacity: 0.15,
    hoverOpacity: 0.6,
    pulseSpeed: 0.002,
    waveHue: {
      min: 190, // Cyan
      max: 210, // Blue
    },
  },
  
  // Interaction
  interaction: {
    maxDistance: 240, // Max distance for mouse effect
    liftIntensity: 6,
    shiftIntensity: 5,
  },
} as const;

// Helper function to get staggered delay
export const getStaggerDelay = (index: number, stagger: keyof typeof STAGGER = 'medium') => {
  return index * STAGGER[stagger];
};

// Helper to create transition config
export const createTransition = (
  duration: keyof typeof DURATION = 'normal',
  easing: keyof typeof EASING = 'diamond',
  delay: number = 0
) => ({
  duration: DURATION[duration],
  ease: EASING[easing],
  delay,
});

// Reduced motion variants
export const REDUCED_MOTION = {
  transition: { duration: 0.01 },
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
} as const;
