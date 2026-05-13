import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { WorkFilter } from '@/data/homeContent';
import type { HomeNavigate } from '@/types/home';

interface HeroNavLink {
  label: string;
  targetId: string;
  filter?: WorkFilter;
  expandArchive?: boolean;
  expandAbout?: boolean;
}

interface HeroNavColumn {
  title: string;
  links: HeroNavLink[];
}

const navColumns: HeroNavColumn[] = [
  {
    title: 'nav.portfolio',
    links: [
      { label: 'nav.photography', targetId: 'featured-works', filter: 'photography' },
      { label: 'nav.videography', targetId: 'featured-works', filter: 'videography' },
    ],
  },
  {
    title: 'nav.creator',
    links: [
      { label: 'nav.about', targetId: 'about-section' },
      { label: 'nav.specs', targetId: 'about-specs', expandAbout: true },
      { label: 'nav.connect', targetId: 'contact-section' },
    ],
  },
  {
    title: 'nav.expertise',
    links: [
      { label: 'nav.brands', targetId: 'featured-works', filter: 'brands', expandArchive: true },
      { label: 'nav.artists', targetId: 'featured-works', filter: 'artists', expandArchive: true },
    ],
  },
];

interface HeroNavbarProps {
  onNavigate: HomeNavigate;
}

export default function HeroNavbar({ onNavigate }: HeroNavbarProps) {
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openColumn, setOpenColumn] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenColumn(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenColumn(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('is-scroll-locked');
    } else {
      document.body.classList.remove('is-scroll-locked');
    }
  }, [mobileOpen]);

  function handleNavigate(link: HeroNavLink) {
    setOpenColumn(null);
    setMobileOpen(false);
    onNavigate({
      targetId: link.targetId,
      filter: link.filter,
      expandArchive: link.expandArchive,
      expandAbout: link.expandAbout,
    });
  }

  return (
    <nav ref={navRef} className="hero-navbar parallax-layer-nav" aria-label={t('nav.heroNavigation')}>
      <button
        type="button"
        className={`hero-hamburger${mobileOpen ? ' is-open' : ''}`}
        aria-label={t('nav.siteNavigation')}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="hero-hamburger-line" />
        <span className="hero-hamburger-line" />
      </button>

      {navColumns.map((column, index) => {
        const panelId = `hero-nav-panel-${index}`;
        const isOpen = openColumn === index;

        return (
        <div key={column.title} className={`nav-column${isOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="nav-column-title nav-column-trigger"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setOpenColumn((current) => (current === index ? null : index))}
          >
            {t(column.title)}
          </button>
          <ul id={panelId} className="nav-column-links">
            {column.links.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  className="nav-link"
                  data-cursor="link"
                  onClick={() => handleNavigate(link)}
                >
                  <span className="nav-link-prefix" aria-hidden="true">
                    L.
                  </span>
                  <span>{t(link.label)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )})}

      <div ref={menuRef} className={`hero-mobile-menu${mobileOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label={t('nav.siteNavigation')}>
        <div className="hero-mobile-menu-panel">
          {navColumns.map((column) => (
            <div key={column.title} className="hero-mobile-group">
              <span className="hero-mobile-group-title">{t(column.title)}</span>
              {column.links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="hero-mobile-link"
                  data-cursor="link"
                  onClick={() => handleNavigate(link)}
                >
                  <span className="nav-link-prefix" aria-hidden="true">L.</span>
                  <span>{t(link.label)}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
