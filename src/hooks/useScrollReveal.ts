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
          y: 54,
          scale: 0.975,
          rotateX: 4,
          transformOrigin: '50% 70%',
          filter: 'blur(12px)',
          duration: 1.18,
          ease: 'power4.out',
          clearProps: 'filter,opacity,transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
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
          y: 44,
          scale: 0.975,
          rotateX: 3,
          transformOrigin: '50% 70%',
          filter: 'blur(10px)',
          duration: 1.05,
          stagger: 0.075,
          ease: 'power4.out',
          clearProps: 'filter,opacity,transform',
          scrollTrigger: {
            trigger: group,
            start: 'top 82%',
            once: true,
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh, { once: true });

      return () => window.removeEventListener('load', refresh);
    },
    { scope: containerRef },
  );
}
