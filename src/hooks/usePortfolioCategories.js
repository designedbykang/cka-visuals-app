import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function usePortfolioCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_visible', true)
        .order('order_index', { ascending: true })
      setCategories(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { categories, loading }
}
