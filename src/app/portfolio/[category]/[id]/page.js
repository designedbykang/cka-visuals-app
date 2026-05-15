import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import ImmersivePageClient from './ImmersivePageClient'

export const revalidate = 86400

export async function generateStaticParams() {
  const supabase = createServerClient()
  const [{ data: pieces }, { data: categories }] = await Promise.all([
    supabase.from('portfolio_pieces').select('id, category_id').eq('is_visible', true),
    supabase.from('categories').select('id, slug').eq('is_visible', true),
  ])
  const categoryMap = Object.fromEntries((categories ?? []).map(c => [c.id, c.slug]))
  return (pieces ?? []).map(p => ({
    category: categoryMap[p.category_id] ?? 'unknown',
    id: String(p.id),
  }))
}

export default async function ImmersivePage({ params }) {
  const { category, id } = await params
  const supabase = createServerClient()

  const [{ data: piece }, { data: cat }] = await Promise.all([
    supabase.from('portfolio_pieces').select('*').eq('id', id).single(),
    supabase.from('categories').select('id, slug').eq('slug', category).single(),
  ])

  if (!piece) notFound()

  return (
    <ImmersivePageClient
      piece={piece}
      categoryId={cat?.id ?? piece.category_id}
      categorySlug={cat?.slug ?? category}
    />
  )
}
