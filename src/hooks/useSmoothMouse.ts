import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface HeroMouseState {
  clientX: number;
  clientY: number;
  x: number;
  y: number;
}

const initialMouseState: HeroMouseState = {
  clientX: window.innerWidth / 2,
  clientY: window.innerHeight / 2,
  x: 0,
  y: 0,
};

export function useParallaxMouse(containerRef: RefObject<HTMLElement>) {
  const mouseRef = useRef<HeroMouseState>(initialMouseState);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const layers = [
      { selector: '.parallax-layer-bg', x: -10, y: -7, duration: 1.1 },
      { selector: '.parallax-layer-text', x: 4, y: 2, duration: 0.85 },
      { selector: '.parallax-layer-nav', x: 2.5, y: 1.4, duration: 0.6 },
    ]
      .map(({ selector, ...config }) => {
        const element = container.querySelector<HTMLElement>(selector);

        if (!element) {
          return null;
        }

        return {
          ...config,
          xTo: gsap.quickTo(element, 'x', { duration: config.duration, ease: 'power3.out' }),
          yTo: gsap.quickTo(element, 'y', { duration: config.duration, ease: 'power3.out' }),
        };
      })
      .filter(Boolean);

    const updateFromEvent = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      mouseRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
        x,
        y,
      };

      container.style.setProperty('--pointer-x', `${((x + 1) / 2) * 100}%`);
      container.style.setProperty('--pointer-y', `${((y + 1) / 2) * 100}%`);

      if (prefersReducedMotion) {
        return;
      }

      layers.forEach((layer) => {
        layer?.xTo(x * layer.x);
        layer?.yTo(y * layer.y);
      });
    };

    const reset = () => {
      container.style.setProperty('--pointer-x', '50%');
      container.style.setProperty('--pointer-y', '38%');
      mouseRef.current = initialMouseState;

      if (prefersReducedMotion) {
        return;
      }

      layers.forEach((layer) => {
        layer?.xTo(0);
        layer?.yTo(0);
      });
    };

    container.addEventListener('pointermove', updateFromEvent);
    container.addEventListener('pointerleave', reset);

    return () => {
      container.removeEventListener('pointermove', updateFromEvent);
      container.removeEventListener('pointerleave', reset);
    };
  }, [containerRef]);

  return mouseRef;
}
