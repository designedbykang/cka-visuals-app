'use client'

export default function PortfolioGridCard({ piece, onTap, index }) {
  return (
    <div
      onClick={() => onTap(piece)}
      style={{
        width: '100%',
        aspectRatio: '2/3',
        borderRadius: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        background: '#1A1A28',
        flexShrink: 0,
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform 0.2s ease, filter 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)'
        e.currentTarget.style.filter = 'brightness(1.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.filter = 'brightness(1)'
      }}
    >
      {piece.cover_image_url ? (
        <img
          src={piece.cover_image_url}
          alt={piece.title}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'block',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg,
            rgba(110,1,240,0.4) 0%,
            rgba(51,208,194,0.2) 100%)`,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '12px',
        }}>
          <span style={{
            color: 'rgba(243,243,243,0.4)',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}>
            {piece.title}
          </span>
        </div>
      )}
    </div>
  )
}
