import heroPoster from '../../../assets/images/hero-poster.webp';
import heroVideo from '../../../assets/images/arte woguiro animado v1.mp4';

export default function HeroBackground() {
  return (
    <div className="hero-bg-image parallax-layer-bg" data-cursor="view">
      <video
        className="hero-bg-image-media"
        poster={heroPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-image-shield" aria-hidden="true" />
    </div>
  );
}
