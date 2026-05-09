'use client'

export default function PackageCard({ pkg, selected, onSelect }) {
  const price = typeof pkg.price === 'number'
    ? pkg.price.toLocaleString()
    : pkg.price

  return (
    <button
      onClick={() => onSelect(pkg)}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '16px 18px',
        borderRadius: '16px',
        background: selected
          ? 'rgba(255,31,184,0.09)'
          : 'rgba(255,255,255,0.04)',
        border: selected
          ? '1.5px solid rgba(255,31,184,0.45)'
          : '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {selected && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FF1FB8, #9E56F5)',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <span style={{
          color: '#F3F3F3',
          fontSize: '15px',
          fontWeight: '600',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.1px',
        }}>
          {pkg.name}
        </span>
        <span style={{
          color: selected ? '#C8FF00' : 'rgba(243,243,243,0.65)',
          fontSize: '15px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          flexShrink: 0,
          letterSpacing: '-0.2px',
        }}>
          {price}{' '}
          <span style={{ fontSize: '11px', fontWeight: '500', opacity: 0.6 }}>{pkg.currency}</span>
        </span>
      </div>

      {pkg.description && (
        <span style={{
          color: 'rgba(243,243,243,0.38)',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.5',
        }}>
          {pkg.description}
        </span>
      )}
    </button>
  )
}
