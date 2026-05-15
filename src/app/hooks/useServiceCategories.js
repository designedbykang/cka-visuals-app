import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useServiceCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('is_visible', true)
          .order('order_index', { ascending: true })

        if (cancelled) return

        if (error) {
          setError(error)
          setCategories([])
        } else {
          setCategories(data || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setCategories([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()

    return () => {
      cancelled = true
    }
  }, [])

  return { categories, loading, error }
}
