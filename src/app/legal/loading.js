const shimmer = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '400% 100%',
  animation: 'shimmer 1.6s ease-in-out infinite',
  borderRadius: '6px',
}

export default function LegalLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#6E01F0', padding: '52px 20px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ width: '48px', height: '20px', ...shimmer }} />
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', background: '#0D0D10', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {['Terms', 'Privacy', 'Refund'].map((label, i) => (
          <div key={label} style={{
            flex: 1, height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderBottom: i === 0 ? '2px solid #6E01F0' : '2px solid transparent',
          }}>
            <div style={{ width: '48px', height: '14px', opacity: i === 0 ? 0.6 : 0.25, ...shimmer }} />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div style={{ flex: 1, padding: '28px 20px' }}>
        <div style={{ width: '60%', height: '28px', marginBottom: '10px', ...shimmer }} />
        <div style={{ width: '40%', height: '12px', marginBottom: '28px', opacity: 0.5, ...shimmer }} />
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }} />
        {[1, 0.9, 0.95, 0.7, 0.85, 0.6].map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: '15px', marginBottom: '14px', ...shimmer }} />
        ))}
        <div style={{ width: '55%', height: '19px', margin: '28px 0 10px', ...shimmer }} />
        {[0.88, 0.92, 0.75].map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: '15px', marginBottom: '14px', ...shimmer }} />
        ))}
      </div>
    </div>
  )
}
