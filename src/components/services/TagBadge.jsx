'use client'

export default function TagBadge({ label }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: '20px',
      background: 'rgba(110,1,240,0.12)',
      border: '1px solid rgba(110,1,240,0.25)',
      color: '#9E56F5',
      fontSize: '11px',
      fontWeight: '500',
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.2px',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}
