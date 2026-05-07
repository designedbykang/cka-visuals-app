'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, BookOpen } from 'lucide-react'
import { useServicesContext } from '@/context/ServicesContext'
import { useService } from '@/hooks/useService'
import ServiceHero from './ServiceHero'
import PackageSelector from './PackageSelector'
import DeliverablesList from './DeliverablesList'
import EnquirySheet from './EnquirySheet'

export default function ServiceSlideup() {
  const {
    slideupOpen,
    selectedServiceId,
    closeSlideup,
    setSelectedPackageId,
    selectedPackageId,
  } = useServicesContext()
  const { service, packages, deliverables, loading } = useService(selectedServiceId)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  if (!slideupOpen) return null

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || null

  function handlePackageSelect(pkg) {
    setSelectedPackageId(pkg.id)
  }

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
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={closeSlideup}
        />

        <div style={{
          position: 'relative',
          background: 'var(--bg-primary)',
          borderRadius: '24px 24px 0 0',
          maxHeight: '88dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'var(--bg-card-border)' }} />
          </div>

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 20px 16px',
          }}>
            <div />
            <button
              onClick={closeSlideup}
              style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable body */}
          <div style={{
            overflowY: 'auto',
            padding: '0 20px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            scrollbarWidth: 'none',
          }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: i === 1 ? '200px' : '60px', borderRadius: '14px', background: 'var(--bg-card)' }} />
                ))}
              </div>
            ) : service ? (
              <>
                <ServiceHero imageUrl={service.hero_image_url} serviceName={service.name} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h2 style={{
                    color: 'var(--text-primary)',
                    fontSize: '22px',
                    fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    margin: 0,
                  }}>
                    {service.name}
                  </h2>
                  {service.tagline && (
                    <p style={{
                      color: 'var(--text-secondary)',
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
                  onSelect={handlePackageSelect}
                />

                <DeliverablesList deliverables={deliverables} />

                {/* Learn more link */}
                <Link
                  href={`/services/${service.id}`}
                  onClick={closeSlideup}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    textDecoration: 'none',
                  }}
                >
                  <BookOpen size={14} />
                  Read more about this service
                </Link>

                {/* CTA */}
                <button
                  onClick={() => setEnquiryOpen(true)}
                  disabled={!selectedPackage}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '14px',
                    background: selectedPackage ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
                    border: selectedPackage ? 'none' : '1px solid var(--bg-card-border)',
                    color: selectedPackage ? '#F3F3F3' : 'var(--text-secondary)',
                    fontSize: '15px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: selectedPackage ? 'pointer' : 'default',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {selectedPackage ? `Enquire — ${selectedPackage.name}` : 'Select a package to enquire'}
                </button>
              </>
            ) : null}
          </div>
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

