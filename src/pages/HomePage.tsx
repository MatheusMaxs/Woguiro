import { lazy, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import AboutPreview from '@/components/AboutPreview/AboutPreview';
import Hero from '@/components/Hero/Hero';
import ContactSection from '@/components/ContactSection/ContactSection';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import PartnershipsSection from '@/components/PartnershipsSection/PartnershipsSection';
import WorksPreview from '@/components/WorksPreview/WorksPreview';
import { type WorkFilter } from '@/data/homeContent';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { HomeNavigate } from '@/types/home';

const FloatingAtmosphere = lazy(() => import('@/components/FloatingAtmosphere/FloatingAtmosphere'));

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
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -22 }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform' }}
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} dir={i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr'} />
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <link rel="canonical" href="https://www.woguiro.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.woguiro.com/" />
        <meta property="og:title" content={t('seo.title')} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:image" content="https://www.woguiro.com/site-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.title')} />
        <meta name="twitter:description" content={t('seo.description')} />
        <meta name="twitter:image" content="https://www.woguiro.com/site-preview.png" />
      </Helmet>

      <LoadingScreen />
      <Hero onNavigate={handleNavigate} />

      <div className="home-sections">
        <FloatingAtmosphere />
        <WorksPreview
          activeFilter={activeFilter}
          archiveOpen={archiveOpen}
          onFilterChange={setActiveFilter}
        />
        <AboutPreview expanded={aboutExpanded} onToggleExpanded={() => setAboutExpanded((current) => !current)} />
        <PartnershipsSection />
        <ContactSection />
      </div>
    </motion.main>
  );
}
