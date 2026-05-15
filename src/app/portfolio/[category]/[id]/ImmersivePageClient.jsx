'use client'

import { useEffect } from 'react'
import { usePortfolioContext } from '@/context/PortfolioContext'
import { supabase } from '@/lib/supabase'
import ImmersiveViewer from '@/components/portfolio/ImmersiveViewer'
import CategoryOverlay from '@/components/portfolio/CategoryOverlay'
import MenuOverlay from '@/components/portfolio/MenuOverlay'
import ContactOverlay from '@/components/portfolio/ContactOverlay'

export default function ImmersivePageClient({ piece, categoryId, categorySlug }) {
  const { openPiece, openCategory, activeCategoryId } = usePortfolioContext()

  useEffect(() => {
    if (!piece) return
    // Restore context if user landed directly on this URL
    if (!activeCategoryId && categoryId) {
      openCategory(categoryId, categorySlug)
    }
    openPiece(piece)
    // Increment view count — fire-and-forget, never blocks render
    supabase
      .from('portfolio_pieces')
      .update({ view_count: (piece.view_count || 0) + 1 })
      .eq('id', piece.id)
      .then(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!piece) return null

  return (
    <>
      <ImmersiveViewer
        initialPieceId={piece.id}
        categoryId={categoryId}
      />
      <CategoryOverlay />
      <MenuOverlay />
      <ContactOverlay />
    </>
  )
}
