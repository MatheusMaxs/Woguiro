import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'woguiro-home-loading-seen';
const TITLE = 'WOGUIRO';

gsap.registerPlugin(useGSAP);

function hasSeenLoading() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function markLoadingSeen() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Storage can be blocked in private or hardened browsers; never keep the loader stuck.
  }
}

export default function LoadingScreen() {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => !hasSeenLoading());

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    document.documentElement.classList.add('is-scroll-locked');
    document.body.classList.add('is-scroll-locked');

    return () => {
      document.documentElement.classList.remove('is-scroll-locked');
      document.body.classList.remove('is-scroll-locked');
    };
  }, [isVisible]);

  useGSAP(
    () => {
      if (!isVisible) {
        return;
      }

      let completed = false;
      const completeLoading = () => {
        if (completed) {
          return;
        }

        completed = true;
        markLoadingSeen();
        setIsVisible(false);
      };
      const failSafeTimeout = window.setTimeout(completeLoading, 1500);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const timeoutId = window.setTimeout(completeLoading, 220);
        return () => {
          window.clearTimeout(timeoutId);
          window.clearTimeout(failSafeTimeout);
        };
      }

      const titleChars = gsap.utils.toArray<HTMLElement>('.loading-screen-char');
      const timeline = gsap.timeline({ delay: 0.15, onComplete: completeLoading });

      timeline
        .fromTo(
          '.loading-screen-line',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.7, ease: 'power3.out' },
        )
        .from(
          titleChars,
          {
            opacity: 0,
            y: 30,
            stagger: 0.05,
            duration: 0.55,
            ease: 'power3.out',
          },
          0.08,
        )
        .from(
          '.loading-screen-subtitle',
          {
            opacity: 0,
            y: 18,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.38,
        )
        .to('.loading-screen-panel', {
          yPercent: -108,
          duration: 0.8,
          ease: 'power4.inOut',
        }, '+=0.58');

      return () => {
        window.clearTimeout(failSafeTimeout);
        timeline.kill();
      };
    },
    { scope: overlayRef, dependencies: [isVisible] },
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={overlayRef} className="loading-screen" aria-hidden="true">
      <div className="loading-screen-panel">
        <div className="loading-screen-topline">
          <span className="loading-screen-label">{t('loading.label')}</span>
          <span className="loading-screen-line" />
        </div>
        <div className="loading-screen-title">
          {Array.from(TITLE).map((character, index) => (
            <span key={`${character}-${index}`} className="loading-screen-char">
              {character}
            </span>
          ))}
        </div>
        <p className="loading-screen-subtitle">{t('loading.status')}</p>
      </div>
    </div>
  );
}
