import { useTranslation } from 'react-i18next';

import HeroCornerMarkers from './HeroCornerMarkers';

export default function HeroText() {
  const { t } = useTranslation();
  const title = t('hero.title');
  const taglineWords = t('hero.tagline').split(' ');

  return (
    <div className="hero-copy-shell">
      <div className="hero-copy-frame">
        <HeroCornerMarkers />
        <div className="hero-copy">
          <h1 className="hero-title" aria-label={title}>
            {Array.from(title).map((character, index) => (
              <span key={`${character}-${index}`} className="char" aria-hidden="true">
                {character === ' ' ? '\u00A0' : character}
              </span>
            ))}
          </h1>
          <p className="hero-location">{t('hero.location')}</p>
          <p className="hero-tagline">
            {taglineWords.map((word, index) => (
              <span key={`${word}-${index}`} className="word">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
