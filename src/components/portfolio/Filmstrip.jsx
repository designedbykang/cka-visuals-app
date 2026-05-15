'use client'

import { usePortfolioContext } from '@/context/PortfolioContext'

export default function Filmstrip({ images }) {
  const { filmstripOpen, activeImageIndex, setActiveImageIndex } = usePortfolioContext()

  if (!filmstripOpen || !images.length) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '90px',
      background: 'rgba(18,15,15,0.88)',
      backdropFilter: 'blur(12px)',
      zIndex: 38,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '0 20px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      animation: 'slideUp 0.25s ease',
    }}>
      {images.map((img, i) => (
        <button
          key={img.id}
          onClick={() => setActiveImageIndex(i)}
          style={{
            width: '56px',
            height: '72px',
            borderRadius: '6px',
            overflow: 'hidden',
            flexShrink: 0,
            border: i === activeImageIndex
              ? '2px solid #61DE2C'
              : '2px solid transparent',
            padding: 0,
            cursor: 'pointer',
            background: '#1A1A28',
            transition: 'border-color 0.15s ease',
            WebkitTapHighlightColor: 'transparent',
          }}
          aria-label={`Image ${i + 1} of ${images.length}`}
          aria-pressed={i === activeImageIndex}
        >
          <img
            src={img.image_url}
            alt={img.alt_text || `Image ${i + 1}`}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        </button>
      ))}
    </div>
  )
}
