import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import {
  ABOUT_PORTRAIT,
  DISCIPLINE_HIGHLIGHTS,
  EXPERIENCE_START_YEAR,
  STAT_HIGHLIGHTS,
  TECH_HIGHLIGHTS,
  WORKING_LANGUAGES,
  YOUTUBE_CHANNEL_URL,
} from '@/data/homeContent';

interface AboutPreviewProps {
  expanded: boolean;
  onToggleExpanded: () => void;
}

const YOUTUBE_VIEWS_FALLBACK = '656K+';
const YOUTUBE_VIEWS_CACHE_KEY = 'woguiro-youtube-views-v2';
const YOUTUBE_VIEWS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const TECH_GROUP_CLASS_BY_ID: Record<string, string> = {
  cpu: 'about-spec-card--blue',
  gpu: 'about-spec-card--blue',
  motherboard: 'about-spec-card--violet',
  ram: 'about-spec-card--violet',
  camera: 'about-spec-card--teal',
  'main-gimbal': 'about-spec-card--teal',
  ssd: 'about-spec-card--amber',
  monitors: 'about-spec-card--amber',
  microphone: 'about-spec-card--cyan',
  interface: 'about-spec-card--cyan',
  phone: 'about-spec-card--green',
  'mobile-gimbal': 'about-spec-card--green',
};

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
  const experienceYears = Math.max(0, new Date().getFullYear() - EXPERIENCE_START_YEAR);

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
              <span className="about-portrait-caption">{t('aboutPreview.portraitCaption')}</span>
            </div>
          </div>

          <div className="about-copy-panel" data-reveal-item>
            <p className="section-kicker">{t('aboutPreview.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPreview.title')}</h2>
            <p className="section-body">{t('aboutPreview.description')}</p>
            <p className="section-body section-body--muted">{t('aboutPreview.body')}</p>

            <div className="about-stat-strip">
              {STAT_HIGHLIGHTS.map((stat) => {
                const statValue = stat.labelKey === 'aboutPreview.stats.views' ? youtubeViews : stat.value;
                const statContent = (
                  <>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={statValue}
                        className="about-stat-value"
                        initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8, filter: 'blur(5px)' }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {statValue}
                      </motion.span>
                    </AnimatePresence>
                    <span className="about-stat-label">{t(stat.labelKey)}</span>
                  </>
                );

                return stat.labelKey === 'aboutPreview.stats.views' ? (
                  <a
                    key={stat.labelKey}
                    className="about-stat-card about-stat-card--link"
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                  >
                    {statContent}
                  </a>
                ) : (
                  <div key={stat.labelKey} className="about-stat-card">
                    {statContent}
                  </div>
                );
              })}
            </div>

            <div className="about-experience-grid">
              <div className="about-experience-card about-experience-card--primary">
                <strong className="about-experience-years">{experienceYears}</strong>
                <span>{t('aboutPreview.experience.yearsLabel')}</span>
              </div>
              <div className="about-experience-card">
                <span>{t('aboutPreview.experience.availabilityTitle')}</span>
                <strong>{t('aboutPreview.experience.availabilityValue')}</strong>
              </div>
              <div className="about-experience-card">
                <span>{t('aboutPreview.experience.languagesTitle')}</span>
                <strong>{t('aboutPreview.experience.languagesValue')}</strong>
              </div>
              <div className="about-experience-card">
                <span>{t('aboutPreview.experience.adminTitle')}</span>
                <strong>{t('aboutPreview.experience.adminValue')}</strong>
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
              <div className="about-panel about-panel--disciplines">
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

              <div className="about-panel about-panel--setup">
                <div className="about-panel-head">
                  <span>{t('aboutPreview.specs')}</span>
                  <span>{WORKING_LANGUAGES.join(' / ')}</span>
                </div>

                <div className="about-full-specs-grid">
                  {TECH_HIGHLIGHTS.map((item) => (
                    <div
                      key={item.id}
                      className={`about-spec-card about-spec-card--dense ${TECH_GROUP_CLASS_BY_ID[item.id] ?? ''}`.trim()}
                    >
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
