'use client'

import { useRouter } from 'next/navigation'

export default function ServiceCard({ service }) {
  const router = useRouter()

  const description = service.tagline || service.description || 'A focused CKA Visuals service built around clarity, craft, and a strong visual system.'

  return (
    <article
      onClick={() => router.push(`/services/${service.id}`)}
      style={{
        position: 'relative',
        flex: '0 0 100%',
        minHeight: '100%',
        scrollSnapAlign: 'start',
        borderRadius: '28px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: `
          radial-gradient(circle at 78% 10%, rgba(228,79,198,0.42) 0%, rgba(228,79,198,0) 30%),
          radial-gradient(circle at 10% 78%, rgba(1,240,110,0.82) 0%, rgba(1,240,110,0) 36%),
          linear-gradient(155deg, #8500FF 0%, #6E01F0 31%, #5A7CFF 58%, #00DFA4 100%)
        `,
        border: '1px solid rgba(243,243,243,0.14)',
        boxShadow: '0 18px 60px rgba(110,1,240,0.28)',
        display: 'grid',
        gridTemplateRows: 'minmax(0, 0.62fr) minmax(0, 0.38fr)',
        gap: 'clamp(18px, 3vw, 34px)',
        padding: 'clamp(28px, 7vw, 58px) clamp(26px, 7vw, 68px)',
        isolation: 'isolate',
      }}
      aria-label={`Open ${service.name}`}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 45%)',
        pointerEvents: 'none',
        zIndex: -1,
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 'clamp(18px, 4vw, 42px)',
        minHeight: 0,
        maxWidth: 'min(94%, 820px)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px, 4vw, 38px)' }}>
          <h2 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(34px, 6.5vw, 78px)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.04',
            letterSpacing: '0',
            margin: 0,
            maxWidth: '900px',
          }}>
            {service.name}
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.84)',
            fontSize: 'clamp(18px, 3.5vw, 36px)',
            fontWeight: '400',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.42',
            letterSpacing: '0',
            margin: 0,
            maxWidth: '850px',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {description}
          </p>
        </div>

        <img
          src="/logo.png"
          alt="CKA Visuals"
          style={{
            width: 'clamp(92px, 18vw, 160px)',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'left center',
            opacity: 0.95,
          }}
        />
      </div>

      <div style={{
        position: 'relative',
        minHeight: 0,
        margin: '0 calc(clamp(26px, 7vw, 68px) * -1) calc(clamp(28px, 7vw, 58px) * -1)',
        overflow: 'hidden',
        borderRadius: '0 0 28px 28px',
      }}>
        {service.hero_image_url ? (
          <img
            src={service.hero_image_url}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.9,
            }}
          />
        ) : (
          <>
            <div style={{
              position: 'absolute',
              right: '-12%',
              top: '2%',
              width: '58%',
              aspectRatio: '0.72',
              borderRadius: '24px',
              background: '#FFFFFF',
              transform: 'rotate(-29deg)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
            }} />
            <div style={{
              position: 'absolute',
              left: '10%',
              bottom: '-24%',
              width: '26%',
              aspectRatio: '0.72',
              borderRadius: '18px',
              background: '#FFFFFF',
              transform: 'rotate(-29deg)',
              boxShadow: '0 18px 60px rgba(0,0,0,0.14)',
            }} />
          </>
        )}
      </div>
    </article>
  )
}
