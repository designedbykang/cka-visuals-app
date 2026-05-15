'use client'

import { useRouter } from 'next/navigation'

// Per-category gradient endpoints
const CATEGORY_GRADIENTS = {
  'Identity Creation':   { from: '#6E01F0', to: '#33D0C2' },
  'Print Coordination':  { from: '#6E01F0', to: '#E44FC6' },
  'Software Design':     { from: '#6E01F0', to: '#01F06E' },
  'Video Assistance':    { from: '#6E01F0', to: '#9E56F5' },
}

const DEFAULT_GRADIENT = { from: '#6E01F0', to: '#9E56F5' }

export default function ServiceBox({ service, categoryName, snapRef }) {
  const router = useRouter()
  const gradient = CATEGORY_GRADIENTS[categoryName] || DEFAULT_GRADIENT

  const lowestPrice = service.service_packages
    ?.map(p => p.price)
    .filter(p => typeof p === 'number' && p > 0)
    .sort((a, b) => a - b)[0] ?? null

  const currency = service.service_packages?.[0]?.currency || 'XAF'

  return (
    <div
      ref={snapRef}
      onClick={() => router.push(`/services/${service.id}`)}
      style={{
        width: '100%',
        height: '100%',
        flexShrink: 0,
        scrollSnapAlign: 'start',
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Top content zone — text */}
      <div style={{
        padding: '28px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: '0 0 auto',
        zIndex: 2,
      }}>

        {/* Service name */}
        <h2 style={{
          color: '#F3F3F3',
          fontSize: '32px',
          fontWeight: '800',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
          lineHeight: '1.15',
          letterSpacing: '-0.5px',
        }}>
          {service.name}
        </h2>

        {/* Description */}
        {service.tagline && (
          <p style={{
            color: 'rgba(243,243,243,0.8)',
            fontSize: '15px',
            fontWeight: '400',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            lineHeight: '1.6',
          }}>
            {service.tagline}
          </p>
        )}
      </div>

      {/* Brand strip — logo + price */}
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: '0 0 auto',
        zIndex: 2,
      }}>
        {/* CKA logo */}
        <img
          src="/logo.png"
          alt="CKA Visuals"
          style={{
            height: '28px',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'left center',
            pointerEvents: 'none',
            opacity: 0.9,
          }}
        />

        {/* Starting price */}
        {lowestPrice !== null && (
          <span style={{
            color: '#F3F3F3',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            background: 'rgba(0,0,0,0.2)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            from {lowestPrice.toLocaleString()} {currency}
          </span>
        )}
      </div>

      {/* Main image — bottom half */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {service.hero_image_url ? (
          <img
            src={service.hero_image_url}
            alt={service.name}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        ) : (
          // Placeholder geometric shapes when no image
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '0 0 0 40px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '260px',
              height: '260px',
              borderRadius: '32px',
              background: 'rgba(255,255,255,0.18)',
              transform: 'rotate(18deg) translate(40px, 60px)',
              flexShrink: 0,
            }} />
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.12)',
              transform: 'rotate(8deg) translate(-20px, 80px)',
              flexShrink: 0,
              position: 'absolute',
              right: '-20px',
              bottom: '-20px',
            }} />
          </div>
        )}
      </div>
    </div>
  )
}
