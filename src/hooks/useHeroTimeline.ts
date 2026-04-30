import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function useHeroTimeline(containerRef: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(
          [
            '.hero-bg-image',
            '.grain-overlay',
            '.hero-location',
            '.nav-column',
            '.hero-clock',
            '.lang-selector',
            '.hero-discover',
            '.hero-cta',
            '.corner-marker',
          ],
          { clearProps: 'all', opacity: 1 },
        );
        return;
      }

      const titleChars = gsap.utils.toArray<HTMLElement>('.hero-title .char');
      const taglineWords = gsap.utils.toArray<HTMLElement>('.hero-tagline .word');
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
          duration: 1.35,
        },
        delay: 0.35,
      });

      timeline
        .from('.hero-bg-image', {
          scale: 1.08,
          opacity: 0,
          duration: 2.2,
          ease: 'power2.out',
        }, 0)
        .from(
          titleChars,
          {
            opacity: 0,
            y: 42,
            rotationX: -90,
            duration: 1.45,
            ease: 'back.out(1.25)',
          },
          0,
        )
        .from(
          taglineWords,
          {
            opacity: 0,
            y: 18,
            duration: 1.25,
          },
          0,
        )
        .from(
          '.hero-location',
          {
            opacity: 0,
            y: 15,
            duration: 1.2,
          },
          0,
        )
        .from(
          '.corner-marker',
          {
            scale: 0,
            opacity: 0,
            duration: 1.05,
            ease: 'back.out(1.45)',
          },
          0,
        )
        .from(
          '.nav-column',
          {
            opacity: 0,
            y: -20,
            duration: 1.25,
          },
          0,
        )
        .from(
          '.hero-clock, .lang-selector, .hero-discover',
          {
            opacity: 0,
            x: 20,
            duration: 1.2,
          },
          0,
        )
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 14,
            duration: 1.05,
            clearProps: 'transform,opacity',
          },
          0,
        )
        .to(
          '.grain-overlay',
          {
            opacity: 0.045,
            duration: 1.6,
          },
          0,
        );

      return () => timeline.kill();
    },
    { scope: containerRef },
  );
}
