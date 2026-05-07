'use client'

import { useState, useEffect } from 'react'

function HeroPlaceholder({ serviceName, height }) {
  return (
    <div style={{
      width: '100%',
      height,
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(110,1,240,0.3) 0%, rgba(158,86,245,0.15) 50%, rgba(228,79,198,0.2) 100%)',
      border: '1px solid rgba(110,1,240,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: '60%',
        height: '60%',
        borderRadius: '50%',
        background: 'rgba(110,1,240,0.2)',
        filter: 'blur(40px)',
      }} />
      <span style={{
        color: 'rgba(243,243,243,0.3)',
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        letterSpacing: '0.5px',
        position: 'relative',
        zIndex: 1,
      }}>
        {serviceName}
      </span>
    </div>
  )
}

// variant="carousel" — auto-advancing slideshow with dot nav
// variant="static"   — single image (default)
export default function ServiceHero({ service, imageUrl, serviceName, height = '240px', variant = 'static' }) {
  const images = service?.hero_images?.length
    ? service.hero_images
    : service?.hero_image_url
      ? [service.hero_image_url]
      : imageUrl
        ? [imageUrl]
        : []

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (variant !== 'carousel' || images.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [variant, images.length])

  if (variant === 'carousel') {
    const src = images[activeIndex]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          {src ? (
            <img
              src={src}
              alt={serviceName || service?.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <HeroPlaceholder serviceName={serviceName || service?.name} height="220px" />
          )}
        </div>
        {images.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === activeIndex ? '#C8FF00' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // static variant
  const src = images[0] || imageUrl
  if (!src) return <HeroPlaceholder serviceName={serviceName || service?.name} height={height} />

  return (
    <div style={{ width: '100%', height, borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
      <img
        src={src}
        alt={serviceName || service?.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}
