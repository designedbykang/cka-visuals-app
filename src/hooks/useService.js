import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useService(serviceId, fetchKey = 0) {
  const [service, setService] = useState(null)
  const [packages, setPackages] = useState([])
  const [deliverables, setDeliverables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!serviceId) return

    const fetch = async () => {
      setLoading(true)
      const [svcRes, pkgRes, delRes] = await Promise.all([
        supabase.from('services').select('*').eq('id', serviceId).single(),
        supabase.from('service_packages').select('*').eq('service_id', serviceId).order('order_index', { ascending: true }),
        supabase.from('service_deliverables').select('*').eq('service_id', serviceId).order('order_index', { ascending: true })
      ])

      setService(svcRes.data)
      setPackages(pkgRes.data || [])
      setDeliverables(delRes.data || [])
      setLoading(false)
    }
    fetch()
  }, [serviceId, fetchKey])

  return { service, packages, deliverables, loading }
}
