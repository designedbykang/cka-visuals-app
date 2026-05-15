import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useCategoryPieces(categoryId) {
  const [pieces, setPieces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!categoryId) return
    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('portfolio_pieces')
        .select(`
          id, title, date, context_line,
          cover_image_url, order_index,
          is_featured, category_id
        `)
        .eq('category_id', categoryId)
        .eq('is_visible', true)
        .order('is_featured', { ascending: false })
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false })
      setPieces(data || [])
      setLoading(false)
    }
    fetch()
  }, [categoryId])

  return { pieces, loading }
}
