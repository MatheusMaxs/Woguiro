import { useRef } from 'react';

import GrainOverlay from '@/components/GrainOverlay/GrainOverlay';
import { useHeroTimeline } from '@/hooks/useHeroTimeline';
import { useParallaxMouse } from '@/hooks/useSmoothMouse';
import type { HomeNavigate } from '@/types/home';

import HeroBackground from './HeroBackground';
import HeroClock from './HeroClock';
import HeroCTA from './HeroCTA';
import HeroDiscover from './HeroDiscover';
import HeroLanguageSelector from './HeroLanguageSelector';
import HeroNavbar from './HeroNavbar';
import HeroText from './HeroText';

interface HeroProps {
  onNavigate: HomeNavigate;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  useParallaxMouse(containerRef);

  useHeroTimeline(containerRef);

  return (
    <section ref={containerRef} className="hero" id="hero">
      <HeroBackground />
      <GrainOverlay />
      <div className="hero-content-group parallax-layer-text">
        <HeroText />
        <HeroCTA onNavigate={onNavigate} />
      </div>
      <HeroNavbar onNavigate={onNavigate} />
      <div className="hero-utilities parallax-layer-nav">
        <HeroClock />
        <HeroLanguageSelector />
        <HeroDiscover onNavigate={onNavigate} />
      </div>
    </section>
  );
}
