'use client'

export default function ServiceHero({ imageUrl, serviceName, height = '240px' }) {
  if (imageUrl) {
    return (
      <div style={{
        width: '100%',
        height,
        borderRadius: '16px',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={imageUrl}
          alt={serviceName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

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

