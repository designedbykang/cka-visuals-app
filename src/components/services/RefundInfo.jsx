'use client'

export default function RefundInfo({ text = "You get an 80% Refund if you don't like all of the first 3 concepts we will present." }) {
  return (
    <p style={{
      color: 'rgba(243,243,243,0.4)',
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif',
      margin: 0,
      lineHeight: '1.6',
      letterSpacing: '0.2px',
      textAlign: 'center',
    }}>
      {text}
    </p>
  )
}
