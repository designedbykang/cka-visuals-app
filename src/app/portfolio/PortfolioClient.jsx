'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioContext } from '@/context/PortfolioContext'
import { useCategoryPieces } from '@/hooks/useCategoryPieces'
import PortfolioNav from '@/components/portfolio/PortfolioNav'
import PortfolioGridCard from '@/components/portfolio/PortfolioGridCard'
import CategoryOverlay from '@/components/portfolio/CategoryOverlay'
import MenuOverlay from '@/components/portfolio/MenuOverlay'
import ContactOverlay from '@/components/portfolio/ContactOverlay'
import WayfindingToast from '@/components/portfolio/WayfindingToast'

function PortfolioGrid({ categoryId, categorySlug, initialPieces, initialCategoryId }) {
  const isInitialCategory = categoryId === initialCategoryId
  const { pieces: hookPieces, loading } = useCategoryPieces(
    !isInitialCategory ? categoryId : null
  )
  const pieces = isInitialCategory ? initialPieces : (hookPieces || [])
  const showLoading = !isInitialCategory && loading

  const { openPiece } = usePortfolioContext()
  const router = useRouter()

  const handleTap = (piece) => {
    openPiece(piece)
    router.push(`/portfolio/${categorySlug}/${piece.id}`)
  }

  if (showLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: '2px solid rgba(243,243,243,0.1)',
          borderTop: '2px solid #6E01F0',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  return (
    <div style={{
      padding: '0 0 80px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
      alignItems: 'start',
    }}>
      {pieces.map((piece, i) => (
        <PortfolioGridCard
          key={piece.id}
          piece={piece}
          index={i}
          onTap={handleTap}
        />
      ))}
    </div>
  )
}

export default function PortfolioClient({ categories, initialPieces, initialCategoryId }) {
  const { activeCategoryId, activeCategorySlug, openCategory } = usePortfolioContext()

  // Seed context with first category from server on mount
  useEffect(() => {
    if (!activeCategoryId && initialCategoryId) {
      const firstCat = categories.find(c => c.id === initialCategoryId)
      if (firstCat) openCategory(firstCat.id, firstCat.slug)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const effectiveCategoryId = activeCategoryId || initialCategoryId
  const effectiveSlug = activeCategorySlug
    || categories.find(c => c.id === effectiveCategoryId)?.slug

  return (
    <div style={{ minHeight: '100dvh', background: '#080809', position: 'relative' }}>
      {effectiveCategoryId && effectiveSlug && (
        <PortfolioGrid
          categoryId={effectiveCategoryId}
          categorySlug={effectiveSlug}
          initialPieces={initialPieces}
          initialCategoryId={initialCategoryId}
        />
      )}

      <PortfolioNav screen="grid" />
      <CategoryOverlay />
      <MenuOverlay />
      <ContactOverlay />
      <WayfindingToast />
    </div>
  )
}
