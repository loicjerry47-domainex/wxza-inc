import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has enabled reduced motion in their system preferences
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if matchMedia is supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns animation variants based on reduced motion preference
 * If reduced motion is enabled, returns simplified animations
 */
export function useAnimationVariant<T extends Record<string, any>>(
  normalVariant: T,
  reducedVariant?: Partial<T>
): T {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion && reducedVariant) {
    return { ...normalVariant, ...reducedVariant } as T;
  }

  return normalVariant;
}

/**
 * Hook to get motion-safe transition config
 * Returns instant transitions if reduced motion is enabled
 */
export function useMotionTransition(
  transition: any
): any {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      ease: 'linear'
    };
  }

  return transition;
}
