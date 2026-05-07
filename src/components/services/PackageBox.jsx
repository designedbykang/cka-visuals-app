'use client'

import { useRef } from 'react'
import { useLongPress } from '@/hooks/useLongPress'

export default function PackageBox({ pkg, selected, onSelect, onLongPress, isAdmin }) {
  const longPress = useLongPress(() => {
    if (isAdmin && onLongPress) onLongPress(pkg)
  })

  return (
    <div
      {...(isAdmin ? longPress : {})}
      onClick={() => onSelect(pkg)}
      style={{
        background: '#1A1A28',
        border: selected ? '1.5px solid #C8FF00' : '1.5px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
        userSelect: 'none',
        minHeight: '72px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            color: '#F3F3F3',
            fontSize: '15px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
          }}>
            {pkg.name}
          </span>
          {pkg.is_new && (
            <span style={{
              background: 'rgba(200,255,0,0.15)',
              color: '#C8FF00',
              fontSize: '9px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              padding: '2px 6px',
              borderRadius: '4px',
              letterSpacing: '0.5px',
            }}>
              NEW
            </span>
          )}
        </div>
        {pkg.description && (
          <span style={{
            color: 'rgba(243,243,243,0.55)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {pkg.description}
          </span>
        )}
      </div>

      <div style={{ flexShrink: 0, textAlign: 'right' }}>
        {pkg.price != null && (
          <span style={{
            color: '#C8FF00',
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            {pkg.currency || 'XAF'} {pkg.price.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  )
}
