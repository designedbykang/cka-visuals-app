import { createServerClient } from '@/lib/supabase-server'
import LegalClient from './LegalClient'

export default async function LegalPage() {
  const supabase = createServerClient()

  const [terms, privacy, refund] = await Promise.all([
    supabase.from('legal_documents').select('*').eq('type', 'terms').single(),
    supabase.from('legal_documents').select('*').eq('type', 'privacy').single(),
    supabase.from('legal_documents').select('*').eq('type', 'refund').single(),
  ])

  return (
    <LegalClient
      terms={terms.data ?? null}
      privacy={privacy.data ?? null}
      refund={refund.data ?? null}
    />
  )
}
