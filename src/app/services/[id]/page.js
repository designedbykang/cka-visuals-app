'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, FileText, RefreshCw, Layers } from 'lucide-react'
import { useService } from '@/app/hooks/useService'
import ServiceHero from '@/components/services/ServiceHero'
import PackageSelector from '@/components/services/PackageSelector'
import DeliverablesList from '@/components/services/DeliverablesList'
import EnquirySheet from '@/components/services/EnquirySheet'
import { useServicesContext } from '@/context/ServicesContext'

function AvailabilityBadge({ available }) {
  const isAvailable = available !== false
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      background: isAvailable ? 'rgba(97,222,44,0.1)' : 'rgba(255,255,255,0.06)',
      border: `1px solid ${isAvailable ? 'rgba(97,222,44,0.25)' : 'rgba(255,255,255,0.1)'}`,
      alignSelf: 'flex-start',
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: isAvailable ? '#61DE2C' : 'rgba(255,255,255,0.3)',
        flexShrink: 0,
      }} />
      <span style={{
        color: isAvailable ? '#61DE2C' : 'rgba(243,243,243,0.4)',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.2px',
      }}>
        {isAvailable ? 'Available now' : 'Fully booked'}
      </span>
    </div>
  )
}

function DetailFact({ icon: Icon, label, value }) {
  return (
    <div style={{
      padding: '14px',
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: 'rgba(110,1,240,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon size={14} color="#9E56F5" strokeWidth={2} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ color: 'rgba(243,243,243,0.35)', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          {label}
        </span>
        <span style={{ color: '#F3F3F3', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
          {value}
        </span>
      </div>
    </div>
  )
}

export default function ServicePage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, packages, deliverables, loading } = useService(id)
  const { selectedPackageId, setSelectedPackageId } = useServicesContext()
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || null

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

  const facts = [
    { icon: Clock, label: 'Turnaround', value: service.turnaround || 'On request' },
    { icon: FileText, label: 'Format', value: service.format || 'Digital' },
    { icon: RefreshCw, label: 'Revisions', value: service.revisions != null ? `${service.revisions} rounds` : 'Discussed' },
    { icon: Layers, label: 'Packages', value: `${packages.length} option${packages.length !== 1 ? 's' : ''}` },
  ]

  return (
    <div style={{ minHeight: '100dvh', background: '#080809' }}>
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

      <div style={{ padding: '24px 20px 120px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <ServiceHero imageUrl={service.hero_image_url} serviceName={service.name} height="260px" />

        {/* Name, availability, tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <AvailabilityBadge available={service.is_available} />
          <h1 style={{
            color: '#F3F3F3',
            fontSize: '28px',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            letterSpacing: '-0.5px',
            lineHeight: '1.2',
          }}>
            {service.name}
          </h1>
          {service.tagline && (
            <p style={{
              color: 'rgba(243,243,243,0.45)',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              lineHeight: '1.65',
            }}>
              {service.tagline}
            </p>
          )}
        </div>

        {/* Detail facts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {facts.map(f => <DetailFact key={f.label} {...f} />)}
        </div>

        {/* Deep dive link */}
        {service.literature && (
          <Link
            href={`/services/${id}/learn-more`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '16px',
              background: 'rgba(110,1,240,0.07)',
              border: '1px solid rgba(110,1,240,0.18)',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(110,1,240,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <BookOpen size={16} color="#9E56F5" />
            </div>
            <div>
              <p style={{ color: '#F3F3F3', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                The full approach
              </p>
              <p style={{ color: 'rgba(158,86,245,0.7)', fontSize: '12px', fontFamily: 'Inter, sans-serif', margin: '2px 0 0' }}>
                Literature & deliverables →
              </p>
            </div>
          </Link>
        )}

        <PackageSelector
          packages={packages}
          selectedId={selectedPackageId}
          onSelect={pkg => setSelectedPackageId(pkg.id)}
        />

        {deliverables.length > 0 && (
          <DeliverablesList deliverables={deliverables} />
        )}
      </div>

      {/* Persistent bottom bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 20px 36px',
        background: 'linear-gradient(to top, #080809 55%, rgba(8,8,9,0))',
        zIndex: 10,
      }}>
        {selectedPackage && (
          <p style={{
            color: 'rgba(243,243,243,0.35)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            margin: '0 0 8px',
            textAlign: 'center',
          }}>
            {selectedPackage.name} · {selectedPackage.price?.toLocaleString()} {selectedPackage.currency}
          </p>
        )}
        <button
          onClick={() => selectedPackage && setEnquiryOpen(true)}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: selectedPackage
              ? 'linear-gradient(135deg, #FF1FB8 0%, #9E56F5 100%)'
              : 'rgba(255,255,255,0.06)',
            border: selectedPackage ? 'none' : '1px solid rgba(255,255,255,0.09)',
            color: selectedPackage ? '#F3F3F3' : 'rgba(255,255,255,0.22)',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            cursor: selectedPackage ? 'pointer' : 'default',
            transition: 'opacity 0.15s ease',
            boxShadow: selectedPackage ? '0 4px 28px rgba(255,31,184,0.28)' : 'none',
            letterSpacing: '0.1px',
          }}
          onMouseEnter={e => { if (selectedPackage) e.currentTarget.style.opacity = '0.9' }}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {selectedPackage ? 'PAY' : 'Select a package to continue'}
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
  )
}
