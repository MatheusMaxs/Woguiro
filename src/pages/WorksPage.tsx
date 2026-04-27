import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FEATURED_WORKS } from '@/data/homeContent';

export default function WorksPage() {
  const { t, i18n } = useTranslation();

  return (
    <motion.main
      className="home-page works-page"
      id="main-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} />
        <title>{`${t('works.viewAll')} - Woguiro`}</title>
        <meta name="description" content={t('works.description')} />
      </Helmet>

      <div className="home-sections">
        <section className="home-section works-page-section">
          <div className="section-shell works-shell">
            <div className="section-ghost" aria-hidden="true">
              {t('works.ghost')}
            </div>

            <div className="section-meta-row">
              <span>{t('works.viewAll')}</span>
              <span>{t('works.meta')}</span>
              <span>{t('works.available')}</span>
            </div>

            <div className="works-heading-grid">
              <div className="section-heading-block">
                <p className="section-kicker">{t('works.eyebrow')}</p>
                <h1 className="section-title section-title--works">{t('works.viewAll')}</h1>
                <p className="section-body">{t('works.description')}</p>
              </div>

              <div className="works-filter-column">
                <Link to="/" className="ghost-button" data-cursor="link">
                  {t('nav.portfolio')}
                </Link>
              </div>
            </div>

            <div className="works-archive works-archive--page">
              <div className="works-archive-grid">
                {FEATURED_WORKS.map((work) => (
                  <article key={work.slug} className="archive-card">
                    <span className="archive-card-media">
                      <img
                        src={work.image}
                        alt={t(`works.items.${work.slug}.title`, { defaultValue: work.title })}
                        loading="lazy"
                        draggable={false}
                        style={work.objectPosition ? { objectPosition: work.objectPosition } : undefined}
                      />
                    </span>
                    <span className="archive-card-copy">
                      <span className="archive-card-title">{t(`works.items.${work.slug}.title`, { defaultValue: work.title })}</span>
                      <span className="archive-card-subtitle">
                        {t(`works.items.${work.slug}.subtitle`, { defaultValue: work.subtitle })}
                      </span>
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
