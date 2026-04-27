import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

export default function CustomCursor() {
  const { t } = useTranslation();
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!dot || !follower || !label) {
      return;
    }

    if (
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMove = (event: PointerEvent) => {
      xDot(event.clientX);
      yDot(event.clientY);
      xFollower(event.clientX);
      yFollower(event.clientY);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');

      follower.classList.remove('cursor--link', 'cursor--view');
      label.textContent = '';

      if (!target) {
        return;
      }

      const cursorType = target.dataset.cursor;

      if (cursorType === 'view') {
        follower.classList.add('cursor--view');
        label.textContent = t('cursor.view');
        return;
      }

      if (cursorType === 'link') {
        follower.classList.add('cursor--link');
      }
    };

    document.addEventListener('pointermove', handleMove);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      document.removeEventListener('pointermove', handleMove);
    };
  }, [t]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
