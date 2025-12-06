import { useEffect, useRef, useState } from 'react';
import '../styles/ImageCarousel.css';

type ImageCarouselProps = {
  images: string[];
  altTexts?: string[];
  className?: string;
};

const ImageCarousel = ({
  images,
  altTexts = [],
  className = '',
}: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);

  const total = images.length;

  const goPrev = () => setIndex(prev => (prev - 1 + total) % total);
  const goNext = () => setIndex(prev => (prev + 1) % total);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [total]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startXRef.current === null) return;
    const delta = e.clientX - startXRef.current;
    // Swipe threshold
    if (delta > 40) {
      goPrev();
    } else if (delta < -40) {
      goNext();
    }
    startXRef.current = null;
  };

  const currentAlt = altTexts[index] ?? `Slide ${index + 1}`;

  return (
    <div
      className={`carousel ${className}`}
      ref={containerRef}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      role="region"
      aria-label="Menu image carousel"
    >
      <button
        className="carousel-btn prev"
        onClick={goPrev}
        aria-label="Previous image"
      >
        ‹
      </button>

      <img src={images[index]} alt={currentAlt} className="carousel-image" />

      <button
        className="carousel-btn next"
        onClick={goNext}
        aria-label="Next image"
      >
        ›
      </button>

      <div className="carousel-indicator" aria-live="polite">
        {index + 1} / {total}
      </div>
    </div>
  );
};

export default ImageCarousel;
