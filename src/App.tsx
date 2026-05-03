import { useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import faviconUrl from '../assets/images/favicon.svg';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import SiteNav from '@/components/SiteNav';
import HomePage from '@/pages/HomePage';
import WorkProjectPage from '@/pages/WorkProjectPage';
import WorksPage from '@/pages/WorksPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:projectSlug" element={<WorkProjectPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function RouteScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    const isProtectedMedia = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('img, video, canvas'));

    const handleContextMenu = (event: MouseEvent) => {
      if (isProtectedMedia(event.target)) {
        event.preventDefault();
      }
    };

    const handleDragStart = (event: DragEvent) => {
      if (isProtectedMedia(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}>
        <Helmet>
          <link rel="icon" type="image/svg+xml" href={faviconUrl} />
        </Helmet>
        <BrowserRouter>
          <RouteScrollRestoration />
          <SiteNav />
          <AnimatedRoutes />
        </BrowserRouter>
      </MotionConfig>
      <CustomCursor />
    </>
  );
}
