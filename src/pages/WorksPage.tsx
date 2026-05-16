import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PROJECT_FILTERS, WORK_PROJECTS, type ProjectFilter, type ProjectMedia, type WorkProject } from '@/data/workProjects';
import { getImageSrcSet, getVideoSources } from '@/utils/responsiveImage';

function MediaPreview({ media, priority = false }: { media: ProjectMedia; priority?: boolean }) {
  const style = media.objectPosition ? { objectPosition: media.objectPosition } : undefined;

  if (media.mediaKind === 'video') {
    const videoSources = getVideoSources(media.slug);

    return (
      <video poster={media.poster} muted loop playsInline autoPlay preload={priority ? 'auto' : 'none'} draggable={false} style={style}>
        {videoSources?.['480p'] && <source src={videoSources['480p']} type="video/mp4" media="(max-width: 719px)" />}
        {videoSources?.['720p'] && <source src={videoSources['720p']} type="video/mp4" media="(min-width: 720px)" />}
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  const srcSet = getImageSrcSet(media.slug);

  return (
    <picture>
      <source srcSet={srcSet?.avif ?? media.srcAvif ?? media.src} type="image/avif" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      <source srcSet={srcSet?.webp ?? media.src} type="image/webp" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      <img src={media.src} srcSet={srcSet?.webp ?? undefined} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'low'} draggable={false} style={style} />
    </picture>
  );
}

function ProjectMosaic({ project }: { project: WorkProject }) {
  const { t } = useTranslation();
  const previewLayout = project.previewLayout ?? 'editorial';
  const previewMedia = [project.hero, ...project.images.filter((work) => work.slug !== project.hero.slug)]
    .filter((work, index, items) => items.findIndex((item) => item.slug === work.slug || item.src === work.src) === index)
    .slice(0, previewLayout === 'vertical-strip' ? 5 : 4);

  return (
    <div
      className={`works-project-mosaic works-project-mosaic--${previewLayout} works-project-mosaic--count-${previewMedia.length}`}
      aria-hidden="true"
    >
      {previewMedia.map((work, index) => (
        <span key={`${project.slug}-${work.slug}-${index}`} className={`works-project-mosaic-item works-project-mosaic-item--${index + 1}`}>
          <MediaPreview media={work} priority={index === 0} />
          <span className="works-project-image-overlay">
            <span>{t(`portfolioMedia.${work.slug}.title`, { defaultValue: work.title })}</span>
            <span>{t(`portfolioProjects.${project.slug}.category`, { defaultValue: project.category })}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: WorkProject; index: number }) {
  const { t } = useTranslation();
  const title = t(`portfolioProjects.${project.slug}.title`, { defaultValue: project.title });
  const description = t(`portfolioProjects.${project.slug}.description`, { defaultValue: project.description });
  const category = t(`portfolioProjects.${project.slug}.category`, { defaultValue: project.category });
  const date = t(`portfolioProjects.${project.slug}.date`, { defaultValue: project.date });
  const highlights = project.highlights.map((highlight, highlightIndex) =>
    t(`portfolioProjects.${project.slug}.highlights.${highlightIndex}`, { defaultValue: highlight }),
  );

  return (
    <article
      className="works-project-card"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <Link
        to={`/works/${project.slug}`}
        className="works-project-hit-area"
        aria-label={t('worksPage.openProjectLabel', { project: title })}
        data-cursor="view"
      />

      <div className="works-project-copy">
        <div className="works-project-meta-row">
          <span>{date}</span>
          <span>{category}</span>
        </div>

        <h2 className="works-project-title">{title}</h2>
        <p className="works-project-description">{description}</p>

        <ul className="works-project-highlights">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <span className="pill-button works-project-cta" aria-hidden="true">
          {t('worksPage.openProject')}
        </span>
      </div>

      <ProjectMosaic project={project} />
    </article>
  );
}

export default function WorksPage() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? WORK_PROJECTS
        : WORK_PROJECTS.filter((project) => project.filters.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <main
      className="home-page works-page page-enter"
      id="main-content"
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} dir={i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr'} />
        <title>{t('worksPage.title')}</title>
        <meta name="description" content={t('works.description')} />
        <link rel="canonical" href="https://www.woguiro.com/works" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.woguiro.com/works" />
        <meta property="og:title" content={t('worksPage.title')} />
        <meta property="og:description" content={t('works.description')} />
        <meta property="og:image" content="https://www.woguiro.com/site-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('worksPage.title')} />
        <meta name="twitter:description" content={t('works.description')} />
        <meta name="twitter:image" content="https://www.woguiro.com/site-preview.png" />
      </Helmet>

      <div className="home-sections">
        <section className="home-section works-page-section">
          <div className="section-shell works-shell works-projects-shell">
            <div className="section-ghost" aria-hidden="true">
              {t('works.ghost')}
            </div>

            <div className="section-meta-row stagger-item" style={{ '--item-index': 0 } as React.CSSProperties}>
              <span>{t('works.viewAll')}</span>
              <span>{t('works.meta')}</span>
              <span>{t('worksPage.projectCount', { count: filteredProjects.length })}</span>
            </div>

            <div className="works-heading-grid stagger-item" style={{ '--item-index': 1 } as React.CSSProperties}>
              <div className="section-heading-block">
                <p className="section-kicker">{t('worksPage.kicker')}</p>
                <h1 className="section-title section-title--works">{t('worksPage.heading')}</h1>
                <p className="section-body">{t('worksPage.body')}</p>
              </div>

              <div className="works-filter-column">
                <div className="works-filter-row" role="toolbar" aria-label={t('worksPage.filterLabel')}>
                  {PROJECT_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      className={`filter-chip${activeFilter === filter.id ? ' is-active' : ''}`}
                      aria-pressed={activeFilter === filter.id}
                      data-cursor="link"
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      {t(`worksPage.filters.${filter.id}`, { defaultValue: filter.label })}
                    </button>
                  ))}
                </div>

                <Link to="/" className="ghost-button" data-cursor="link">
                  {t('nav.portfolio')}
                </Link>
              </div>
            </div>

            <div className="works-project-list stagger-item" style={{ '--item-index': 2 } as React.CSSProperties}>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)
              ) : (
                <div className="works-project-empty">
                  <span>{t('worksPage.emptyTitle')}</span>
                  <p>{t('worksPage.emptyBody')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
