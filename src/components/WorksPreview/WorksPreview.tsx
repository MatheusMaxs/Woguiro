import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FEATURED_WORKS, type FeaturedWork, type WorkFilter } from '@/data/homeContent';

interface WorksPreviewProps {
  activeFilter: WorkFilter;
  archiveOpen: boolean;
  onFilterChange: (filter: WorkFilter) => void;
}

function selectCuratedWorks(filter: WorkFilter) {
  const matchedWorks =
    filter === 'all'
      ? FEATURED_WORKS
      : FEATURED_WORKS.filter((work) => work.filters.includes(filter));

  if (matchedWorks.length >= 3) {
    return matchedWorks.slice(0, 3);
  }

  const fallbackWorks = FEATURED_WORKS.filter(
    (work) => !matchedWorks.some((matchedWork) => matchedWork.slug === work.slug),
  );

  return [...matchedWorks, ...fallbackWorks].slice(0, 3);
}

function WorkCard({
  work,
  index,
  isSelected,
  onSelect,
}: {
  work: FeaturedWork;
  index: number;
  isSelected: boolean;
  onSelect: (slug: string) => void;
}) {
  const { t } = useTranslation();
  const title = t(`works.items.${work.slug}.title`, { defaultValue: work.title });
  const subtitle = t(`works.items.${work.slug}.subtitle`, { defaultValue: work.subtitle });
  const location = t(`works.items.${work.slug}.location`, { defaultValue: work.location });

  return (
    <motion.article layout className={`work-card${isSelected ? ' is-selected' : ''}`}>
      <button
        type="button"
        className="work-card-media"
        data-cursor="view"
        onClick={() => onSelect(work.slug)}
      >
        <img
          src={work.image}
          alt={title}
          loading="lazy"
          draggable={false}
          style={work.objectPosition ? { objectPosition: work.objectPosition } : undefined}
        />
        <span className="work-card-index">{String(index).padStart(2, '0')}</span>
        <div className="work-card-scrim" aria-hidden="true" />
      </button>

      <div className="work-card-copy">
        <div className="work-card-meta-row">
          <span>{work.year}</span>
          <span>{location}</span>
        </div>

        <div className="work-card-copy-row">
          <div>
            <p className="work-card-kicker">{`${t(work.mediumKey)} / ${t(work.audienceKey)}`}</p>
            <h3 className="work-card-title">{title}</h3>
            <p className="work-card-subtitle">{subtitle}</p>
          </div>

          <button type="button" className="pill-button" data-cursor="link" onClick={() => onSelect(work.slug)}>
            {t('works.openProject')}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ViewAllCard() {
  const { t } = useTranslation();

  return (
    <motion.article layout className="work-card work-card--view-all">
      <Link to="/works" className="work-card-media" data-cursor="view">
        <span className="work-card-index">04</span>
        <span className="view-all-card-symbol" aria-hidden="true">
          +
        </span>
      </Link>

      <div className="work-card-copy">
        <div className="work-card-meta-row">
          <span>{t('works.meta')}</span>
          <span>{t('works.available')}</span>
        </div>

        <div className="work-card-copy-row">
          <div>
            <p className="work-card-kicker">{t('works.focus')}</p>
            <h3 className="work-card-title">{t('works.viewAll')}</h3>
            <p className="work-card-subtitle">{t('works.curated')}</p>
          </div>

          <Link to="/works" className="pill-button" data-cursor="link">
            {t('works.viewAll')}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function WorksPreview({
  activeFilter,
  archiveOpen,
  onFilterChange,
}: WorksPreviewProps) {
  const { t } = useTranslation();
  const curatedWorks = useMemo(() => selectCuratedWorks(activeFilter), [activeFilter]);
  const archiveWorks = useMemo(
    () => (activeFilter === 'all' ? FEATURED_WORKS : FEATURED_WORKS.filter((work) => work.filters.includes(activeFilter))),
    [activeFilter],
  );
  const [selectedSlug, setSelectedSlug] = useState(curatedWorks[0]?.slug ?? FEATURED_WORKS[0].slug);

  useEffect(() => {
    if (!curatedWorks.some((work) => work.slug === selectedSlug)) {
      setSelectedSlug(curatedWorks[0]?.slug ?? FEATURED_WORKS[0].slug);
    }
  }, [curatedWorks, selectedSlug]);

  const selectedWork = FEATURED_WORKS.find((work) => work.slug === selectedSlug) ?? curatedWorks[0];
  const selectedTitle = selectedWork
    ? t(`works.items.${selectedWork.slug}.title`, { defaultValue: selectedWork.title })
    : '';
  const selectedDescription = selectedWork
    ? t(`works.items.${selectedWork.slug}.description`, { defaultValue: selectedWork.description })
    : '';

  return (
    <section className="home-section works-preview-section" id="featured-works">
      <div className="section-shell works-shell">
        <div className="section-ghost" aria-hidden="true">
          {t('works.ghost')}
        </div>

        <div className="section-meta-row" data-reveal>
          <span>{t('works.eyebrow')}</span>
          <span>{t('works.meta')}</span>
          <span>{t('works.available')}</span>
        </div>

        <div className="works-heading-grid" data-reveal>
          <div className="section-heading-block">
            <p className="section-kicker">{t('works.eyebrow')}</p>
            <h2 className="section-title section-title--works">{t('works.title')}</h2>
            <p className="section-body">{t('works.description')}</p>
          </div>

          <div className="works-filter-column">
            <div className="works-filter-row" role="toolbar" aria-label={t('works.eyebrow')}>
              {(['all', 'photography', 'videography', 'brands', 'artists'] as WorkFilter[]).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
                  aria-pressed={activeFilter === filter}
                  data-cursor="link"
                  onClick={() => onFilterChange(filter)}
                >
                  {t(`works.filters.${filter}`)}
                </button>
              ))}
            </div>

            <p className="works-curation-note">{t('works.curated')}</p>
          </div>
        </div>

        {selectedWork ? (
          <motion.div layout className="works-focus-panel" data-reveal>
            <div className="works-focus-layout">
              <div className="works-focus-copy">
                <div className="works-focus-meta-row">
                  <span>{t('works.focus')}</span>
                  <span>{`${t(selectedWork.mediumKey)} / ${t(selectedWork.audienceKey)}`}</span>
                </div>

                <h3 className="works-focus-title">{selectedTitle}</h3>
                <p className="works-focus-description">{selectedDescription}</p>

                <ul className="works-focus-points">
                  {selectedWork.focusPoints.map((point, index) => (
                    <li key={point}>{t(`works.items.${selectedWork.slug}.focusPoints.${index}`, { defaultValue: point })}</li>
                  ))}
                </ul>

                <div className="works-focus-tags">
                  {selectedWork.tags.map((tag, index) => (
                    <span key={tag} className="meta-pill">
                      {t(`works.items.${selectedWork.slug}.tags.${index}`, { defaultValue: tag })}
                    </span>
                  ))}
                </div>

              </div>

              <div className="works-focus-media" aria-hidden="true">
                <img
                  src={selectedWork.image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  style={selectedWork.objectPosition ? { objectPosition: selectedWork.objectPosition } : undefined}
                />
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="works-grid">
          {curatedWorks.map((work, index) => (
            <WorkCard
              key={work.slug}
              work={work}
              index={index + 1}
              isSelected={selectedSlug === work.slug}
              onSelect={setSelectedSlug}
            />
          ))}

          <ViewAllCard />
        </div>

        <AnimatePresence initial={false}>
          {archiveOpen ? (
            <motion.div
              key="archive"
              className="works-archive"
              initial={{ opacity: 0, height: 0, y: 18 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="works-archive-head">
                <span>{t('works.viewAll')}</span>
                <span>{`${archiveWorks.length} ${t('works.available')}`}</span>
              </div>

              <div className="works-archive-grid">
                {archiveWorks.map((work) => (
                  <button
                    key={work.slug}
                    type="button"
                    className={`archive-card${selectedSlug === work.slug ? ' is-selected' : ''}`}
                    data-cursor="view"
                    onClick={() => setSelectedSlug(work.slug)}
                  >
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
                      <span className="archive-card-subtitle">{t(work.audienceKey)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
