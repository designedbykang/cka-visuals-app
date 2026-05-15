'use client'

import { usePortfolioContext } from '@/context/PortfolioContext'
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories'

export default function CategoryOverlay() {
  const { categoryOverlayOpen, setCategoryOverlayOpen,
          activeCategoryId, openCategory } = usePortfolioContext()
  const { categories } = usePortfolioCategories()

  if (!categoryOverlayOpen) return null

  return (
    <div
      onClick={() => setCategoryOverlayOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(18,15,15,0.6)',
        backdropFilter: 'blur(2px)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0px',
      }}
    >
      <div onClick={e => e.stopPropagation()}>
        {categories.map(cat => {
          const active = cat.id === activeCategoryId
          return (
            <button
              key={cat.id}
              onClick={() => openCategory(cat.id, cat.slug)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '16px 0',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {/* Active indicator */}
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: active ? '#61DE2C' : 'transparent',
                border: active ? 'none' : '1.5px solid rgba(243,243,243,0.3)',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }} />
              <span style={{
                color: active ? '#F3F3F3' : 'rgba(243,243,243,0.6)',
                fontSize: '26px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.3px',
                transition: 'color 0.15s ease',
              }}>
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
