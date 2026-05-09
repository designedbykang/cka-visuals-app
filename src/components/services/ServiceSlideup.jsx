'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useServicesContext } from '@/context/ServicesContext'
import { useService } from '@/app/hooks/useService'
import ServiceHero from './ServiceHero'
import PackageSelector from './PackageSelector'
import EnquirySheet from './EnquirySheet'

export default function ServiceSlideup() {
  const {
    slideupOpen,
    selectedServiceId,
    closeSlideup,
    setSelectedPackageId,
    selectedPackageId,
  } = useServicesContext()
  const { service, packages, loading } = useService(selectedServiceId)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  if (!slideupOpen) return null

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || null

  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        {/* Backdrop */}
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
          onClick={closeSlideup}
        />

        {/* Sheet */}
        <div style={{
          position: 'relative',
          background: '#0D0D10',
          borderRadius: '28px 28px 0 0',
          maxHeight: '92dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
          borderBottom: 'none',
        }}>
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 6px', flexShrink: 0 }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.12)' }} />
          </div>

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 20px 14px',
            flexShrink: 0,
          }}>
            <span style={{
              color: 'rgba(243,243,243,0.35)',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}>
              START PROJECT
            </span>
            <button
              onClick={closeSlideup}
              style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Scrollable body */}
          <div style={{
            overflowY: 'auto',
            padding: '0 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            scrollbarWidth: 'none',
            flex: 1,
          }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: i === 1 ? '200px' : '60px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)' }} />
                ))}
              </div>
            ) : service ? (
              <>
                <ServiceHero imageUrl={service.hero_image_url} serviceName={service.name} height="220px" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h2 style={{
                    color: '#F3F3F3',
                    fontSize: '22px',
                    fontWeight: '800',
                    fontFamily: 'Inter, sans-serif',
                    margin: 0,
                    letterSpacing: '-0.4px',
                  }}>
                    {service.name}
                  </h2>
                  {service.tagline && (
                    <p style={{
                      color: 'rgba(243,243,243,0.4)',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      margin: 0,
                      lineHeight: '1.6',
                    }}>
                      {service.tagline}
                    </p>
                  )}
                </div>

                <PackageSelector
                  packages={packages}
                  selectedId={selectedPackageId}
                  onSelect={pkg => setSelectedPackageId(pkg.id)}
                />
              </>
            ) : null}
          </div>

          {/* Fixed bottom CTA */}
          {service && !loading && (
            <div style={{
              padding: '16px 20px 36px',
              background: '#0D0D10',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flexShrink: 0,
            }}>
              <button
                onClick={() => selectedPackage && setEnquiryOpen(true)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  background: selectedPackage
                    ? 'linear-gradient(135deg, #FF1FB8 0%, #9E56F5 100%)'
                    : 'rgba(255,255,255,0.05)',
                  border: selectedPackage ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: selectedPackage ? '#F3F3F3' : 'rgba(255,255,255,0.22)',
                  fontSize: '15px',
                  fontWeight: '700',
                  fontFamily: 'Inter, sans-serif',
                  cursor: selectedPackage ? 'pointer' : 'default',
                  letterSpacing: '0.2px',
                  transition: 'opacity 0.15s ease',
                  boxShadow: selectedPackage ? '0 4px 28px rgba(255,31,184,0.3)' : 'none',
                }}
                onMouseEnter={e => { if (selectedPackage) e.currentTarget.style.opacity = '0.9' }}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {selectedPackage
                  ? `PAY — ${selectedPackage.price?.toLocaleString()} ${selectedPackage.currency}`
                  : 'Select a package above'}
              </button>

              <Link
                href={`/services/${service.id}`}
                onClick={closeSlideup}
                style={{
                  color: 'rgba(243,243,243,0.3)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontStyle: 'italic',
                  textDecoration: 'none',
                  textAlign: 'center',
                  letterSpacing: '0.1px',
                }}
              >
                learn more about this service →
              </Link>
            </div>
          )}
        </div>
      </div>

      {enquiryOpen && service && selectedPackage && (
        <EnquirySheet
          service={service}
          selectedPackage={selectedPackage}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </>
  )
}
