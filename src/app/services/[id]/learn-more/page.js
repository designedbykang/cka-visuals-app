'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useService } from '@/hooks/useService'
import LearnMoreTabs from '@/components/services/LearnMoreTabs'
import LearnMoreContent from '@/components/services/LearnMoreContent'
import PersistentBar from '@/components/services/PersistentBar'

export default function LearnMorePage() {
  const { id } = useParams()
  const { service, deliverables, loading } = useService(id)
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', paddingBottom: '100px' }}>
        {/* Sticky header with service name + tabs */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'var(--bg-primary)',
          zIndex: 10,
          paddingTop: '56px',
        }}>
          <div style={{ padding: '0 20px 12px' }}>
            <p style={{
              color: 'rgba(243,243,243,0.4)',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              margin: '0 0 2px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Deep dive
            </p>
            <h1 style={{
              color: '#F3F3F3',
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              letterSpacing: '-0.3px',
            }}>
              {loading ? '…' : service?.name}
            </h1>
          </div>
          <LearnMoreTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Content */}
        <div style={{ padding: '28px 20px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ height: '18px', borderRadius: '6px', background: '#111118', width: i % 2 === 0 ? '75%' : '100%' }} />
              ))}
            </div>
          ) : (
            <LearnMoreContent activeTab={activeTab} service={service} deliverables={deliverables} />
          )}
        </div>
      </div>

      <PersistentBar variant="learn-more" serviceId={id} />
    </>
  )
}
