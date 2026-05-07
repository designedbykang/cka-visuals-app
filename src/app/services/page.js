'use client'

import { useServicesContext } from '@/context/ServicesContext'
import { useCategoryServices } from '@/hooks/useCategoryServices'
import { useServiceCategories } from '@/hooks/useServiceCategories'
import CategoryTabs from '@/components/services/CategoryTabs'
import ServiceCard from '@/components/services/ServiceCard'
import ServiceSlideup from '@/components/services/ServiceSlideup'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ServiceGrid({ categoryId }) {
  const { services, loading } = useCategoryServices(categoryId)
  const { categories } = useServiceCategories()

  if (!categoryId) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '40px 20px',
      }}>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
        }}>
          {categories.length > 0 ? 'Select a category above to explore services.' : 'Loading…'}
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ height: '120px', borderRadius: '16px', background: 'var(--bg-card)' }} />
        ))}
      </div>
    )
  }

  if (!services.length) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
          No services in this category yet.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}

export default function ServicesPage() {
  const { selectedCategoryId } = useServicesContext()
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '56px 20px 16px',
        background: 'var(--bg-primary)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)', flexShrink: 0,
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
        }}>
          Services
        </h1>
      </div>

      {/* Category tabs */}
      <div style={{ paddingBottom: '16px' }}>
        <CategoryTabs />
      </div>

      {/* Service grid */}
      <div style={{ flex: 1, paddingBottom: '40px' }}>
        <ServiceGrid categoryId={selectedCategoryId} />
      </div>

      <ServiceSlideup />
    </div>
  )
}

