import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useLegalDocument(type) {
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!type) return
    const fetch = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('legal_documents')
        .select('*')
        .eq('type', type)
        .single()
      if (error) setError(error)
      else setDocument(data)
      setLoading(false)
    }
    fetch()
  }, [type])

  return { document, loading, error }
}
