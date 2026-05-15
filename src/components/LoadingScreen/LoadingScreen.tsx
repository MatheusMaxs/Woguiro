import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'woguiro-home-loading-seen';
const TITLE = 'WOGUIRO';

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => !hasSeenLoading());

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    document.documentElement.classList.add('is-scroll-locked');
    document.body.classList.add('is-scroll-locked');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeout = reducedMotion ? 220 : 800;

    const failSafeTimeout = window.setTimeout(() => {
      markLoadingSeen();
      setIsVisible(false);
    }, timeout);

    return () => {
      document.documentElement.classList.remove('is-scroll-locked');
      document.body.classList.remove('is-scroll-locked');
      window.clearTimeout(failSafeTimeout);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={overlayRef} className="loading-screen" aria-hidden="true">
      <div className="loading-screen-panel">
        <div className="loading-screen-topline">
          <span className="loading-screen-label">CARREGANDO</span>
          <span className="loading-screen-line" />
        </div>
        <div className="loading-screen-title">
          {Array.from(TITLE).map((character, index) => (
            <span key={`${character}-${index}`} className="loading-screen-char" style={{ '--char-index': index } as React.CSSProperties}>
              {character}
            </span>
          ))}
        </div>
        <p className="loading-screen-subtitle">PREPARANDO</p>
      </div>
    </div>
  );
}
