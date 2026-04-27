import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import AboutPreview from '@/components/AboutPreview/AboutPreview';
import Hero from '@/components/Hero/Hero';
import ContactSection from '@/components/ContactSection/ContactSection';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import WorksPreview from '@/components/WorksPreview/WorksPreview';
import { type WorkFilter } from '@/data/homeContent';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { HomeNavigate } from '@/types/home';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const mainRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all');
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  useScrollReveal(mainRef);

  const handleNavigate: HomeNavigate = ({ targetId, filter, expandArchive, expandAbout }) => {
    if (filter) {
      setActiveFilter(filter);
    }

    if (expandArchive) {
      setArchiveOpen(true);
    }

    if (expandAbout) {
      setAboutExpanded(true);
    }

    const delay = expandArchive || expandAbout ? 220 : 60;

    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, delay);
  };

  return (
    <motion.main
      ref={mainRef}
      className="home-page"
      id="main-content"
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, filter: 'blur(8px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} />
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>

      <LoadingScreen />
      <Hero onNavigate={handleNavigate} />

      <div className="home-sections">
        <WorksPreview
          activeFilter={activeFilter}
          archiveOpen={archiveOpen}
          onFilterChange={setActiveFilter}
        />
        <AboutPreview expanded={aboutExpanded} onToggleExpanded={() => setAboutExpanded((current) => !current)} />
        <ContactSection />
      </div>
    </motion.main>
  );
}
