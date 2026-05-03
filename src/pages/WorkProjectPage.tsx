import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { WORK_PROJECTS, type ProjectMedia, type WorkProject } from '@/data/workProjects';

const revealItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

function CaseMedia({ media, alt, controls = false }: { media: ProjectMedia; alt: string; controls?: boolean }) {
  const style = media.objectPosition ? { objectPosition: media.objectPosition } : undefined;

  if (media.mediaKind === 'video') {
    return (
      <video
        src={media.src}
        poster={media.poster}
        muted={!controls}
        loop={!controls}
        playsInline
        autoPlay={!controls}
        controls={controls}
        preload="metadata"
        draggable={false}
        style={style}
      />
    );
  }

  return <img src={media.src} alt={alt} loading="lazy" draggable={false} style={style} />;
}

function ProjectNotFound() {
  const { i18n } = useTranslation();

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
        <title>Woguiro - Projeto nao encontrado</title>
      </Helmet>

      <div className="home-sections">
        <section className="home-section">
          <div className="section-shell project-case-shell">
            <div className="project-case-empty">
              <p className="section-kicker">Projeto indisponivel</p>
              <h1 className="section-title section-title--works">Este case nao existe no arquivo.</h1>
              <Link to="/works" className="ghost-button" data-cursor="link">
                Voltar aos trabalhos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}

function ProjectMeta({ project }: { project: WorkProject }) {
  const metaItems = [
    ['Categoria', project.category],
    ['Data', project.date],
    ['Cliente', project.client],
    ['Local', project.location],
  ];

  return (
    <div className="project-case-meta-grid">
      {metaItems.map(([label, value]) => (
        <div key={label} className="project-case-meta-card">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function WorkProjectPage() {
  const { projectSlug } = useParams();
  const { i18n } = useTranslation();
  const projectIndex = WORK_PROJECTS.findIndex((item) => item.slug === projectSlug);
  const project = projectIndex >= 0 ? WORK_PROJECTS[projectIndex] : undefined;

  if (!project) {
    return <ProjectNotFound />;
  }

  const previousProject = WORK_PROJECTS[(projectIndex - 1 + WORK_PROJECTS.length) % WORK_PROJECTS.length];
  const nextProject = WORK_PROJECTS[(projectIndex + 1) % WORK_PROJECTS.length];
  const secondaryImage = project.images.find((item) => item.slug !== project.hero.slug && item.src !== project.hero.src);

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
        <title>{`Woguiro - ${project.title}`}</title>
        <meta name="description" content={project.description} />
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
              CASE
            </div>

            <motion.div className="section-meta-row" variants={revealItem}>
              <span>Case study</span>
              <span>{project.category}</span>
              <span>{project.date}</span>
            </motion.div>

            <motion.div className="project-case-topbar" variants={revealItem}>
              <Link to="/works" className="ghost-button" data-cursor="link">
                Voltar aos trabalhos
              </Link>
              <span>{project.images.length} midias no projeto</span>
            </motion.div>

            <motion.div className="project-case-hero" variants={revealItem}>
              <CaseMedia media={project.hero} alt={project.title} />
              <div className="project-case-hero-copy">
                <p>{project.category}</p>
                <h1>{project.title}</h1>
                <span>{project.subtitle}</span>
              </div>
            </motion.div>

            <motion.div variants={revealItem}>
              <ProjectMeta project={project} />
            </motion.div>

            <motion.div className="project-case-story-grid" variants={revealItem}>
              <div className="project-case-story-copy">
                <p className="section-kicker">Descricao do projeto</p>
                <h2>{project.subtitle}</h2>
                <p>{project.description}</p>
                <p>{project.story}</p>
              </div>

              <div className="project-case-highlights-panel">
                <span>Destaques</span>
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {secondaryImage ? (
              <motion.div className="project-case-editorial" variants={revealItem}>
                <div className="project-case-editorial-image">
                  <CaseMedia media={secondaryImage} alt="" />
                </div>
                <div className="project-case-editorial-copy">
                  <span>Direcao visual</span>
                  <p>
                    A selecao organiza o projeto como narrativa: primeiro impacto, contexto, detalhe e ritmo. Cada imagem foi tratada como parte do mesmo
                    sistema visual, sem perder o caracter individual de cada frame.
                  </p>
                </div>
              </motion.div>
            ) : null}

            <motion.div className="project-case-gallery" variants={revealItem}>
              {project.images.map((work, index) => (
                <figure key={work.slug} className={`project-case-gallery-item project-case-gallery-item--${index + 1}`}>
                  <CaseMedia media={work} alt={work.title} controls={work.mediaKind === 'video'} />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{work.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </motion.div>

            <motion.nav className="project-case-nav" variants={revealItem} aria-label="Navegacao entre projetos">
              <Link to={`/works/${previousProject.slug}`} className="ghost-button" data-cursor="link">
                ← {previousProject.title}
              </Link>
              <Link to={`/works/${nextProject.slug}`} className="primary-button" data-cursor="link">
                {nextProject.title} →
              </Link>
            </motion.nav>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
