'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useServicesContext } from '@/context/ServicesContext'

export default function PersistentBar({ variant = 'detail', serviceId }) {
  const router = useRouter()
  const { selectedPackageId, openContactPopup } = useServicesContext()

  const hasPackage = Boolean(selectedPackageId)

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '12px 20px 32px',
      background: 'linear-gradient(to top, var(--bg-primary) 60%, transparent)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 10,
    }}>
      {/* Back nav */}
      <button
        onClick={() => router.back()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '48px',
          padding: '0 14px',
          borderRadius: '14px',
          background: 'var(--bg-card)',
          border: '1px solid var(--bg-card-border)',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <ArrowLeft size={16} />
        {variant === 'learn-more' ? 'Back' : 'Services'}
      </button>

      {/* CTA */}
      <button
        onClick={() => hasPackage && openContactPopup()}
        disabled={!hasPackage}
        style={{
          flex: 1,
          height: '48px',
          borderRadius: '14px',
          background: hasPackage ? '#FF3B8C' : 'var(--bg-card)',
          border: hasPackage ? 'none' : '1px solid var(--bg-card-border)',
          color: hasPackage ? '#fff' : 'var(--text-secondary)',
          fontSize: '15px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          cursor: hasPackage ? 'pointer' : 'default',
          transition: 'background 0.18s ease',
          boxShadow: hasPackage ? '0 4px 20px rgba(255,59,140,0.4)' : 'none',
        }}
      >
        {hasPackage ? 'Pay' : 'Select a package'}
      </button>
    </div>
  )
}
