import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { WORK_PROJECTS, type ProjectMedia, type WorkProject } from '@/data/workProjects';
import { getImageSrcSet, getVideoSources } from '@/utils/responsiveImage';

function CaseMedia({
  media,
  alt,
  controls = false,
  autoPlay = !controls,
  priority = false,
}: {
  media: ProjectMedia;
  alt: string;
  controls?: boolean;
  autoPlay?: boolean;
  priority?: boolean;
}) {
  const style = media.objectPosition ? { objectPosition: media.objectPosition } : undefined;

  if (media.mediaKind === 'video') {
    const videoSources = getVideoSources(media.slug);

    return (
      <video
        poster={media.poster}
        muted={!controls}
        loop={!controls}
        playsInline
        autoPlay={autoPlay}
        controls={controls}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        preload={priority ? 'auto' : 'none'}
        draggable={false}
        style={style}
      >
        {videoSources?.['480p'] && <source src={videoSources['480p']} type="video/mp4" media="(max-width: 719px)" />}
        {videoSources?.['720p'] && <source src={videoSources['720p']} type="video/mp4" media="(min-width: 720px)" />}
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  const srcSet = getImageSrcSet(media.slug);

  return (
    <picture>
      <source srcSet={srcSet?.avif ?? media.srcAvif ?? media.src} type="image/avif" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw" />
      <source srcSet={srcSet?.webp ?? media.src} type="image/webp" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw" />
      <img src={media.src} srcSet={srcSet?.webp ?? undefined} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw" alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'low'} draggable={false} style={style} />
    </picture>
  );
}

function MediaLightbox({ media, onClose }: { media: ProjectMedia | null; onClose: () => void }) {
  const { t } = useTranslation();
  const mediaTitle = media ? t(`portfolioMedia.${media.slug}.title`, { defaultValue: media.title }) : '';

  useEffect(() => {
    if (!media) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('is-scroll-locked');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('is-scroll-locked');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [media, onClose]);

  if (!media) {
    return null;
  }

  return createPortal(
    <div className="media-lightbox media-lightbox-enter" role="dialog" aria-modal="true" aria-label={mediaTitle}>
      <button type="button" className="media-lightbox-backdrop" aria-label={t('projectCase.closeMedia')} onClick={onClose} />
      <div className="media-lightbox-panel media-lightbox-panel-enter">
        <button type="button" className="media-lightbox-close" data-cursor="link" onClick={onClose}>
          {t('projectCase.close')}
        </button>
        <div className="media-lightbox-frame">
          <CaseMedia media={media} alt={mediaTitle} controls={media.mediaKind === 'video'} autoPlay />
        </div>
        <div className="media-lightbox-caption">
          <span>{media.mediaKind === 'video' ? t('projectCase.videoWithSound') : t('projectCase.enlargedImage')}</span>
          <strong>{mediaTitle}</strong>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ProjectNotFound() {
  const { t, i18n } = useTranslation();
  const { projectSlug } = useParams();

  return (
    <main
      className="home-page works-page project-case-page page-enter"
      id="main-content"
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} dir={i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr'} />
        <title>{t('projectCase.notFoundTitle')}</title>
        <meta name="description" content={t('projectCase.unavailable')} />
        <link rel="canonical" href={`https://www.woguiro.com/works/${projectSlug}`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="home-sections">
        <section className="home-section">
          <div className="section-shell project-case-shell">
            <div className="project-case-empty">
              <p className="section-kicker">{t('projectCase.unavailable')}</p>
              <h1 className="section-title section-title--works">{t('projectCase.missingTitle')}</h1>
              <Link to="/works" className="ghost-button" data-cursor="link">
                {t('projectCase.backToWorks')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectMeta({ project }: { project: WorkProject }) {
  const { t } = useTranslation();
  const metaItems = [
    ['category', t(`portfolioProjects.${project.slug}.category`, { defaultValue: project.category })],
    ['date', t(`portfolioProjects.${project.slug}.date`, { defaultValue: project.date })],
    ['client', t(`portfolioProjects.${project.slug}.client`, { defaultValue: project.client })],
    ['location', t(`portfolioProjects.${project.slug}.location`, { defaultValue: project.location })],
  ];

  return (
    <div className="project-case-meta-grid">
      {metaItems.map(([label, value]) => (
        <div key={label} className="project-case-meta-card">
          <span>{t(`projectCase.${label}`)}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function WorkProjectPage() {
  const { projectSlug } = useParams();
  const { t, i18n } = useTranslation();
  const [activeMedia, setActiveMedia] = useState<ProjectMedia | null>(null);
  const projectIndex = WORK_PROJECTS.findIndex((item) => item.slug === projectSlug);
  const project = projectIndex >= 0 ? WORK_PROJECTS[projectIndex] : undefined;

  if (!project) {
    return <ProjectNotFound />;
  }

  const previousProject = WORK_PROJECTS[(projectIndex - 1 + WORK_PROJECTS.length) % WORK_PROJECTS.length];
  const nextProject = WORK_PROJECTS[(projectIndex + 1) % WORK_PROJECTS.length];
  const secondaryImage = project.images.find((item) => item.slug !== project.hero.slug && item.src !== project.hero.src);
  const projectTitle = t(`portfolioProjects.${project.slug}.title`, { defaultValue: project.title });
  const projectSubtitle = t(`portfolioProjects.${project.slug}.subtitle`, { defaultValue: project.subtitle });
  const projectDescription = t(`portfolioProjects.${project.slug}.description`, { defaultValue: project.description });
  const projectStory = t(`portfolioProjects.${project.slug}.story`, { defaultValue: project.story });
  const projectCategory = t(`portfolioProjects.${project.slug}.category`, { defaultValue: project.category });
  const projectDate = t(`portfolioProjects.${project.slug}.date`, { defaultValue: project.date });
  const previousProjectTitle = t(`portfolioProjects.${previousProject.slug}.title`, { defaultValue: previousProject.title });
  const nextProjectTitle = t(`portfolioProjects.${nextProject.slug}.title`, { defaultValue: nextProject.title });

  return (
    <main
      className="home-page works-page project-case-page page-enter"
      id="main-content"
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} dir={i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr'} />
        <title>{`Woguiro - ${projectTitle}`}</title>
        <meta name="description" content={projectDescription} />
        <link rel="canonical" href={`https://www.woguiro.com/works/${project.slug}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.woguiro.com/works/${project.slug}`} />
        <meta property="og:title" content={`Woguiro - ${projectTitle}`} />
        <meta property="og:description" content={projectDescription} />
        <meta property="og:image" content={project.hero.src} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Woguiro - ${projectTitle}`} />
        <meta name="twitter:description" content={projectDescription} />
        <meta name="twitter:image" content={project.hero.src} />
      </Helmet>

      <div className="home-sections">
        <section className="home-section project-case-section">
          <div className="section-shell project-case-shell" data-project-slug={project.slug}>
            <div className="section-ghost" aria-hidden="true">
              {t('projectCase.ghost')}
            </div>

            <div className="section-meta-row stagger-item" style={{ '--item-index': 0 } as React.CSSProperties}>
              <span>{t('projectCase.caseStudy')}</span>
              <span>{projectCategory}</span>
              <span>{projectDate}</span>
            </div>

            <div className="project-case-topbar stagger-item" style={{ '--item-index': 1 } as React.CSSProperties}>
              <Link to="/works" className="ghost-button" data-cursor="link">
                {t('projectCase.backToWorks')}
              </Link>
              <span>{t('projectCase.mediaCount', { count: project.images.length })}</span>
            </div>

            <div className="project-case-hero stagger-item" style={{ '--item-index': 2 } as React.CSSProperties}>
              <button type="button" className="project-case-media-button" data-cursor="view" onClick={() => setActiveMedia(project.hero)}>
                <CaseMedia media={project.hero} alt={projectTitle} priority />
                <span className="project-case-media-hint">{t('projectCase.openLarge')}</span>
              </button>
              <div className="project-case-hero-copy">
                <p>{projectCategory}</p>
                <h1>{projectTitle}</h1>
                <span>{projectSubtitle}</span>
              </div>
            </div>

            <div className="stagger-item" style={{ '--item-index': 3 } as React.CSSProperties}>
              <ProjectMeta project={project} />
            </div>

            <div className="project-case-story-grid stagger-item" style={{ '--item-index': 4 } as React.CSSProperties}>
              <div className="project-case-story-copy">
                <p className="section-kicker">{t('projectCase.description')}</p>
                <h2>{projectSubtitle}</h2>
                <p>{projectDescription}</p>
                <p>{projectStory}</p>
              </div>

              <div className="project-case-highlights-panel">
                <span>{t('projectCase.highlights')}</span>
                <ul>
                  {project.highlights.map((highlight, index) => (
                    <li key={highlight}>{t(`portfolioProjects.${project.slug}.highlights.${index}`, { defaultValue: highlight })}</li>
                  ))}
                </ul>
              </div>
            </div>

            {secondaryImage ? (
              <div className="project-case-editorial stagger-item" style={{ '--item-index': 5 } as React.CSSProperties}>
                <div className="project-case-editorial-image">
                  <button type="button" className="project-case-media-button" data-cursor="view" onClick={() => setActiveMedia(secondaryImage)}>
                    <CaseMedia media={secondaryImage} alt="" />
                    <span className="project-case-media-hint">{t('projectCase.openLarge')}</span>
                  </button>
                </div>
                <div className="project-case-editorial-copy">
                  <span>{t('projectCase.visualDirection')}</span>
                  <p>{t('projectCase.visualDirectionBody')}</p>
                </div>
              </div>
            ) : null}

            <div className="project-case-gallery stagger-item" style={{ '--item-index': 6 } as React.CSSProperties}>
              {project.images.map((work, index) => (
                <figure key={work.slug} className={`project-case-gallery-item project-case-gallery-item--${index + 1}`}>
                  <button type="button" className="project-case-media-button" data-cursor="view" onClick={() => setActiveMedia(work)}>
                    <CaseMedia media={work} alt={t(`portfolioMedia.${work.slug}.title`, { defaultValue: work.title })} />
                    <span className="project-case-media-hint">{work.mediaKind === 'video' ? t('projectCase.openWithSound') : t('projectCase.openLarge')}</span>
                  </button>
                  <figcaption>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{t(`portfolioMedia.${work.slug}.title`, { defaultValue: work.title })}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>

            <nav className="project-case-nav stagger-item" style={{ '--item-index': 7 } as React.CSSProperties} aria-label={t('projectCase.navLabel')}>
              <Link to={`/works/${previousProject.slug}`} className="ghost-button" data-cursor="link">
                ← {previousProjectTitle}
              </Link>
              <Link to={`/works/${nextProject.slug}`} className="primary-button" data-cursor="link">
                {nextProjectTitle} →
              </Link>
            </nav>
          </div>
        </section>
      </div>
      <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
    </main>
  );
}
