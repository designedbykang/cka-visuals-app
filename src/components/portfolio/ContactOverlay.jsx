'use client'

import { usePortfolioContext } from '@/context/PortfolioContext'
import { useRouter } from 'next/navigation'

export default function ContactOverlay() {
  const { contactOverlayOpen, setContactOverlayOpen } = usePortfolioContext()
  const router = useRouter()

  if (!contactOverlayOpen) return null

  const labelStyle = {
    color: 'rgba(243,243,243,0.4)',
    fontSize: '10px',
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    margin: '0 0 6px',
  }

  const valueStyle = {
    color: '#F3F3F3',
    fontSize: '18px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    margin: 0,
    textDecoration: 'none',
  }

  return (
    <div
      onClick={() => setContactOverlayOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(18,15,15,0.72)',
        backdropFilter: 'blur(2px)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        {/* Studio name */}
        <div>
          <p style={labelStyle}>Studio</p>
          <p style={valueStyle}>CKA Visuals</p>
        </div>

        {/* Phone */}
        <div>
          <p style={labelStyle}>WhatsApp</p>
          <a
            href="https://wa.me/237671122318"
            target="_blank"
            rel="noopener noreferrer"
            style={valueStyle}
          >
            +237 671 122 318
          </a>
        </div>

        {/* Email */}
        <div>
          <p style={labelStyle}>Email</p>
          <a
            href="mailto:hello@ckavisuals.com"
            style={valueStyle}
          >
            hello@ckavisuals.com
          </a>
        </div>

        {/* Cities */}
        <div>
          <p style={labelStyle}>We operate in</p>
          <p style={valueStyle}>Lagos · Buea · Accra</p>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(243,243,243,0.1)',
        }} />

        {/* Utility links */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { label: 'FAQ', path: '/faq' },
            { label: 'Legal', path: '/legal' },
          ].map(({ label, path }) => (
            <button
              key={label}
              onClick={() => {
                setContactOverlayOpen(false)
                router.push(path)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243,243,243,0.4)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
