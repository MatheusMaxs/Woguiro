import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PROJECT_FILTERS, WORK_PROJECTS, type ProjectFilter, type WorkProject } from '@/data/workProjects';

const revealItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

function ProjectMosaic({ project }: { project: WorkProject }) {
  return (
    <div className="works-project-mosaic" aria-hidden="true">
      {project.images.slice(0, 5).map((work, index) => (
        <span key={work.slug} className={`works-project-mosaic-item works-project-mosaic-item--${index + 1}`}>
          <img
            src={work.image}
            alt=""
            loading="lazy"
            draggable={false}
            style={work.objectPosition ? { objectPosition: work.objectPosition } : undefined}
          />
          <span className="works-project-image-overlay">
            <span>{work.title}</span>
            <span>{project.category}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: WorkProject; index: number }) {
  return (
    <motion.article
      className="works-project-card"
      variants={revealItem}
      transition={{ duration: 0.42, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/works/${project.slug}`}
        className="works-project-hit-area"
        aria-label={`Abrir projeto ${project.title}`}
        data-cursor="view"
      />

      <div className="works-project-copy">
        <div className="works-project-meta-row">
          <span>{project.date}</span>
          <span>{project.category}</span>
        </div>

        <h2 className="works-project-title">{project.title}</h2>
        <p className="works-project-description">{project.description}</p>

        <ul className="works-project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <span className="pill-button works-project-cta" aria-hidden="true">
          Abrir projeto
        </span>
      </div>

      <ProjectMosaic project={project} />
    </motion.article>
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
    <motion.main
      className="home-page works-page"
      id="main-content"
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, filter: 'blur(8px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      <Helmet>
        <html lang={i18n.resolvedLanguage ?? 'en'} />
        <title>Woguiro - Works</title>
        <meta name="description" content={t('works.description')} />
      </Helmet>

      <div className="home-sections">
        <motion.section
          className="home-section works-page-section"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.14 } } }}
        >
          <div className="section-shell works-shell works-projects-shell">
            <div className="section-ghost" aria-hidden="true">
              {t('works.ghost')}
            </div>

            <motion.div className="section-meta-row" variants={revealItem}>
              <span>{t('works.viewAll')}</span>
              <span>{t('works.meta')}</span>
              <span>{`${filteredProjects.length} projetos`}</span>
            </motion.div>

            <motion.div className="works-heading-grid" variants={revealItem}>
              <div className="section-heading-block">
                <p className="section-kicker">Portfolio completo</p>
                <h1 className="section-title section-title--works">Projetos agrupados, sem carrossel.</h1>
                <p className="section-body">
                  Cada bloco reune uma serie com galeria propria, descricao breve e pelo menos tres destaques de direcao visual.
                </p>
              </div>

              <div className="works-filter-column">
                <div className="works-filter-row" role="toolbar" aria-label="Filtros de projeto">
                  {PROJECT_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      className={`filter-chip${activeFilter === filter.id ? ' is-active' : ''}`}
                      aria-pressed={activeFilter === filter.id}
                      data-cursor="link"
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <Link to="/" className="ghost-button" data-cursor="link">
                  {t('nav.portfolio')}
                </Link>
              </div>
            </motion.div>

            <motion.div className="works-project-list" variants={revealItem}>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)
              ) : (
                <div className="works-project-empty">
                  <span>Arquivo em preparacao</span>
                  <p>Este filtro ainda nao tem um projeto publicado. Volta em Todos para ver a selecao completa.</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
