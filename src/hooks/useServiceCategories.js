import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useServiceCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true })

      if (error) setError(error)
      else setCategories(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { categories, loading, error }
}
