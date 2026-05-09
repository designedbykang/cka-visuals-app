'use client'

import PackageBox from './PackageBox'

export default function PackageList({ packages, selectedId, onSelect, isAdmin, onLongPress }) {
  if (!packages || packages.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{
        color: 'rgba(243,243,243,0.5)',
        fontSize: '11px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        margin: 0,
      }}>
        Choose a package
      </p>
      {packages.map(pkg => (
        <PackageBox
          key={pkg.id}
          pkg={pkg}
          selected={pkg.id === selectedId}
          onSelect={onSelect}
          isAdmin={isAdmin}
          onLongPress={onLongPress}
        />
      ))}
    </div>
  )
}
