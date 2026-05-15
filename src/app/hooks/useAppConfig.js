import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

let cache = null

export function useAppConfig() {
  const [config, setConfig] = useState(cache || {})
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) return
    const fetch = async () => {
      const { data } = await supabase
        .from('app_config')
        .select('key, value')
      if (data) {
        const map = {}
        data.forEach(row => { map[row.key] = row.value })
        cache = map
        setConfig(map)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return { config, loading }
}
