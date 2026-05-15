import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useServiceFeaturedClients(serviceId) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!serviceId) return
    const fetch = async () => {
      const { data } = await supabase
        .from('service_featured_clients')
        .select('*')
        .eq('service_id', serviceId)
        .order('order_index', { ascending: true })
      setClients(data || [])
      setLoading(false)
    }
    fetch()
  }, [serviceId])

  return { clients, loading }
}
