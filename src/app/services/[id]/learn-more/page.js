'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useService } from '@/hooks/useService'
import ServiceLiterature from '@/components/services/ServiceLiterature'

export default function LearnMorePage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, loading } = useService(id)

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '56px 20px 20px',
        position: 'sticky',
        top: 0,
        background: 'var(--bg-primary)',
        zIndex: 10,
        borderBottom: '1px solid var(--bg-card-border)',
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
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Deep dive
          </p>
          <h1 style={{
            color: 'var(--text-primary)',
            fontSize: '17px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
          }}>
            {loading ? '…' : service?.name}
          </h1>
        </div>
      </div>

      <div style={{ padding: '28px 20px 60px' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '18px', borderRadius: '6px', background: 'var(--bg-card)', width: i % 2 === 0 ? '75%' : '100%' }} />
            ))}
          </div>
        ) : (
          <ServiceLiterature content={service?.literature} />
        )}
      </div>
    </div>
  )
}

