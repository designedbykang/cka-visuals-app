'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [activeCategoryId, setActiveCategoryId]     = useState(null)
  const [activeCategorySlug, setActiveCategorySlug] = useState(null)
  const [activePieceId, setActivePieceId]           = useState(null)
  const [activeImageIndex, setActiveImageIndex]     = useState(0)
  const [filmstripOpen, setFilmstripOpen]           = useState(false)
  const [literatureOpen, setLiteratureOpen]         = useState(false)
  const [categoryOverlayOpen, setCategoryOverlayOpen] = useState(false)
  const [menuOverlayOpen, setMenuOverlayOpen]       = useState(false)
  const [contactOverlayOpen, setContactOverlayOpen] = useState(false)
  const [wayfindingPiece, setWayfindingPiece]       = useState(null)

  const openCategory = useCallback((id, slug) => {
    setActiveCategoryId(id)
    setActiveCategorySlug(slug)
    setCategoryOverlayOpen(false)
  }, [])

  const openPiece = useCallback((piece) => {
    setActivePieceId(piece.id)
    setActiveImageIndex(0)
    setFilmstripOpen(false)
    setLiteratureOpen(false)
  }, [])

  const dismissWayfinding = useCallback(() => {
    setWayfindingPiece(null)
  }, [])

  const toggleFilmstrip = useCallback(() => {
    setFilmstripOpen(v => !v)
  }, [])

  const toggleLiterature = useCallback(() => {
    setLiteratureOpen(v => !v)
  }, [])

  const closeAllOverlays = useCallback(() => {
    setCategoryOverlayOpen(false)
    setMenuOverlayOpen(false)
    setContactOverlayOpen(false)
  }, [])

  return (
    <PortfolioContext.Provider value={{
      activeCategoryId,
      activeCategorySlug,
      activePieceId,
      activeImageIndex, setActiveImageIndex,
      filmstripOpen, toggleFilmstrip,
      literatureOpen, toggleLiterature,
      categoryOverlayOpen, setCategoryOverlayOpen,
      menuOverlayOpen, setMenuOverlayOpen,
      contactOverlayOpen, setContactOverlayOpen,
      wayfindingPiece, dismissWayfinding,
      openCategory,
      openPiece,
      closeAllOverlays,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContext() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolioContext must be inside PortfolioProvider')
  return ctx
}
