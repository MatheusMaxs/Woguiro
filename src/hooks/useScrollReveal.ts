import { RefObject, useEffect } from 'react';

export function useScrollReveal(containerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      const singles = container.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-item]');
      singles.forEach((el) => el.style.removeProperty('opacity'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 },
    );

    const singles = container.querySelectorAll<HTMLElement>('[data-reveal]');
    const groups = container.querySelectorAll<HTMLElement>('[data-reveal-group]');

    singles.forEach((el) => observer.observe(el));

    groups.forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
      items.forEach((el, index) => {
        (el as HTMLElement).style.setProperty('--reveal-delay', `${index * 0.075}s`);
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [containerRef]);
}
