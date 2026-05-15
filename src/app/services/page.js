'use client'

import { useState, useEffect, useRef } from 'react'
import { useServicesContext } from '@/context/ServicesContext'
import { useCategoryServices } from '@/app/hooks/useCategoryServices'
import { useServiceCategories } from '@/app/hooks/useServiceCategories'
import { deriveTagsFromServices } from '@/hooks/useServiceTags'
import CategoryTitle from '@/components/services/CategoryTitle'
import ServiceTags from '@/components/services/ServiceTags'
import ServiceBox from '@/components/services/ServiceBox'
import ServiceSlideup from '@/components/services/ServiceSlideup'
import CategoryBand from '@/components/services/CategoryBand'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageLoader from '@/components/PageLoader'


// Map category names to instruction strings
const INSTRUCTIONS = {
  'Identity Creation':  'Select your Branding Needs:',
  'Print Coordination': 'Select your Print Needs:',
  'Software Design':    'Select your Software Needs:',
  'Video Assistance':   'Select your Video Needs:',
}

function ServiceSnapScroller({ categoryId, categoryName }) {
  const { services, loading } = useCategoryServices(categoryId)
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Loop back when scrolled past last
  useEffect(() => {
    const container = scrollRef.current
    if (!container || services.length === 0) return

    const onScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight)
      if (index >= services.length) {
        // Loop — jump back to first without animation
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
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(243,243,243,0.1)',
          borderTop: '2px solid #6E01F0',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  if (!services.length) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          color: 'rgba(243,243,243,0.3)',
          fontSize: '15px',
          fontFamily: 'Inter, sans-serif',
        }}>
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
      {services.map((service, i) => (
        <div
          key={service.id}
          style={{
            height: 'calc(100dvh - var(--sticky-height, 160px))',
            flexShrink: 0,
            scrollSnapAlign: 'start',
          }}
        >
          <ServiceBox
            service={service}
            categoryName={categoryName}
          />
        </div>
      ))}
      {/* Ghost snap stop to trigger loop */}
      <div style={{
        height: '1px',
        flexShrink: 0,
        scrollSnapAlign: 'start',
      }} />
    </div>
  )
}

export default function ServicesPage() {
  const { selectedCategoryId, setSelectedCategoryId } = useServicesContext()
  const { categories } = useServiceCategories()
  const { services } = useCategoryServices(selectedCategoryId)
  const tags = deriveTagsFromServices(services)
  const router = useRouter()
  const stickyRef = useRef(null)
  const [stickyHeight, setStickyHeight] = useState(160)

  const activeCategory = categories.find(c => c.id === selectedCategoryId)
  const categoryName = activeCategory?.name || ''
  const instructions = INSTRUCTIONS[categoryName] || 'Select a service:'

  // Set first category on load
  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      setSelectedCategoryId(categories[0].id)
    }
  }, [categories, selectedCategoryId, setSelectedCategoryId])

  // Measure sticky zone height for snap calculation
  useEffect(() => {
    if (!stickyRef.current) return
    const observer = new ResizeObserver(() => {
      setStickyHeight(stickyRef.current?.offsetHeight || 160)
    })
    observer.observe(stickyRef.current)
    return () => observer.disconnect()
  }, [])

  // Expose sticky height as CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sticky-height',
      `${stickyHeight}px`
    )
  }, [stickyHeight])

  return (
    <div style={{
      height: '100dvh',
      background: '#080809',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Sticky zone — does not scroll */}
      <div ref={stickyRef} style={{ flexShrink: 0 }}>

        {/* Back nav */}
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

          {/* CategoryBand — now a dropdown category switcher */}
          <div style={{ flex: 1 }}>
            <CategoryBand />
          </div>
        </div>

        {/* Category title label */}
        <CategoryTitle />

        {/* Tag scroller */}
        <ServiceTags
          tags={tags}
          instructions={instructions}
        />
      </div>

      {/* Snap scroll zone */}
      {selectedCategoryId ? (
        <ServiceSnapScroller
          categoryId={selectedCategoryId}
          categoryName={categoryName}
        />
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            color: 'rgba(243,243,243,0.3)',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Select a category above.
          </p>
        </div>
      )}

      <ServiceSlideup />
    </div>
  )
}
