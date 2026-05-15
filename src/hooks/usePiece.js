import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function usePiece(pieceId) {
  const [piece, setPiece] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!pieceId) return
    const fetch = async () => {
      setLoading(true)
      const [pieceRes, imagesRes] = await Promise.all([
        supabase
          .from('portfolio_pieces')
          .select('*')
          .eq('id', pieceId)
          .single(),
        supabase
          .from('portfolio_images')
          .select('*')
          .eq('piece_id', pieceId)
          .order('order_index', { ascending: true }),
      ])
      setPiece(pieceRes.data)
      setImages(imagesRes.data || [])

      // Increment view count non-blocking
      supabase
        .from('portfolio_pieces')
        .update({ view_count: (pieceRes.data?.view_count || 0) + 1 })
        .eq('id', pieceId)
        .then(() => {})

      setLoading(false)
    }
    fetch()
  }, [pieceId])

  return { piece, images, loading }
}
