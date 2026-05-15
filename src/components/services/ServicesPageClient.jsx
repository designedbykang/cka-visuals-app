'use client'

import { useEffect } from 'react'
import { useServicesContext } from '@/context/ServicesContext'
import { deriveTagsFromServices } from '@/app/hooks/useServiceTags'
import Header from '@/components/Header'
import CategoryTabs from '@/components/services/CategoryTabs'
import ServiceTags from '@/components/services/ServiceTags'
import ServiceCard from '@/components/services/ServiceCard'

function formatCategoryTitle(name) {
  if (!name) return 'SERVICES'
  return `${name} Services`.toUpperCase()
}

function ServiceDeck({ categories, services, categoryId, categoryName, error }) {
  const { activeTagId } = useServicesContext()

  const categoryServices = categoryId
    ? services.filter(service => service.category_id === categoryId)
    : []
  const tags = deriveTagsFromServices(categoryServices)
  const visibleServices = activeTagId
    ? categoryServices.filter(service =>
        service.service_tag_assignments?.some(assignment => assignment.tag_id === activeTagId)
      )
    : categoryServices

  if (error) {
    return (
      <ServiceMessage
        title="Unable to load services"
        body={error}
      />
    )
  }

  if (!categoryId || categories.length === 0) {
    return (
      <ServiceMessage
        title="No visible categories"
        body="Add or enable at least one service category in Supabase."
      />
    )
  }

  if (!visibleServices.length) {
    return (
      <ServiceMessage
        title="No services here yet"
        body="This category has no visible services for the current selection."
      />
    )
  }

  return (
    <>
      <div style={{ flexShrink: 0 }}>
        <ServiceTags tags={tags} categoryName={categoryName || 'Service'} />
      </div>

      <div className="no-scrollbar" style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        scrollbarWidth: 'none',
        padding: '0 clamp(18px, 4vw, 48px) 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
      }}>
        {visibleServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </>
  )
}

function ServiceMessage({ title, body }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 clamp(18px, 4vw, 48px) 24px',
    }}>
      <div style={{
        width: '100%',
        minHeight: '280px',
        borderRadius: '28px',
        background: 'linear-gradient(155deg, rgba(110,1,240,0.24), rgba(1,240,110,0.12))',
        border: '1px solid rgba(243,243,243,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        textAlign: 'center',
        padding: '28px',
      }}>
        <h2 style={{
          color: '#F3F3F3',
          fontSize: '22px',
          fontWeight: '800',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
        }}>
          {title}
        </h2>
        <p style={{
          color: 'rgba(243,243,243,0.55)',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.6',
          margin: 0,
          maxWidth: '520px',
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export default function ServicesPageClient({ initialCategories, initialServices, initialError }) {
  const { selectedCategoryId, setSelectedCategoryId, setActiveTagId } = useServicesContext()
  const effectiveCategoryId = selectedCategoryId || initialCategories[0]?.id || null
  const activeCategory = initialCategories.find(category => category.id === effectiveCategoryId)

  useEffect(() => {
    if (!selectedCategoryId && initialCategories.length > 0) {
      setSelectedCategoryId(initialCategories[0].id)
      setActiveTagId(null)
    }
  }, [initialCategories, selectedCategoryId, setActiveTagId, setSelectedCategoryId])

  return (
    <main style={{
      minHeight: '100dvh',
      height: '100dvh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Header />

      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        padding: 'clamp(22px, 4vw, 42px) 0 clamp(22px, 3vw, 34px)',
        background: '#000000',
      }}>
        <div style={{
          margin: '0 clamp(18px, 4vw, 48px)',
          minHeight: 'clamp(86px, 15vw, 156px)',
          borderRadius: '8px',
          background: '#171717',
          border: '1px solid rgba(243,243,243,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '18px',
          overflow: 'hidden',
        }}>
          <h1 style={{
            color: 'rgba(243,243,243,0.10)',
            fontSize: 'clamp(26px, 6vw, 76px)',
            fontWeight: '900',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            lineHeight: '1',
            textAlign: 'center',
            textTransform: 'uppercase',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
          }}>
            {formatCategoryTitle(activeCategory?.name)}
          </h1>
        </div>

        <CategoryTabs categories={initialCategories} loading={false} error={initialError} />
      </div>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
      }}>
        <ServiceDeck
          categories={initialCategories}
          services={initialServices}
          categoryId={effectiveCategoryId}
          categoryName={activeCategory?.name}
          error={initialError}
        />
      </div>
    </main>
  )
}
