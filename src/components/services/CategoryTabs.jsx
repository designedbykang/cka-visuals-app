'use client'

import { useEffect } from 'react'
import { useServicesContext } from '@/context/ServicesContext'
import { useServiceCategories } from '@/app/hooks/useServiceCategories'

export default function CategoryTabs({
  categories: providedCategories,
  loading: providedLoading,
  error: providedError,
}) {
  const fetched = useServiceCategories()
  const categories = providedCategories ?? fetched.categories
  const loading = providedLoading ?? fetched.loading
  const error = providedError ?? fetched.error
  const { selectedCategoryId, setSelectedCategoryId, setActiveTagId } = useServicesContext()
  const effectiveCategoryId = selectedCategoryId || categories[0]?.id

  useEffect(() => {
    if (!loading && categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id)
    }
  }, [categories, loading, selectedCategoryId, setSelectedCategoryId])

  if (loading) {
    return (
      <div className="no-scrollbar" style={{ display: 'flex', gap: '14px', padding: '0 0 0 36px', overflow: 'hidden' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            height: '44px',
            width: '180px',
            borderRadius: '999px',
            background: 'rgba(243,243,243,0.06)',
            flexShrink: 0,
          }} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <p style={{
        color: 'rgba(243,243,243,0.45)',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        padding: '0 clamp(24px, 4vw, 48px)',
        margin: 0,
      }}>
        Unable to load service categories.
      </p>
    )
  }

  return (
    <div className="no-scrollbar" style={{
      display: 'flex',
      gap: '14px',
      padding: '0 0 0 clamp(24px, 4vw, 48px)',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      {categories.map(cat => {
        const active = cat.id === effectiveCategoryId
        return (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategoryId(cat.id)
              setActiveTagId(null)
            }}
            style={{
              minHeight: '46px',
              padding: '0 22px 0 14px',
              borderRadius: '999px',
              background: 'transparent',
              border: active ? '3px solid #9E56F5' : '3px solid rgba(243,243,243,0.22)',
              color: active ? '#F3F3F3' : 'rgba(243,243,243,0.25)',
              fontSize: 'clamp(13px, 1.9vw, 18px)',
              fontWeight: '800',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0',
            }}
            aria-pressed={active}
          >
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: active ? '#F3F3F3' : 'rgba(243,243,243,0.2)',
              flexShrink: 0,
              boxShadow: active ? '0 0 0 1px rgba(255,255,255,0.18)' : 'none',
            }} />
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}

