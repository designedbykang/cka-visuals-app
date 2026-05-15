'use client'

import { useServiceCategories } from '@/app/hooks/useServiceCategories'
import { useServicesContext } from '@/context/ServicesContext'

export default function CategoryTitle() {
  const { categories } = useServiceCategories()
  const { selectedCategoryId } = useServicesContext()

  const active = categories.find(c => c.id === selectedCategoryId)
  const label = active ? active.name.toUpperCase() : 'ALL SERVICES'

  return (
    <div style={{
      width: '100%',
      padding: '14px 20px',
      background: '#0D0D10',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{
        color: 'rgba(243,243,243,0.35)',
        fontSize: '13px',
        fontWeight: '700',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  )
}
