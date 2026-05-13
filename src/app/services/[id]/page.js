'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useService } from '@/app/hooks/useService'
import { useServicesContext } from '@/context/ServicesContext'
import ImageCarousel from '@/components/services/ImageCarousel'
import ServiceTitle from '@/components/services/ServiceTitle'
import ServiceDescription from '@/components/services/ServiceDescription'
import PriceBox from '@/components/services/PriceBox'
import RefundInfo from '@/components/services/RefundInfo'
import EnquirySheet from '@/components/services/EnquirySheet'

export default function ServicePage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, packages, loading } = useService(id)
  const { selectedPackageId, setSelectedPackageId } = useServicesContext()
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || packages[0] || null

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', background: '#080809', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: i === 1 ? '240px' : '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>
    )
  }

  if (!service) return null

  return (
    <div style={{ minHeight: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column' }}>
      {/* Back nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '56px 20px 20px',
        position: 'sticky',
        top: 0,
        background: 'rgba(8,8,9,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 10,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(243,243,243,0.6)',
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <span style={{ color: 'rgba(243,243,243,0.4)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
          Services
        </span>
      </div>

      {/* Main content area */}
      <div style={{
        flex: 1,
        padding: '32px 20px 100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        maxWidth: '100%',
      }}>
        {/* Image carousel section */}
        <div style={{ width: '100%' }}>
          <ImageCarousel
            images={service.hero_image_url ? [service.hero_image_url] : []}
            serviceName={service.name}
          />
        </div>

        {/* Title section */}
        <div>
          <ServiceTitle
            title={service.name}
            subtitle={service.tagline || ''}
          />
        </div>

        {/* Description section */}
        {service.description && (
          <ServiceDescription text={service.description} />
        )}

        {/* Price box */}
        {selectedPackage && (
          <PriceBox
            price={selectedPackage.price || 0}
            currency={selectedPackage.currency || 'USD'}
            deliveryTime={service.turnaround || 'Delivered Within 24hrs'}
            label="PRICE"
          />
        )}

        {/* CTA Button */}
        <button
          onClick={() => selectedPackage && setEnquiryOpen(true)}
          disabled={!selectedPackage}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            background: selectedPackage
              ? 'linear-gradient(135deg, #6E01F0 0%, #00D9FF 100%)'
              : 'rgba(255,255,255,0.06)',
            border: 'none',
            color: selectedPackage ? '#FFFFFF' : 'rgba(255,255,255,0.22)',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            cursor: selectedPackage ? 'pointer' : 'default',
            transition: 'opacity 0.2s ease',
            boxShadow: selectedPackage ? '0 8px 24px rgba(110,1,240,0.3)' : 'none',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={e => { if (selectedPackage) e.currentTarget.style.opacity = '0.9' }}
          onMouseLeave={e => { if (selectedPackage) e.currentTarget.style.opacity = '1' }}
        >
          BUY NOW
        </button>

        {/* Refund info */}
        <RefundInfo text={service.refund_text || "You get an 80% Refund if you don't like all of the first 3 concepts we will present."} />
      </div>

      {enquiryOpen && selectedPackage && (
        <EnquirySheet
          service={service}
          selectedPackage={selectedPackage}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </div>
  )
}
