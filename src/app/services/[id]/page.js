'use client'

import { useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useService } from '@/app/hooks/useService'
import { useServicesContext } from '@/context/ServicesContext'
import { Check, ArrowLeft } from 'lucide-react'

// Placeholder description slides until description_slides field exists in DB
const LOREM_SLIDES = [
  'Nulla quam. Aenean fermentum, turpis sed volutpat dignissim, diam risus facilisis nibh, sit amet iaculis est turpis non tellus.',
  'Curabitur felis erat, tempus eu, placerat et, pellentesque sed, purus. Sed sed diam. Nam nunc.',
  'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
]

function HeroCarousel({ imageUrl, serviceName }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  // For now single image — structure ready for multiple
  const images = imageUrl ? [imageUrl] : []

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = e => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) < 40) return
    if (delta > 0 && index < images.length - 1) setIndex(i => i + 1)
    if (delta < 0 && index > 0) setIndex(i => i - 1)
    touchStartX.current = null
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#1A1A2E',
        position: 'relative',
      }}
    >
      {images.length > 0 ? (
        <img
          src={images[index]}
          alt={serviceName}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'block',
          }}
        />
      ) : (
        // Placeholder gradient when no image
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(110,1,240,0.4) 0%, rgba(51,208,194,0.2) 100%)',
        }} />
      )}
    </div>
  )
}

function DescriptionCarousel({ slides }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = e => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) < 40) return
    if (delta > 0 && index < slides.length - 1) setIndex(i => i + 1)
    if (delta < 0 && index > 0) setIndex(i => i - 1)
    touchStartX.current = null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Slide text */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          padding: '0 24px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          fontWeight: '400',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.7',
          textAlign: 'center',
          margin: 0,
          transition: 'opacity 0.2s ease',
        }}>
          {slides[index]}
        </p>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === index
                  ? '#F3F3F3'
                  : 'transparent',
                border: i === index
                  ? 'none'
                  : '1.5px solid rgba(243,243,243,0.3)',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function PackageBox({ pkg, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(pkg)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        border: selected
          ? '1.5px solid #33D0C2'
          : '1.5px solid var(--bg-card-border)',
        background: 'var(--bg-card)',
        padding: '20px 20px 20px 20px',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
        marginTop: '16px',
      }}
    >
      {/* PRICE badge — overlapping top-left */}
      <div style={{
        position: 'absolute',
        top: '-14px',
        left: '16px',
        background: '#6E01F0',
        borderRadius: '20px',
        padding: '4px 14px',
        zIndex: 1,
      }}>
        <span style={{
          color: '#F3F3F3',
          fontSize: '10px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          PRICE
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Price */}
          <span style={{
            color: 'var(--text-primary)',
            fontSize: '26px',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.5px',
            lineHeight: '1',
          }}>
            {pkg.price?.toLocaleString()} {pkg.currency || 'XAF'}
          </span>

          {/* Package name */}
          <span style={{
            color: 'rgba(243,243,243,0.5)',
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
          }}>
            {pkg.name}
          </span>

          {/* Delivery */}
          {pkg.delivery_time && (
            <span style={{
              color: 'rgba(243,243,243,0.4)',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              marginTop: '2px',
            }}>
              Delivered {pkg.delivery_time}
            </span>
          )}
        </div>

        {/* Checkmark */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: selected ? 'rgba(51,208,194,0.15)' : 'transparent',
          border: selected
            ? '1.5px solid #33D0C2'
            : '1.5px solid var(--bg-card-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}>
          {selected && <Check size={14} color="#33D0C2" strokeWidth={2.5} />}
        </div>
      </div>
    </div>
  )
}

export default function ServiceDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, packages, loading } = useService(id)
  const { selectedPackageId, setSelectedPackageId, openContactPopup } = useServicesContext()

  const selectedPackage = packages.find(p => p.id === selectedPackageId)
    || packages[0]
    || null

  // Auto-select first package on load
  if (packages.length > 0 && !selectedPackageId) {
    setSelectedPackageId(packages[0].id)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
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

  if (!service) return null

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Top band — back button + service name */}
      <div style={{
        background: '#6E01F0',
        padding: '52px 20px 16px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(243,243,243,0.15)',
            border: '1px solid rgba(243,243,243,0.2)',
            borderRadius: '12px',
            cursor: 'pointer',
            flexShrink: 0,
            position: 'absolute',
            left: '20px',
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={20} color="#F3F3F3" />
        </button>
        <h1 style={{
          color: '#F3F3F3',
          fontSize: '22px',
          fontWeight: '900',
          fontFamily: 'Inter, sans-serif',
          margin: '0 auto',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          {service.name}
        </h1>
      </div>

      {/* Hero image zone */}
      <div style={{
        width: '100%',
        height: '38vh',
        flexShrink: 0,
        background: '#fff',
      }}>
        <HeroCarousel
          imageUrl={service.hero_image_url}
          serviceName={service.name}
        />
      </div>

      {/* Content zone */}
      <div style={{
        flex: 1,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '40px',
      }}>

        {/* Headline */}
        <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
          <h2 style={{
            color: 'var(--text-primary)',
            fontSize: '22px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            lineHeight: '1.3',
            letterSpacing: '-0.2px',
          }}>
            {service.tagline || 'Nulla quam. Aenean fermentum'}
          </h2>
        </div>

        {/* Description carousel */}
        <div style={{ paddingTop: '20px' }}>
          <DescriptionCarousel slides={LOREM_SLIDES} />
        </div>

        {/* Package boxes */}
        <div style={{ padding: '8px 20px 0' }}>
          {packages.length > 0 ? (
            packages.map(pkg => (
              <PackageBox
                key={pkg.id}
                pkg={pkg}
                selected={selectedPackage?.id === pkg.id}
                onSelect={p => setSelectedPackageId(p.id)}
              />
            ))
          ) : (
            // Placeholder packages when DB is empty
            [
              { id: 'a', name: 'New Logo', price: 60, currency: 'USD', delivery_time: 'Within 24hrs' },
              { id: 'b', name: 'Logo Redesign', price: 40, currency: 'USD', delivery_time: 'Within 24hrs' },
            ].map(pkg => (
              <PackageBox
                key={pkg.id}
                pkg={pkg}
                selected={selectedPackage?.id === pkg.id}
                onSelect={p => setSelectedPackageId(p.id)}
              />
            ))
          )}
        </div>

        {/* BUY NOW button */}
        <div style={{ padding: '28px 20px 0' }}>
          <button
            onClick={() => selectedPackage && openContactPopup()}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '16px',
              background: 'linear-gradient(90deg, #6E01F0 0%, #33D0C2 100%)',
              border: 'none',
              color: '#F3F3F3',
              fontSize: '16px',
              fontWeight: '900',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(110,1,240,0.35)',
              transition: 'opacity 0.15s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Buy Now
          </button>

          {/* Assurance line */}
          <p style={{
            color: 'rgba(243,243,243,0.35)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            margin: '14px 0 0',
            lineHeight: '1.6',
          }}>
            Lorem ipsum dolor sit amet consectetur.{' '}
            <span
              onClick={() => router.push(`/services/${id}/learn-more`)}
              style={{
                color: 'rgba(158,86,245,0.8)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Learn more about this service
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}
