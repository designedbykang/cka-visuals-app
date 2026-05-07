'use client'

import { useServicesContext } from '@/context/ServicesContext'
import { useServiceCategories } from '@/hooks/useServiceCategories'

export default function CategoryTabs() {
  const { categories, loading } = useServiceCategories()
  const { selectedCategoryId, setSelectedCategoryId } = useServicesContext()

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px', overflowX: 'auto' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            height: '34px',
            width: '80px',
            borderRadius: '20px',
            background: 'var(--bg-card)',
            flexShrink: 0,
          }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '0 16px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      {categories.map(cat => {
        const active = cat.id === selectedCategoryId
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(active ? null : cat.id)}
            style={{
              padding: '7px 18px',
              borderRadius: '20px',
              background: active ? '#6E01F0' : 'var(--bg-card)',
              border: active ? '1px solid #6E01F0' : '1px solid var(--bg-card-border)',
              color: active ? '#F3F3F3' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: active ? '600' : '400',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.18s ease',
            }}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}

