'use client'

import { Check } from 'lucide-react'

export default function DeliverablesList({ deliverables }) {
  if (!deliverables?.length) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif',
        margin: 0,
      }}>
        What&apos;s included
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {deliverables.map(d => (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              background: 'rgba(97,222,44,0.12)',
              border: '1px solid rgba(97,222,44,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Check size={11} color="#61DE2C" strokeWidth={2.5} />
            </div>
            <span style={{
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
            }}>
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

