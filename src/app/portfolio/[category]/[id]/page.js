'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { usePortfolioContext } from '@/context/PortfolioContext'
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories'
import { usePiece } from '@/hooks/usePiece'
import ImmersiveViewer from '@/components/portfolio/ImmersiveViewer'
import CategoryOverlay from '@/components/portfolio/CategoryOverlay'
import MenuOverlay from '@/components/portfolio/MenuOverlay'
import ContactOverlay from '@/components/portfolio/ContactOverlay'
import PageLoader from '@/components/PageLoader'

export default function ImmersivePage() {
  const { category, id } = useParams()
  const { categories } = usePortfolioCategories()
  const { piece, loading } = usePiece(id)
  const { openPiece, openCategory, activeCategoryId } = usePortfolioContext()

  // Restore context if user landed directly on this URL
  useEffect(() => {
    if (piece && !activeCategoryId) {
      const cat = categories.find(c => c.slug === category)
      if (cat) openCategory(cat.id, cat.slug)
      openPiece(piece)
    }
  }, [piece, categories, category, activeCategoryId, openCategory, openPiece])

  if (loading || !piece) return <PageLoader />

  const cat = categories.find(c => c.slug === category)

  return (
    <>
      <ImmersiveViewer
        initialPieceId={id}
        categoryId={cat?.id || piece.category_id}
      />
      <CategoryOverlay />
      <MenuOverlay />
      <ContactOverlay />
    </>
  )
}
