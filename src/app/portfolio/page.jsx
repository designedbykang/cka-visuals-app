'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioContext } from '@/context/PortfolioContext'
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories'
import { useCategoryPieces } from '@/hooks/useCategoryPieces'
import PortfolioNav from '@/components/portfolio/PortfolioNav'
import PortfolioGridCard from '@/components/portfolio/PortfolioGridCard'
import CategoryOverlay from '@/components/portfolio/CategoryOverlay'
import MenuOverlay from '@/components/portfolio/MenuOverlay'
import ContactOverlay from '@/components/portfolio/ContactOverlay'
import WayfindingToast from '@/components/portfolio/WayfindingToast'
import PageLoader from '@/components/PageLoader'

function PortfolioGrid({ categoryId, categorySlug }) {
  const { pieces, loading } = useCategoryPieces(categoryId)
  const { openPiece } = usePortfolioContext()
  const router = useRouter()

  const handleTap = (piece) => {
    openPiece(piece)
    router.push(`/portfolio/${categorySlug}/${piece.id}`)
  }

  if (loading) return <PageLoader />

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

export default function PortfolioPage() {
  const { categories, loading } = usePortfolioCategories()
  const {
    activeCategoryId, activeCategorySlug,
    openCategory,
  } = usePortfolioContext()

  // Set first category on load
  useEffect(() => {
    if (!activeCategoryId && categories.length > 0) {
      openCategory(categories[0].id, categories[0].slug)
    }
  }, [categories, activeCategoryId, openCategory])

  if (loading) return <PageLoader />

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#080809',
      position: 'relative',
    }}>
      {activeCategoryId && activeCategorySlug && (
        <PortfolioGrid
          categoryId={activeCategoryId}
          categorySlug={activeCategorySlug}
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
