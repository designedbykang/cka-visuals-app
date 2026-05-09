import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { buildMessage, buildWhatsAppURL } from '@/lib/whatsapp'

export function useEnquirySubmit() {
  const [loading, setLoading] = useState(false)

  async function submit({ name, description, serviceId, serviceName, packageId, packageName, price, currency }) {
    setLoading(true)

    // Best-effort DB log — never blocks the WhatsApp CTA
    supabase.from('enquiries').insert({
      name,
      description,
      service_id: serviceId,
      package_id: packageId,
    }).then(({ error }) => {
      if (error) console.warn('Enquiry log failed:', error.message)
    })

    const message = buildMessage({ name, description, serviceName, packageName, price, currency })
    const whatsappUrl = buildWhatsAppURL(message)

    setLoading(false)
    return { success: true, whatsappUrl }
  }

  return { submit, loading }
}
