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
        padding: '16px',
        borderRadius: '14px',
        background: selected
          ? 'rgba(110,1,240,0.12)'
          : 'var(--bg-card)',
        border: selected
          ? '1.5px solid rgba(110,1,240,0.6)'
          : '1px solid var(--bg-card-border)',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          color: 'var(--text-primary)',
          fontSize: '15px',
          fontWeight: '600',
          fontFamily: 'Inter, sans-serif',
        }}>
          {pkg.name}
        </span>
        <span style={{
          color: selected ? '#9E56F5' : 'var(--text-primary)',
          fontSize: '15px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
        }}>
          {price} <span style={{ fontSize: '11px', fontWeight: '500', opacity: 0.7 }}>{pkg.currency}</span>
        </span>
      </div>
      {pkg.description && (
        <span style={{
          color: 'var(--text-secondary)',
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

