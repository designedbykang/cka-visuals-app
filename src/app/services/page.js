'use client'

import { useServicesContext } from '@/context/ServicesContext'
import { useCategoryServices } from '@/hooks/useCategoryServices'
import { deriveTagsFromServices } from '@/hooks/useServiceTags'
import CategoryBand from '@/components/services/CategoryBand'
import ServiceTags from '@/components/services/ServiceTags'
import ServiceCard from '@/components/services/ServiceCard'
import ServiceSlideup from '@/components/services/ServiceSlideup'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ServiceGrid({ categoryId }) {
  const { services, loading } = useCategoryServices(categoryId)

  if (!categoryId) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '10px', padding: '60px 20px',
      }}>
        <p style={{
          color: 'rgba(243,243,243,0.3)', fontSize: '15px',
          fontFamily: 'Inter, sans-serif', textAlign: 'center',
        }}>
          Pick a category above to explore services.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 20px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ height: '120px', borderRadius: '20px', background: '#111118' }} />
        ))}
      </div>
    )
  }

  if (!services.length) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(243,243,243,0.3)', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
          No services in this category yet.
        </p>
      </div>
    )
  }

  const tags = deriveTagsFromServices(services)

  return (
    <>
      {tags.length > 0 && (
        <div style={{ paddingBottom: '16px' }}>
          <ServiceTags tags={tags} />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 20px' }}>
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </>
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
        zIndex: 20,
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
          color: '#F3F3F3', fontSize: '20px', fontWeight: '700',
          fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '-0.3px',
        }}>
          Services
        </h1>
      </div>

      {/* Category selector */}
      <CategoryBand />

      {/* Service grid + tag pills */}
      <div style={{ flex: 1, paddingTop: '16px', paddingBottom: '60px' }}>
        <ServiceGrid categoryId={selectedCategoryId} />
      </div>

      <ServiceSlideup />
    </div>
  )
}
