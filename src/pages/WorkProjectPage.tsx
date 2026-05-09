import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { WORK_PROJECTS, type ProjectMedia, type WorkProject } from '@/data/workProjects';

const revealItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

function CaseMedia({
  media,
  alt,
  controls = false,
  autoPlay = !controls,
}: {
  media: ProjectMedia;
  alt: string;
  controls?: boolean;
  autoPlay?: boolean;
}) {
  const style = media.objectPosition ? { objectPosition: media.objectPosition } : undefined;

  if (media.mediaKind === 'video') {
    return (
      <video
        src={media.src}
        poster={media.poster}
        muted={!controls}
        loop={!controls}
        playsInline
        autoPlay={autoPlay}
        controls={controls}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        preload={controls ? 'auto' : 'metadata'}
        draggable={false}
        style={style}
      />
    );
  }

  return <img src={media.src} alt={alt} loading="lazy" draggable={false} style={style} />;
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

  return (
    <motion.div
      className="media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={mediaTitle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      <button type="button" className="media-lightbox-backdrop" aria-label={t('projectCase.closeMedia')} onClick={onClose} />
      <motion.div
        className="media-lightbox-panel"
        initial={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 18, scale: 0.98, filter: 'blur(6px)' }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.div>
    </motion.div>
  );
}

function ProjectNotFound() {
  const { t, i18n } = useTranslation();

  return (
    <motion.main
      className="home-page works-page project-case-page"
      id="main-content"
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, filter: 'blur(8px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} />
        <title>{t('projectCase.notFoundTitle')}</title>
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
    </motion.main>
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
    <motion.main
      className="home-page works-page project-case-page"
      id="main-content"
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, filter: 'blur(8px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} />
        <title>{`Woguiro - ${projectTitle}`}</title>
        <meta name="description" content={projectDescription} />
      </Helmet>

      <div className="home-sections">
        <motion.section
          className="home-section project-case-section"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
        >
          <div className="section-shell project-case-shell" data-project-slug={project.slug}>
            <div className="section-ghost" aria-hidden="true">
              {t('projectCase.ghost')}
            </div>

            <motion.div className="section-meta-row" variants={revealItem}>
              <span>{t('projectCase.caseStudy')}</span>
              <span>{projectCategory}</span>
              <span>{projectDate}</span>
            </motion.div>

            <motion.div className="project-case-topbar" variants={revealItem}>
              <Link to="/works" className="ghost-button" data-cursor="link">
                {t('projectCase.backToWorks')}
              </Link>
              <span>{t('projectCase.mediaCount', { count: project.images.length })}</span>
            </motion.div>

            <motion.div className="project-case-hero" variants={revealItem}>
              <button type="button" className="project-case-media-button" data-cursor="view" onClick={() => setActiveMedia(project.hero)}>
                <CaseMedia media={project.hero} alt={projectTitle} />
                <span className="project-case-media-hint">{t('projectCase.openLarge')}</span>
              </button>
              <div className="project-case-hero-copy">
                <p>{projectCategory}</p>
                <h1>{projectTitle}</h1>
                <span>{projectSubtitle}</span>
              </div>
            </motion.div>

            <motion.div variants={revealItem}>
              <ProjectMeta project={project} />
            </motion.div>

            <motion.div className="project-case-story-grid" variants={revealItem}>
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
            </motion.div>

            {secondaryImage ? (
              <motion.div className="project-case-editorial" variants={revealItem}>
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
              </motion.div>
            ) : null}

            <motion.div className="project-case-gallery" variants={revealItem}>
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
            </motion.div>

            <motion.nav className="project-case-nav" variants={revealItem} aria-label={t('projectCase.navLabel')}>
              <Link to={`/works/${previousProject.slug}`} className="ghost-button" data-cursor="link">
                ← {previousProjectTitle}
              </Link>
              <Link to={`/works/${nextProject.slug}`} className="primary-button" data-cursor="link">
                {nextProjectTitle} →
              </Link>
            </motion.nav>
          </div>
        </motion.section>
      </div>
      <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
    </motion.main>
  );
}
