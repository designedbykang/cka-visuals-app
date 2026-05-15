'use client'

import { useState, useEffect, useRef } from 'react'
import { useServicesContext } from '@/context/ServicesContext'
import { useCategoryServices } from '@/app/hooks/useCategoryServices'
import { deriveTagsFromServices } from '@/app/hooks/useServiceTags'
import CategoryTitle from '@/components/services/CategoryTitle'
import ServiceTags from '@/components/services/ServiceTags'
import ServiceBox from '@/components/services/ServiceBox'
import ServiceSlideup from '@/components/services/ServiceSlideup'
import CategoryBand from '@/components/services/CategoryBand'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const INSTRUCTIONS = {
  'Identity Creation':  'Select your Branding Needs:',
  'Print Coordination': 'Select your Print Needs:',
  'Software Design':    'Select your Software Needs:',
  'Video Assistance':   'Select your Video Needs:',
}

function ServiceSnapScroller({ services, loading, categoryName }) {
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || services.length === 0) return

    const onScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight)
      if (index >= services.length) {
        container.scrollTo({ top: 0, behavior: 'instant' })
        setCurrentIndex(0)
      } else {
        setCurrentIndex(index)
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [services])

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: '2px solid rgba(243,243,243,0.1)',
          borderTop: '2px solid #6E01F0',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  if (!services.length) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(243,243,243,0.3)', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
          No services in this category yet.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {services.map((service) => (
        <div
          key={service.id}
          style={{
            height: 'calc(100dvh - var(--sticky-height, 160px))',
            flexShrink: 0,
            scrollSnapAlign: 'start',
          }}
        >
          <ServiceBox service={service} categoryName={categoryName} />
        </div>
      ))}
      {/* Ghost snap stop to trigger loop */}
      <div style={{ height: '1px', flexShrink: 0, scrollSnapAlign: 'start' }} />
    </div>
  )
}

export default function ServicesClient({ categories, initialServices, initialCategoryId }) {
  const { selectedCategoryId, setSelectedCategoryId } = useServicesContext()
  const router = useRouter()
  const stickyRef = useRef(null)
  const [stickyHeight, setStickyHeight] = useState(160)

  // Seed the context with the first category on mount
  useEffect(() => {
    if (!selectedCategoryId && initialCategoryId) {
      setSelectedCategoryId(initialCategoryId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const effectiveCategoryId = selectedCategoryId || initialCategoryId
  const isInitialCategory = effectiveCategoryId === initialCategoryId

  // Only fetch via hook when the user has switched to a non-initial category
  const { services: hookServices, loading: hookLoading } = useCategoryServices(
    !isInitialCategory ? effectiveCategoryId : null
  )

  const services = isInitialCategory ? initialServices : (hookServices || [])
  const servicesLoading = !isInitialCategory && hookLoading

  const tags = deriveTagsFromServices(services)
  const activeCategory = categories.find(c => c.id === effectiveCategoryId)
  const categoryName = activeCategory?.name || ''
  const instructions = INSTRUCTIONS[categoryName] || 'Select a service:'

  useEffect(() => {
    if (!stickyRef.current) return
    const observer = new ResizeObserver(() => {
      setStickyHeight(stickyRef.current?.offsetHeight || 160)
    })
    observer.observe(stickyRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--sticky-height', `${stickyHeight}px`)
  }, [stickyHeight])

  return (
    <div style={{
      height: '100dvh',
      background: '#080809',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div ref={stickyRef} style={{ flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '56px 20px 12px',
          background: '#080809',
        }}>
          <button
            onClick={() => router.back()}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(243,243,243,0.6)',
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <div style={{ flex: 1 }}>
            <CategoryBand />
          </div>
        </div>

        <CategoryTitle />
        <ServiceTags tags={tags} instructions={instructions} />
      </div>

      {effectiveCategoryId ? (
        <ServiceSnapScroller
          services={services}
          loading={servicesLoading}
          categoryName={categoryName}
        />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'rgba(243,243,243,0.3)', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
            Select a category above.
          </p>
        </div>
      )}

      <ServiceSlideup />
    </div>
  )
}
