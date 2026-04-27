import { useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import CustomCursor from '@/components/CustomCursor/CustomCursor';
import SiteNav from '@/components/SiteNav';
import HomePage from '@/pages/HomePage';
import WorksPage from '@/pages/WorksPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
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
  return (
    <>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}>
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
