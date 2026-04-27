import { useTranslation } from 'react-i18next';

import type { HomeNavigate } from '@/types/home';

interface HeroCTAProps {
  onNavigate: HomeNavigate;
}

export default function HeroCTA({ onNavigate }: HeroCTAProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="hero-cta"
      data-cursor="link"
      onClick={() => onNavigate({ targetId: 'contact-section' })}
    >
      <span className="cta-corner cta-corner--tl" aria-hidden="true" />
      <span className="cta-corner cta-corner--tr" aria-hidden="true" />
      <span className="cta-corner cta-corner--bl" aria-hidden="true" />
      <span className="cta-corner cta-corner--br" aria-hidden="true" />
      <span className="cta-text">{t('hero.cta')}</span>
      <span className="cta-arrow" aria-hidden="true">
        →
      </span>
      <span className="cta-fill" aria-hidden="true" />
    </button>
  );
}
