'use client'

export default function DetailFacts({ facts }) {
  if (!facts || facts.length === 0) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
    }}>
      {facts.map((fact, i) => (
        <div
          key={i}
          style={{
            background: '#111118',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{
            color: 'rgba(243,243,243,0.45)',
            fontSize: '10px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
          }}>
            {fact.label}
          </span>
          <span style={{
            color: '#F3F3F3',
            fontSize: '17px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.3px',
          }}>
            {fact.value}
          </span>
        </div>
      ))}
    </div>
  )
}
