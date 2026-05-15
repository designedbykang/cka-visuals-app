'use client'

import { useRouter } from 'next/navigation'
import { LayoutGrid, Info } from 'lucide-react'
import { usePortfolioContext } from '@/context/PortfolioContext'

export default function PortfolioNav({ screen = 'grid' }) {
  const router = useRouter()
  const {
    filmstripOpen, toggleFilmstrip,
    toggleLiterature,
    setCategoryOverlayOpen,
    setMenuOverlayOpen,
    setContactOverlayOpen,
    filmstripOpen: fs,
  } = usePortfolioContext()

  const iconColor = '#F3F3F3'
  const anchorBase = {
    position: 'fixed',
    zIndex: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    padding: 0,
  }

  const verticalText = (label) => ({
    color: iconColor,
    fontSize: '11px',
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    userSelect: 'none',
  })

  // Bottom offset shifts up when filmstrip is open
  const bottomOffset = fs ? '108px' : '28px'

  return (
    <>
      {/* Top left — logo → home */}
      <button
        onClick={() => router.push('/')}
        style={{
          ...anchorBase,
          top: '52px',
          left: '20px',
          width: '48px',
          height: '32px',
        }}
      >
        <img
          src="/logo.png"
          alt="CKA Visuals"
          style={{
            height: '28px',
            width: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            objectPosition: 'left center',
            pointerEvents: 'none',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </button>

      {/* Top right — MENU */}
      <button
        onClick={() => setMenuOverlayOpen(true)}
        style={{
          ...anchorBase,
          top: '52px',
          right: '20px',
          height: '80px',
        }}
        aria-label="Open portfolio menu"
      >
        <span style={verticalText()}>MENU</span>
      </button>

      {/* Bottom left — varies by screen */}
      {screen === 'grid' ? (
        // Plus icon on grid
        <button
          onClick={() => setCategoryOverlayOpen(true)}
          style={{
            ...anchorBase,
            bottom: '28px',
            left: '20px',
            width: '44px',
            height: '44px',
          }}
          aria-label="Open category switcher"
        >
          <span style={{
            color: iconColor,
            fontSize: '28px',
            fontWeight: '300',
            lineHeight: 1,
            fontFamily: 'Inter, sans-serif',
          }}>+</span>
        </button>
      ) : (
        // LayoutGrid + Info on immersive
        <div style={{
          position: 'fixed',
          bottom: '28px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 40,
          transition: 'bottom 0.25s ease',
        }}>
          {/* Info icon above LayoutGrid */}
          <button
            onClick={toggleLiterature}
            style={{
              ...anchorBase,
              position: 'relative',
              width: '44px',
              height: '44px',
            }}
            aria-label="View project details"
          >
            <span style={{
              color: iconColor,
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1,
            }}>i</span>
          </button>

          {/* LayoutGrid */}
          <button
            onClick={toggleFilmstrip}
            style={{
              ...anchorBase,
              position: 'relative',
              width: '44px',
              height: '44px',
            }}
            aria-label="Toggle filmstrip"
            aria-pressed={filmstripOpen}
          >
            <LayoutGrid
              size={24}
              color={filmstripOpen ? '#61DE2C' : iconColor}
            />
          </button>
        </div>
      )}

      {/* Bottom right — CONTACTS */}
      <button
        onClick={() => setContactOverlayOpen(true)}
        style={{
          ...anchorBase,
          bottom: '28px',
          right: '20px',
          height: '80px',
        }}
        aria-label="Open contact information"
      >
        <span style={verticalText()}>CONTACTS</span>
      </button>
    </>
  )
}
