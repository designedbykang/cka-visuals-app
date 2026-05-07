'use client'

export default function AvailabilityToggle({ available }) {
  if (available === null || available === undefined) return null

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: available ? '#25D366' : 'rgba(243,243,243,0.3)',
        flexShrink: 0,
      }} />
      <span style={{
        color: available ? '#25D366' : 'rgba(243,243,243,0.4)',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        background: available ? 'rgba(37,211,102,0.1)' : 'rgba(255,255,255,0.06)',
        padding: '3px 10px 3px 4px',
        borderRadius: '20px',
      }}>
        {available ? 'Available now' : 'Not available'}
      </span>
    </div>
  )
}
