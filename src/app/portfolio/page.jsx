import { createServerClient } from '@/lib/supabase-server'
import PortfolioClient from './PortfolioClient'

export default async function PortfolioPage() {
  const supabase = createServerClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('is_visible', true)
    .order('order_index', { ascending: true })

  const firstCategory = categories?.[0] ?? null

  const { data: initialPieces } = firstCategory
    ? await supabase
        .from('portfolio_pieces')
        .select('id, title, date, context_line, cover_image_url, order_index, is_featured, category_id')
        .eq('category_id', firstCategory.id)
        .eq('is_visible', true)
        .order('is_featured', { ascending: false })
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false })
    : { data: [] }

  return (
    <PortfolioClient
      categories={categories ?? []}
      initialPieces={initialPieces ?? []}
      initialCategoryId={firstCategory?.id ?? null}
    />
  )
}
