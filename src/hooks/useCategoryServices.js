import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useCategoryServices(categoryId) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!categoryId) return

    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('services')
        .select(`
          *,
          service_tag_assignments(tag_id)
        `)
        .eq('category_id', categoryId)
        .eq('is_visible', true)
        .order('order_index', { ascending: true })

      setServices(data || [])
      setLoading(false)
    }
    fetch()
  }, [categoryId])

  return { services, loading }
}
