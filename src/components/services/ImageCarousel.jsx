'use client'

import { useState, useEffect } from 'react'

export default function ImageCarousel({ images = [], serviceName = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const displayImages = images.length > 0 ? images : [{ url: 'https://via.placeholder.com/500x500?text=' + serviceName }]

  useEffect(() => {
    if (displayImages.length === 0) return

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length)
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentIndex, displayImages.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      overflow: 'hidden',
    }}>
      {displayImages.map((img, idx) => (
        <img
          key={idx}
          src={img.url || img}
          alt={`${serviceName} slide ${idx + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: idx === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      ))}

      {displayImages.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 5,
        }}>
          {displayImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: idx === currentIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
