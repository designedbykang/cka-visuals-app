'use client'

import PackageCard from './PackageCard'

export default function PackageSelector({ packages, selectedId, onSelect, onLongPress }) {
  if (!packages?.length) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{
        color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600',
        letterSpacing: '0.8px', textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif', margin: 0,
      }}>
        Choose a package
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {packages.map(pkg => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            selected={pkg.id === selectedId}
            onSelect={onSelect}
            onLongPress={onLongPress}
          />
        ))}
      </div>
    </div>
  )
}
