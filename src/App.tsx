import { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import faviconUrl from '../assets/images/favicon.svg';
import SiteNav from '@/components/SiteNav';

const HomePage = lazy(() => import('@/pages/HomePage'));
const WorksPage = lazy(() => import('@/pages/WorksPage'));
const WorkProjectPage = lazy(() => import('@/pages/WorkProjectPage'));
const CustomCursor = lazy(() => import('@/components/CustomCursor/CustomCursor'));

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
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={faviconUrl} />
      </Helmet>
      <BrowserRouter>
        <RouteScrollRestoration />
        <SiteNav />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/:projectSlug" element={<WorkProjectPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
    </>
  );
}
