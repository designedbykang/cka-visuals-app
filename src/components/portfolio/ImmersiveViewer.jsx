'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePortfolioContext } from '@/context/PortfolioContext'
import { useCategoryPieces } from '@/hooks/useCategoryPieces'
import { usePiece } from '@/hooks/usePiece'
import PortfolioNav from './PortfolioNav'
import WayfindingToast from './WayfindingToast'
import Filmstrip from './Filmstrip'
import LiteratureSlideUp from './LiteratureSlideUp'

function PieceViewer({ pieceId, isActive }) {
  const { piece, images } = usePiece(isActive ? pieceId : null)
  const {
    activeImageIndex, setActiveImageIndex,
    filmstripOpen, literatureOpen,
    openPiece,
  } = usePortfolioContext()

  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = e => {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)

    // Only handle horizontal swipes
    if (Math.abs(dx) < 40 || dy > Math.abs(dx)) return

    if (dx > 0 && activeImageIndex < images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1)
    } else if (dx < 0 && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1)
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const currentImage = images[activeImageIndex]

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#0D0D10',
        scrollSnapAlign: 'start',
        flexShrink: 0,
      }}
    >
      {currentImage ? (
        <img
          src={currentImage.image_url}
          alt={currentImage.alt_text || piece?.title}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'block',
            transition: 'opacity 0.2s ease',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(110,1,240,0.3), rgba(51,208,194,0.15))',
        }} />
      )}

      {isActive && piece && (
        <>
          <Filmstrip images={images} />
          <LiteratureSlideUp piece={piece} images={images} />
        </>
      )}
    </div>
  )
}

export default function ImmersiveViewer({ initialPieceId, categoryId }) {
  const { pieces } = useCategoryPieces(categoryId)
  const {
    activePieceId, openPiece,
    setActiveImageIndex,
    closeAllOverlays,
  } = usePortfolioContext()

  const scrollRef = useRef(null)
  const isScrolling = useRef(false)

  const currentIndex = pieces.findIndex(p => p.id === activePieceId)

  // Scroll to initial piece on mount
  useEffect(() => {
    if (!scrollRef.current || !pieces.length) return
    const idx = pieces.findIndex(p => p.id === initialPieceId)
    if (idx > 0) {
      scrollRef.current.scrollTop = idx * window.innerHeight
    }
  }, [pieces, initialPieceId])

  // Detect which piece is in view on scroll
  const handleScroll = useCallback(() => {
    if (isScrolling.current) return
    const container = scrollRef.current
    if (!container || !pieces.length) return

    const idx = Math.round(container.scrollTop / window.innerHeight)
    const clampedIdx = Math.max(0, Math.min(idx, pieces.length - 1))

    if (pieces[clampedIdx] && pieces[clampedIdx].id !== activePieceId) {
      openPiece(pieces[clampedIdx])
      setActiveImageIndex(0)
      closeAllOverlays()

      // Update URL silently
      const piece = pieces[clampedIdx]
      window.history.replaceState(null, '', window.location.pathname.replace(
        /\/[^/]+$/, `/${piece.id}`
      ))
    }
  }, [pieces, activePieceId, openPiece, setActiveImageIndex, closeAllOverlays])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0D0D10',
      zIndex: 20,
    }}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          width: '100%',
          height: '100dvh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {pieces.map(piece => (
          <div
            key={piece.id}
            style={{
              width: '100%',
              height: '100dvh',
              scrollSnapAlign: 'start',
              flexShrink: 0,
            }}
          >
            <PieceViewer
              pieceId={piece.id}
              isActive={piece.id === activePieceId}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <PortfolioNav screen="immersive" />
      <WayfindingToast />
    </div>
  )
}
