import { createServerClient } from '@/lib/supabase-server'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import Bento from '@/components/Bento'

export default async function Home() {
  const supabase = createServerClient()

  const { data: stories } = await supabase
    .from('daily_status')
    .select('id, media_url, media_type, caption')
    .eq('is_active', true)
    .order('sequence_order', { ascending: true })
    .limit(2)

  return (
    <main>
      <Header />
      <SearchBar />
      <Bento stories={stories ?? []} />
    </main>
  )
}
