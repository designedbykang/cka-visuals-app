'use client'

export default function ServiceTitle({ title, subtitle }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <h1 style={{
        color: '#F3F3F3',
        fontSize: '28px',
        fontWeight: '800',
        fontFamily: 'Inter, sans-serif',
        margin: 0,
        letterSpacing: '-0.5px',
        lineHeight: '1.2',
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          color: 'rgba(243,243,243,0.5)',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
          lineHeight: '1.6',
          letterSpacing: '0.2px',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
