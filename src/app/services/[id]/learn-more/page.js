'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useService } from '@/app/hooks/useService'
import { useServicesContext } from '@/context/ServicesContext'
import ServiceLiterature from '@/components/services/ServiceLiterature'
import DeliverablesList from '@/components/services/DeliverablesList'
import EnquirySheet from '@/components/services/EnquirySheet'

const TABS = [
  { id: 'literature', label: 'The approach' },
  { id: 'deliverables', label: 'What you get' },
]

export default function LearnMorePage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, deliverables, loading } = useService(id)
  const { selectedPackageId, setSelectedPackageId } = useServicesContext()
  const [activeTab, setActiveTab] = useState('literature')
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const selectedPackage = null // packages not loaded here — handled via deep link back

  return (
    <div style={{ minHeight: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(8,8,9,0.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '56px 20px 16px',
        }}>
          <button
            onClick={() => router.back()}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(243,243,243,0.6)',
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: 'rgba(243,243,243,0.35)', fontSize: '11px', fontFamily: 'Inter, sans-serif', margin: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Back to overview
            </p>
            <h1 style={{
              color: '#F3F3F3',
              fontSize: '17px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {loading ? '…' : service?.name}
            </h1>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '0', padding: '0 20px' }}>
          {TABS.map(tab => {
            const active = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 0',
                  marginRight: '24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '2px solid #FF1FB8' : '2px solid transparent',
                  color: active ? '#F3F3F3' : 'rgba(243,243,243,0.35)',
                  fontSize: '14px',
                  fontWeight: active ? '600' : '400',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  letterSpacing: '-0.1px',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '28px 20px 120px', flex: 1 }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '18px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', width: i % 2 === 0 ? '70%' : '100%' }} />
            ))}
          </div>
        ) : activeTab === 'literature' ? (
          service?.literature
            ? <ServiceLiterature content={service.literature} />
            : (
              <p style={{ color: 'rgba(243,243,243,0.3)', fontSize: '15px', fontFamily: 'Inter, sans-serif', textAlign: 'center', padding: '40px 0' }}>
                No write-up yet for this service.
              </p>
            )
        ) : (
          deliverables.length > 0
            ? <DeliverablesList deliverables={deliverables} />
            : (
              <p style={{ color: 'rgba(243,243,243,0.3)', fontSize: '15px', fontFamily: 'Inter, sans-serif', textAlign: 'center', padding: '40px 0' }}>
                Deliverables are discussed during onboarding.
              </p>
            )
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
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #FF1FB8 0%, #9E56F5 100%)',
            border: 'none',
            color: '#F3F3F3',
            fontSize: '15px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            letterSpacing: '0.1px',
            boxShadow: '0 4px 28px rgba(255,31,184,0.25)',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          ← Back to overview &amp; packages
        </button>
      </div>
    </div>
  )
}
