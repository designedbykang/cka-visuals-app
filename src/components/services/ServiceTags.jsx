'use client'

import { useServicesContext } from '@/context/ServicesContext'

export default function ServiceTags({ tags, instructions }) {
  const { activeTagId, setActiveTagId } = useServicesContext()

  return (
    <div style={{
      background: '#080809',
      paddingBottom: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Instructions line */}
      {instructions && (
        <p style={{
          color: 'rgba(243,243,243,0.5)',
          fontSize: '13px',
          fontWeight: '400',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
          padding: '10px 20px 8px',
        }}>
          {instructions}
        </p>
      )}

      {/* Tag pills row */}
      {tags && tags.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '0 20px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {/* All pill */}
          <button
            onClick={() => setActiveTagId(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '100px',
              border: activeTagId === null
                ? '1.5px solid #F3F3F3'
                : '1.5px solid rgba(243,243,243,0.2)',
              background: activeTagId === null
                ? 'rgba(243,243,243,0.12)'
                : 'transparent',
              color: activeTagId === null
                ? '#F3F3F3'
                : 'rgba(243,243,243,0.45)',
              fontSize: '12px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.8px',
              cursor: 'pointer',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Circle indicator */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeTagId === null
                ? '#F3F3F3'
                : 'transparent',
              border: activeTagId === null
                ? 'none'
                : '1.5px solid rgba(243,243,243,0.4)',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }} />
            ALL
          </button>

          {tags.map(tag => {
            const active = tag.id === activeTagId
            return (
              <button
                key={tag.id}
                onClick={() => setActiveTagId(active ? null : tag.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '100px',
                  border: active
                    ? '1.5px solid #F3F3F3'
                    : '1.5px solid rgba(243,243,243,0.2)',
                  background: active
                    ? 'rgba(243,243,243,0.12)'
                    : 'transparent',
                  color: active
                    ? '#F3F3F3'
                    : 'rgba(243,243,243,0.45)',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.8px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: active ? '#F3F3F3' : 'transparent',
                  border: active
                    ? 'none'
                    : '1.5px solid rgba(243,243,243,0.4)',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }} />
                {tag.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
