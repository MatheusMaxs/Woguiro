import { AnimatePresence } from 'framer-motion';
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

export default function App() {
  return (
    <>
      <BrowserRouter>
        <SiteNav />
        <AnimatedRoutes />
      </BrowserRouter>
      <CustomCursor />
    </>
  );
}
