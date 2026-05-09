import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { buildMessage, buildWhatsAppURL } from '@/lib/whatsapp'

export function useEnquirySubmit() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit({ name, description, serviceId, serviceName, packageId, packageName, price, currency }) {
    setLoading(true)
    setError(null)

    const { error: dbError } = await supabase.from('enquiries').insert({
      name,
      description,
      service_id: serviceId,
      package_id: packageId,
    })

    if (dbError) {
      setError(dbError)
      setLoading(false)
      return { success: false }
    }

    const message = buildMessage({ name, description, serviceName, packageName, price, currency })
    const url = buildWhatsAppURL(message)

    setLoading(false)
    return { success: true, whatsappUrl: url }
  }

  return { submit, loading, error }
}
