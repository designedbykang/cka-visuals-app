'use client'

import { usePortfolioContext } from '@/context/PortfolioContext'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home',      path: '/' },
  { label: 'Services',  path: '/services' },
  { label: 'Content',   path: '/content' },
  { label: 'Portfolio', path: '/portfolio' },
]

export default function MenuOverlay() {
  const { menuOverlayOpen, setMenuOverlayOpen } = usePortfolioContext()
  const router = useRouter()

  if (!menuOverlayOpen) return null

  return (
    <div
      onClick={() => setMenuOverlayOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(18,15,15,0.72)',
        backdropFilter: 'blur(2px)',
        zIndex: 45,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '52px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'flex-end',
        }}
      >
        {NAV_ITEMS.map(({ label, path }) => (
          <button
            key={label}
            onClick={() => {
              setMenuOverlayOpen(false)
              router.push(path)
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#F3F3F3',
              fontSize: '22px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              padding: '10px 0',
              letterSpacing: '-0.3px',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
