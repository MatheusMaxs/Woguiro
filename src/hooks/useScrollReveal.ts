import { RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useScrollReveal(containerRef: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-reveal], [data-reveal-item]', { clearProps: 'all', opacity: 1 });
        return;
      }

      const singles = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]');

      singles.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 32,
          duration: 0.85,
          ease: 'power3.out',
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
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
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
