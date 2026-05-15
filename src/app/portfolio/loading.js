const shimmer = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '400% 100%',
  animation: 'shimmer 1.6s ease-in-out infinite',
}

export default function PortfolioLoading() {
  // 6 placeholder cards in a 2-column, 2:3 aspect ratio grid
  const cards = Array.from({ length: 6 })

  return (
    <div style={{ minHeight: '100dvh', background: '#080809', position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        alignItems: 'start',
      }}>
        {cards.map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '2 / 3',
              ...shimmer,
            }}
          />
        ))}
      </div>
    </div>
  )
}
