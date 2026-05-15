'use client'

import { useEffect } from 'react'
import { usePortfolioContext } from '@/context/PortfolioContext'

export default function WayfindingToast() {
  const { wayfindingPiece, dismissWayfinding } = usePortfolioContext()

  useEffect(() => {
    if (!wayfindingPiece) return
    const timer = setTimeout(dismissWayfinding, 4000)
    return () => clearTimeout(timer)
  }, [wayfindingPiece, dismissWayfinding])

  if (!wayfindingPiece) return null

  return (
    <div
      onClick={dismissWayfinding}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
      }}
    >
      <div style={{
        background: 'rgba(18,15,15,0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '20px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        maxWidth: '320px',
        width: '100%',
        border: '1px solid rgba(255,255,255,0.08)',
        animation: 'fadeIn 0.3s ease',
      }}>
        <span style={{
          color: '#F3F3F3',
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.3px',
          lineHeight: '1.2',
        }}>
          {wayfindingPiece.title}
        </span>

        <span style={{
          color: 'rgba(243,243,243,0.5)',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
        }}>
          {wayfindingPiece.date}
        </span>

        {wayfindingPiece.context_line && (
          <span style={{
            color: 'rgba(243,243,243,0.7)',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.5',
            marginTop: '2px',
          }}>
            {wayfindingPiece.context_line}
          </span>
        )}

        <span style={{
          color: 'rgba(243,243,243,0.25)',
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
          marginTop: '4px',
          letterSpacing: '0.3px',
        }}>
          Tap anywhere to continue
        </span>
      </div>
    </div>
  )
}
