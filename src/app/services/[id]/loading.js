const shimmer = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '400% 100%',
  animation: 'shimmer 1.6s ease-in-out infinite',
  borderRadius: '6px',
}

export default function ServiceDetailLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column' }}>
      {/* Purple header band */}
      <div style={{ background: '#6E01F0', padding: '52px 20px 16px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', position: 'absolute', left: '20px' }} />
        <div style={{ width: '160px', height: '22px', margin: '0 auto', ...shimmer }} />
      </div>

      {/* Hero image zone */}
      <div style={{ width: '100%', height: '38vh', background: 'rgba(110,1,240,0.15)', flexShrink: 0 }} />

      {/* Content */}
      <div style={{ flex: 1, padding: '28px 24px 0' }}>
        {/* Tagline */}
        <div style={{ width: '75%', height: '22px', margin: '0 auto 6px', ...shimmer }} />
        <div style={{ width: '55%', height: '22px', margin: '0 auto 28px', ...shimmer }} />

        {/* Package boxes */}
        {[1, 2].map(i => (
          <div key={i} style={{
            borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.08)',
            padding: '20px', marginTop: '28px', position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: '-14px', left: '16px', width: '60px', height: '24px', borderRadius: '12px', ...shimmer }} />
            <div style={{ width: '55%', height: '28px', marginBottom: '8px', ...shimmer }} />
            <div style={{ width: '40%', height: '13px', marginBottom: '6px', ...shimmer }} />
            <div style={{ width: '35%', height: '12px', ...shimmer }} />
          </div>
        ))}

        {/* Button */}
        <div style={{ width: '100%', height: '56px', borderRadius: '16px', marginTop: '28px', ...shimmer }} />
      </div>
    </div>
  )
}
