'use client'

import { useServicesContext } from '@/context/ServicesContext'

export default function ServiceTags({ tags }) {
  const { activeTagId, setActiveTagId } = useServicesContext()

  if (!tags || tags.length === 0) return null

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '0 20px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <button
        onClick={() => setActiveTagId(null)}
        style={{
          height: '32px',
          padding: '0 14px',
          borderRadius: '20px',
          border: activeTagId === null
            ? '1px solid #6E01F0'
            : '1px solid var(--bg-card-border)',
          background: activeTagId === null ? '#6E01F0' : 'var(--bg-card)',
          color: activeTagId === null ? '#F3F3F3' : 'var(--text-secondary)',
          fontSize: '12px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif',
          cursor: 'pointer',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          transition: 'all 0.15s ease',
        }}
      >
        All
      </button>
      {tags.map(tag => {
        const active = tag.id === activeTagId
        return (
          <button
            key={tag.id}
            onClick={() => setActiveTagId(active ? null : tag.id)}
            style={{
              height: '32px',
              padding: '0 14px',
              borderRadius: '20px',
              border: active ? '1px solid #6E01F0' : '1px solid var(--bg-card-border)',
              background: active ? '#6E01F0' : 'var(--bg-card)',
              color: active ? '#F3F3F3' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              textTransform: 'capitalize',
            }}
          >
            {tag.label}
          </button>
        )
      })}
    </div>
  )
}
