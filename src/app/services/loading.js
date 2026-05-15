const shimmer = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '400% 100%',
  animation: 'shimmer 1.6s ease-in-out infinite',
  borderRadius: '6px',
}

export default function ServicesLoading() {
  return (
    <div style={{ height: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Sticky header skeleton */}
      <div style={{ flexShrink: 0 }}>
        {/* Back + CategoryBand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '56px 20px 12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '38px', borderRadius: '10px', ...shimmer }} />
        </div>
        {/* Category title */}
        <div style={{ padding: '0 20px 8px' }}>
          <div style={{ width: '180px', height: '13px', ...shimmer }} />
        </div>
        {/* Tag pills */}
        <div style={{ display: 'flex', gap: '8px', padding: '8px 16px 12px', overflowX: 'hidden' }}>
          {[60, 80, 90, 70, 85].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: '36px', borderRadius: '18px', flexShrink: 0, ...shimmer }} />
          ))}
        </div>
      </div>

      {/* Snap card skeleton */}
      <div style={{
        flex: 1,
        margin: '12px 16px',
        borderRadius: '20px',
        background: 'linear-gradient(160deg, rgba(110,1,240,0.25) 0%, rgba(51,208,194,0.15) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Service name */}
        <div style={{ position: 'absolute', top: '28px', left: '24px', right: '24px' }}>
          <div style={{ width: '65%', height: '32px', marginBottom: '10px', ...shimmer }} />
          <div style={{ width: '45%', height: '15px', ...shimmer }} />
        </div>
        {/* Price badge */}
        <div style={{ position: 'absolute', bottom: '24px', right: '20px', width: '110px', height: '28px', borderRadius: '14px', ...shimmer }} />
        {/* Logo placeholder */}
        <div style={{ position: 'absolute', bottom: '24px', left: '20px', width: '60px', height: '20px', ...shimmer }} />
      </div>
    </div>
  )
}
