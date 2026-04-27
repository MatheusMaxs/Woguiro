import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import HeroLanguageSelector from '@/components/Hero/HeroLanguageSelector';

const compactLinks = [
  { label: 'nav.home', action: 'home' },
  {
    label: 'nav.portfolio',
    path: '/works',
    sublinks: [
      { label: 'nav.photography', targetId: 'featured-works' },
      { label: 'nav.videography', targetId: 'featured-works' },
      { label: 'works.viewAll', path: '/works' },
    ],
  },
  {
    label: 'nav.creator',
    targetId: 'about-section',
    sublinks: [
      { label: 'nav.about', targetId: 'about-section' },
      { label: 'nav.specs', targetId: 'about-specs' },
      { label: 'nav.connect', targetId: 'contact-section' },
    ],
  },
  {
    label: 'nav.expertise',
    targetId: 'featured-works',
    sublinks: [
      { label: 'nav.brands', targetId: 'featured-works' },
      { label: 'nav.artists', targetId: 'featured-works' },
    ],
  },
] as const;

export default function SiteNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    const updateVisibility = () => {
      const hero = document.getElementById('hero');
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 96 : window.innerHeight * 0.84;
      setIsVisible(window.scrollY >= threshold);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [isHome]);

  const scrollToHomeTarget = (targetId: string) => {
    const scroll = () => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scroll, 520);
      return;
    }

    scroll();
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runNavAction = (link: (typeof compactLinks)[number] | NonNullable<(typeof compactLinks)[number]['sublinks']>[number]) => {
    if ('action' in link && link.action === 'home') {
      handleLogoClick();
      return;
    }

    if ('path' in link) {
      navigate(link.path);
      return;
    }

    if ('targetId' in link) {
      scrollToHomeTarget(link.targetId);
    }
  };

  return (
    <nav className={`site-nav${isVisible ? ' is-visible' : ''}`} aria-label={t('nav.siteNavigation')}>
      <button type="button" className="site-nav-logo" data-cursor="link" aria-label={t('nav.homeLabel')} onClick={handleLogoClick}>
        WOGUIRO
      </button>

      <div className="site-nav-links">
        {compactLinks.map((link) => (
          <div key={link.label} className="site-nav-item">
            <button
              type="button"
              className={`site-nav-link${'path' in link && location.pathname === link.path ? ' is-active' : ''}`}
              data-cursor="link"
              onClick={() => runNavAction(link)}
            >
              {t(link.label)}
            </button>

            {'sublinks' in link ? (
              <div className="site-nav-dropdown">
                {link.sublinks.map((sublink) => (
                  <button
                    key={sublink.label}
                    type="button"
                    className="site-nav-dropdown-link"
                    data-cursor="link"
                    onClick={() => runNavAction(sublink)}
                  >
                    <span className="site-nav-dropdown-prefix" aria-hidden="true">
                      L.
                    </span>
                    <span>{t(sublink.label)}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="site-nav-language">
        <HeroLanguageSelector />
      </div>
    </nav>
  );
}
