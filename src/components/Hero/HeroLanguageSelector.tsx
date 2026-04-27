import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = ['en', 'pt', 'es', 'fr', 'it', 'de', 'ru'] as const;

export default function HeroLanguageSelector() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).slice(0, 2).toLowerCase();
  const activeLabel = useMemo(
    () => languages.find((language) => language === activeLanguage)?.toUpperCase() ?? 'EN',
    [activeLanguage],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={selectorRef} className={`lang-selector${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="lang-trigger"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        data-cursor="link"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <span>{activeLabel}</span>
        <span className="lang-chevron" aria-hidden="true">
          v
        </span>
      </button>
      {isOpen ? (
        <div className="lang-menu" role="listbox" aria-label={t('language.selector')}>
          {languages.map((language) => {
            const isActive = activeLanguage === language;

            return (
              <button
                key={language}
                type="button"
                className={`lang-option${isActive ? ' is-active' : ''}`}
                aria-selected={isActive}
                data-cursor="link"
                onClick={() => {
                  void i18n.changeLanguage(language);
                  setIsOpen(false);
                }}
              >
                {language.toUpperCase()}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
