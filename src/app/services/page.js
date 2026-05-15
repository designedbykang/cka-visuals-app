import { createServerClient } from '@/lib/supabase-server'
import ServicesClient from './ServicesClient'

export default async function ServicesPage() {
  const supabase = createServerClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_visible', true)
    .order('order_index', { ascending: true })

  const firstCategory = categories?.[0] ?? null

  const { data: initialServices } = firstCategory
    ? await supabase
        .from('services')
        .select(`
          *,
          service_tag_assignments(tag_id),
          service_packages(price, currency)
        `)
        .eq('category_id', firstCategory.id)
        .eq('is_visible', true)
        .order('order_index', { ascending: true })
    : { data: [] }

  return (
    <ServicesClient
      categories={categories ?? []}
      initialServices={initialServices ?? []}
      initialCategoryId={firstCategory?.id ?? null}
    />
  )
}
