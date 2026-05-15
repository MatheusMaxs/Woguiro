import { RefObject, useEffect } from 'react';

export function useHeroTimeline(containerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealTargets = container.querySelectorAll<HTMLElement>(
        '.hero-bg-image, .grain-overlay, .hero-location, .nav-column, .hero-clock, .lang-selector, .hero-discover, .hero-cta, .corner-marker',
      );
      revealTargets.forEach((el) => el.style.removeProperty('opacity'));
      const titleChars = container.querySelectorAll<HTMLElement>('.hero-title .char');
      titleChars.forEach((el) => el.style.removeProperty('opacity'));
      return;
    }

    container.classList.add('hero-animations-ready');
  }, [containerRef]);
}
