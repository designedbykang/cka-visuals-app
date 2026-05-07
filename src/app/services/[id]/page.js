'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { useService } from '@/hooks/useService'
import ServiceHero from '@/components/services/ServiceHero'
import PackageSelector from '@/components/services/PackageSelector'
import DeliverablesList from '@/components/services/DeliverablesList'
import EnquirySheet from '@/components/services/EnquirySheet'
import { useServicesContext } from '@/context/ServicesContext'

export default function ServicePage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, packages, deliverables, loading } = useService(id)
  const { selectedPackageId, setSelectedPackageId } = useServicesContext()
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || null

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: i === 1 ? '240px' : '80px', borderRadius: '16px', background: 'var(--bg-card)' }} />
        ))}
      </div>
    )
  }

  if (!service) return null

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Back nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '56px 20px 20px',
        position: 'sticky',
        top: 0,
        background: 'var(--bg-primary)',
        zIndex: 10,
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
          Services
        </span>
      </div>

      <div style={{ padding: '0 20px 100px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <ServiceHero imageUrl={service.hero_image_url} serviceName={service.name} height="260px" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{
            color: 'var(--text-primary)',
            fontSize: '26px',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            letterSpacing: '-0.3px',
          }}>
            {service.name}
          </h1>
          {service.tagline && (
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              lineHeight: '1.6',
            }}>
              {service.tagline}
            </p>
          )}
        </div>

        {service.literature && (
          <Link
            href={`/services/${id}/learn-more`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 16px',
              borderRadius: '14px',
              background: 'rgba(110,1,240,0.06)',
              border: '1px solid rgba(110,1,240,0.15)',
              textDecoration: 'none',
            }}
          >
            <BookOpen size={18} color="#9E56F5" />
            <div>
              <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                Deep dive
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                Read our full approach to {service.name.toLowerCase()}
              </p>
            </div>
          </Link>
        )}

        <PackageSelector
          packages={packages}
          selectedId={selectedPackageId}
          onSelect={pkg => setSelectedPackageId(pkg.id)}
        />

        <DeliverablesList deliverables={deliverables} />

        {/* Sticky CTA */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px 32px',
          background: 'linear-gradient(to top, var(--bg-primary) 60%, transparent)',
          zIndex: 10,
        }}>
          <button
            onClick={() => setEnquiryOpen(true)}
            disabled={!selectedPackage}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: selectedPackage ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
              border: selectedPackage ? 'none' : '1px solid var(--bg-card-border)',
              color: selectedPackage ? '#F3F3F3' : 'var(--text-secondary)',
              fontSize: '16px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              cursor: selectedPackage ? 'pointer' : 'default',
              transition: 'all 0.18s ease',
              boxShadow: selectedPackage ? '0 4px 24px rgba(110,1,240,0.35)' : 'none',
            }}
          >
            {selectedPackage ? `Enquire — ${selectedPackage.name}` : 'Select a package to enquire'}
          </button>
        </div>

        {enquiryOpen && selectedPackage && (
          <EnquirySheet
            service={service}
            selectedPackage={selectedPackage}
            onClose={() => setEnquiryOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

