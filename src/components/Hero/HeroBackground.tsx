import heroVideo from '../../../assets/images/Video-Glitch.mp4';

export default function HeroBackground() {
  return (
    <div className="hero-bg-image parallax-layer-bg" data-cursor="view">
      <video
        className="hero-bg-image-media"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
