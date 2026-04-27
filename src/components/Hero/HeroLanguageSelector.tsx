import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const languages = ['en', 'pt', 'es', 'fr', 'it', 'de', 'ru'] as const;
const smoothEase = [0.16, 1, 0.3, 1] as const;

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    filter: 'blur(6px)',
    transition: { duration: 0.22, ease: smoothEase },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: smoothEase,
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
};

const optionVariants: Variants = {
  closed: { opacity: 0, x: 8, filter: 'blur(4px)' },
  open: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.24, ease: smoothEase } },
};

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
      <motion.button
        type="button"
        className="lang-trigger"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        data-cursor="link"
        animate={{ y: isOpen ? -1 : 0, scale: isOpen ? 1.02 : 1 }}
        whileHover={{ y: -1, scale: 1.02 }}
        whileTap={{ y: 0, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeLabel}
            initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeLabel}
          </motion.span>
        </AnimatePresence>
        <motion.span className="lang-chevron" aria-hidden="true" animate={{ rotate: isOpen ? 180 : 0 }}>
          v
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="lang-menu"
            role="listbox"
            aria-label={t('language.selector')}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {languages.map((language) => {
              const isActive = activeLanguage === language;

              return (
                <motion.button
                  key={language}
                  type="button"
                  className={`lang-option${isActive ? ' is-active' : ''}`}
                  aria-selected={isActive}
                  data-cursor="link"
                  variants={optionVariants}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    void i18n.changeLanguage(language);
                    setIsOpen(false);
                  }}
                >
                  {language.toUpperCase()}
                </motion.button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
