'use client'

export default function ServiceDescription({ text, maxLines = null }) {
  return (
    <p style={{
      color: 'rgba(243,243,243,0.65)',
      fontSize: '15px',
      fontFamily: 'Inter, sans-serif',
      margin: 0,
      lineHeight: '1.7',
      letterSpacing: '0.2px',
      ...(maxLines && {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }),
    }}>
      {text}
    </p>
  )
}
