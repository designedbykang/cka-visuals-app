'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function PortalPage() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '40px 24px',
    }}>
      <button
        onClick={() => router.back()}
        style={{
          position: 'absolute',
          top: '24px',
          left: '20px',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="Go back"
      >
        <ArrowLeft size={22} color="var(--text-primary)" />
      </button>

      <img
        src="/logo.png"
        alt="CKA Visuals"
        style={{
          height: '32px',
          width: 'auto',
          objectFit: 'contain',
          marginBottom: '32px',
          opacity: 0.9,
        }}
      />

      <h1 style={{
        color: 'var(--text-primary)',
        fontSize: '32px',
        fontWeight: '700',
        fontFamily: 'Inter, sans-serif',
        margin: '0 0 12px',
        letterSpacing: '-0.5px',
      }}>
        Portal
      </h1>

      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '16px',
        fontFamily: 'Inter, sans-serif',
        margin: 0,
      }}>
        Coming soon.
      </p>
    </div>
  )
}
