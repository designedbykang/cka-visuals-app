'use client'

import { useServicesContext } from '@/context/ServicesContext'

export default function ServiceCard({ service }) {
  const { openSlideup } = useServicesContext()

  const prices = service.service_packages?.map(p => p.price).filter(p => typeof p === 'number' && p > 0) || []
  const lowestPrice = prices.length ? Math.min(...prices) : null
  const currency = service.service_packages?.[0]?.currency || 'XAF'

  return (
    <div
      onClick={() => openSlideup(service.id)}
      style={{
        borderRadius: '20px',
        background: '#0D0D10',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, transform 0.15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,31,184,0.3)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Illustration area */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, rgba(110,1,240,0.22) 0%, rgba(228,79,198,0.12) 50%, rgba(0,0,0,0) 100%)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {service.hero_image_url ? (
          <img
            src={service.hero_image_url}
            alt={service.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.06)',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
            }}>
              CKA
            </span>
          </div>
        )}
      </div>

      {/* Info section */}
      <div style={{ padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h3 style={{
            color: '#F3F3F3',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            letterSpacing: '-0.2px',
          }}>
            {service.name}
          </h3>
          {service.tagline && (
            <p style={{
              color: 'rgba(243,243,243,0.4)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              lineHeight: '1.5',
            }}>
              {service.tagline}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          {lowestPrice !== null ? (
            <span style={{
              color: '#C8FF00',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.1px',
            }}>
              from {lowestPrice.toLocaleString()} {currency}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={e => { e.stopPropagation(); openSlideup(service.id) }}
            style={{
              padding: '8px 20px',
              borderRadius: '10px',
              background: '#FF1FB8',
              border: 'none',
              color: '#0D0D10',
              fontSize: '13px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              flexShrink: 0,
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  )
}
