'use client'

import { useRef, useEffect, useState } from 'react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'deliverables', label: 'Deliverables' },
]

export default function LearnMoreTabs({ activeTab, onTabChange }) {
  const tabRefs = useRef([])
  const [underline, setUnderline] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const idx = TABS.findIndex(t => t.id === activeTab)
    const el = tabRefs.current[idx]
    if (el) {
      const parent = el.parentElement.getBoundingClientRect()
      const rect = el.getBoundingClientRect()
      setUnderline({ left: rect.left - parent.left, width: rect.width })
    }
  }, [activeTab])

  return (
    <div style={{ position: 'relative', borderBottom: '1px solid var(--bg-card-border)' }}>
      <div style={{ display: 'flex', padding: '0 20px' }}>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={el => (tabRefs.current[i] = el)}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              color: tab.id === activeTab ? '#F3F3F3' : 'rgba(243,243,243,0.4)',
              fontSize: '14px',
              fontWeight: tab.id === activeTab ? '700' : '400',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'color 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* animated underline */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: underline.left + 20,
        width: underline.width,
        height: '2px',
        background: '#6E01F0',
        borderRadius: '1px',
        transition: 'left 0.2s ease, width 0.2s ease',
      }} />
    </div>
  )
}
