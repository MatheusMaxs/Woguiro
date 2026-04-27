import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import {
  ABOUT_PORTRAIT,
  DISCIPLINE_HIGHLIGHTS,
  STAT_HIGHLIGHTS,
  TECH_HIGHLIGHTS,
  WORKING_LANGUAGES,
} from '@/data/homeContent';

interface AboutPreviewProps {
  expanded: boolean;
  onToggleExpanded: () => void;
}

const YOUTUBE_VIEWS_FALLBACK = '130K+';
const YOUTUBE_VIEWS_CACHE_KEY = 'woguiro-youtube-views';
const YOUTUBE_VIEWS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

const formatStatCount = (value: number) => {
  if (value >= 1_000_000) {
    const millions = Math.floor(value / 100_000) / 10;
    return `${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)}M+`;
  }

  if (value >= 1_000) {
    return `${Math.floor(value / 1_000)}K+`;
  }

  return value.toString();
};

export default function AboutPreview({ expanded, onToggleExpanded }: AboutPreviewProps) {
  const { t } = useTranslation();
  const [youtubeViews, setYoutubeViews] = useState(YOUTUBE_VIEWS_FALLBACK);

  useEffect(() => {
    const now = Date.now();

    try {
      const cached = window.localStorage.getItem(YOUTUBE_VIEWS_CACHE_KEY);
      const parsed = cached ? JSON.parse(cached) : null;

      if (typeof parsed?.value === 'string' && now - Number(parsed.updatedAt) < YOUTUBE_VIEWS_CACHE_TTL_MS) {
        setYoutubeViews(parsed.value);
        return;
      }
    } catch {
      window.localStorage.removeItem(YOUTUBE_VIEWS_CACHE_KEY);
    }

    let isCurrent = true;

    fetch('/api/youtube-stats')
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!isCurrent || typeof payload?.viewCount !== 'number') {
          return;
        }

        const value = formatStatCount(payload.viewCount);
        setYoutubeViews(value);
        window.localStorage.setItem(YOUTUBE_VIEWS_CACHE_KEY, JSON.stringify({ value, updatedAt: now }));
      })
      .catch(() => undefined);

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="home-section about-preview-section" id="about-section">
      <div className="section-shell about-shell">
        <div className="section-ghost" aria-hidden="true">
          {t('aboutPreview.ghost')}
        </div>

        <div className="section-meta-row" data-reveal>
          <span>{t('aboutPreview.eyebrow')}</span>
          <span>{t('aboutPreview.meta')}</span>
          <span>{t('aboutPreview.reach')}</span>
        </div>

        <div className="about-preview-grid" data-reveal-group>
          <div className="about-portrait-panel" data-reveal-item>
            <div className="about-portrait-frame">
              <img src={ABOUT_PORTRAIT} alt={t('aboutPreview.portraitAlt')} loading="lazy" draggable={false} />
            </div>
          </div>

          <div className="about-copy-panel" data-reveal-item>
            <p className="section-kicker">{t('aboutPreview.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPreview.title')}</h2>
            <p className="section-body">{t('aboutPreview.description')}</p>
            <p className="section-body section-body--muted">{t('aboutPreview.body')}</p>

            <div className="about-stat-strip">
              {STAT_HIGHLIGHTS.map((stat) => (
                <div key={stat.labelKey} className="about-stat-card">
                  <span className="about-stat-value">{stat.labelKey === 'aboutPreview.stats.views' ? youtubeViews : stat.value}</span>
                  <span className="about-stat-label">{t(stat.labelKey)}</span>
                </div>
              ))}
            </div>

            <div className="about-core-specs" id="about-specs">
              <div className="about-core-specs-head">
                <span>{t('aboutPreview.specs')}</span>
              </div>

              <div className="about-core-specs-grid">
                {TECH_HIGHLIGHTS.slice(0, 4).map((item) => (
                  <div key={item.label} className="about-spec-card">
                    <span>{t(`aboutPreview.tech.${item.label.toLowerCase()}`, { defaultValue: item.label })}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-actions-row">
              <button type="button" className="ghost-button" data-cursor="link" onClick={onToggleExpanded}>
                {expanded ? t('aboutPreview.collapse') : t('aboutPreview.readMore')}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="about-expanded"
              className="about-expanded-grid"
              initial={{ opacity: 0, height: 0, y: 18 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -16 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="about-panel">
                <div className="about-panel-head">
                  <span>{t('aboutPreview.disciplines')}</span>
                  <span>{DISCIPLINE_HIGHLIGHTS.length}</span>
                </div>

                <div className="about-discipline-grid">
                  {DISCIPLINE_HIGHLIGHTS.map((discipline, index) => (
                    <div key={discipline.labelKey} className="about-discipline-card">
                      <strong>{t(discipline.labelKey)}</strong>
                      <p>{t(`aboutPreview.disciplinesList.${index}`, { defaultValue: discipline.description })}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-panel">
                <div className="about-panel-head">
                  <span>{t('aboutPreview.specs')}</span>
                  <span>{WORKING_LANGUAGES.join(' / ')}</span>
                </div>

                <div className="about-full-specs-grid">
                  {TECH_HIGHLIGHTS.map((item) => (
                    <div key={item.label} className="about-spec-card about-spec-card--dense">
                      <span>{t(`aboutPreview.tech.${item.label.toLowerCase()}`, { defaultValue: item.label })}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
