import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import ServiceDetailClient from './ServiceDetailClient'

export const revalidate = 3600

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: services } = await supabase
    .from('services')
    .select('id')
    .eq('is_visible', true)
  return (services ?? []).map(s => ({ id: String(s.id) }))
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params
  const supabase = createServerClient()

  const [{ data: service }, { data: packages }] = await Promise.all([
    supabase.from('services').select('*').eq('id', id).single(),
    supabase.from('service_packages').select('*').eq('service_id', id).order('order_index', { ascending: true }),
  ])

  if (!service) notFound()

  return <ServiceDetailClient service={service} packages={packages ?? []} />
}
