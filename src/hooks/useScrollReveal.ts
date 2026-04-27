import { RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useScrollReveal(containerRef: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-reveal], [data-reveal-item]', { clearProps: 'all', filter: 'none', opacity: 1 });
        return;
      }

      const singles = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]');

      singles.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 36,
          scale: 0.985,
          filter: 'blur(8px)',
          duration: 1,
          ease: 'power3.out',
          clearProps: 'filter,opacity,transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            once: true,
          },
        });
      });

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');

        if (!items.length) {
          return;
        }

        gsap.from(items, {
          opacity: 0,
          y: 34,
          scale: 0.985,
          filter: 'blur(8px)',
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'filter,opacity,transform',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );
}
