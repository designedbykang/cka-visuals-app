import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useCategoryServices(categoryId) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    if (!categoryId) {
      return
    }

    const fetch = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from('services')
          .select(`
            *,
            service_tag_assignments(tag_id),
            service_packages(price, currency)
          `)
          .eq('category_id', categoryId)
          .eq('is_visible', true)
          .order('order_index', { ascending: true })

        if (cancelled) return

        if (error) {
          setError(error)
          setServices([])
        } else {
          setServices(data || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setServices([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()

    return () => {
      cancelled = true
    }
  }, [categoryId])

  return { services, loading, error }
}
