import { useTranslation } from 'react-i18next';

import type { HomeNavigate } from '@/types/home';

interface HeroDiscoverProps {
  onNavigate: HomeNavigate;
}

export default function HeroDiscover({ onNavigate }: HeroDiscoverProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="hero-discover"
      data-cursor="link"
      onClick={() => onNavigate({ targetId: 'featured-works' })}
    >
      <span>{t('hero.discover')}</span>
      <span className="discover-line" aria-hidden="true" />
    </button>
  );
}
