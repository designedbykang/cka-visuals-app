'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useEnquirySubmit } from '@/app/hooks/useEnquirySubmit'

export default function EnquirySheet({ service, selectedPackage, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { submit, loading } = useEnquirySubmit()

  const canSubmit = name.trim().length >= 2

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit || loading) return

    const result = await submit({
      name: name.trim(),
      description: description.trim(),
      serviceId: service.id,
      serviceName: service.name,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      currency: selectedPackage.currency,
    })

    if (result.whatsappUrl) {
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer')
      onClose()
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 14px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#F3F3F3',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      <div style={{
        position: 'relative',
        background: '#0D0D10',
        borderRadius: '28px 28px 0 0',
        padding: '0 20px 44px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90dvh',
        overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.07)',
        borderBottom: 'none',
        scrollbarWidth: 'none',
      }}>
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 0 0', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Founder avatar + headline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          padding: '8px 0 28px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6E01F0 0%, #E44FC6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            color: '#F3F3F3',
            flexShrink: 0,
            boxShadow: '0 0 0 4px rgba(110,1,240,0.18)',
          }}>
            C
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <h2 style={{
              color: '#F3F3F3',
              fontSize: '20px',
              fontWeight: '800',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              letterSpacing: '-0.35px',
            }}>
              Let&apos;s make something great.
            </h2>
            <p style={{
              color: 'rgba(243,243,243,0.4)',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              lineHeight: '1.6',
              maxWidth: '280px',
            }}>
              Tell me about your project and I&apos;ll reply on WhatsApp within the hour.
            </p>
          </div>
        </div>

        {/* Selected package summary */}
        <div style={{
          padding: '12px 14px',
          borderRadius: '12px',
          background: 'rgba(255,31,184,0.07)',
          border: '1px solid rgba(255,31,184,0.15)',
          marginBottom: '20px',
          flexShrink: 0,
        }}>
          <p style={{
            color: 'rgba(255,31,184,0.65)',
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            margin: '0 0 3px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Selected
          </p>
          <p style={{ color: '#F3F3F3', fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            {service.name} — {selectedPackage.name}
          </p>
          <p style={{ color: '#C8FF00', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: '3px 0 0', fontWeight: '600' }}>
            {selectedPackage.price?.toLocaleString()} {selectedPackage.currency}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(255,31,184,0.4)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What are you working on? (optional)"
            rows={4}
            style={{ ...inputStyle, resize: 'none', lineHeight: '1.55' }}
            onFocus={e => (e.target.style.borderColor = 'rgba(255,31,184,0.4)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
          />

          <button
            type="submit"
            disabled={!canSubmit || loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: canSubmit ? '#25D366' : 'rgba(255,255,255,0.05)',
              border: 'none',
              color: canSubmit ? '#0D0D10' : 'rgba(255,255,255,0.2)',
              fontSize: '15px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              cursor: canSubmit ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'opacity 0.15s ease',
              marginTop: '4px',
              boxShadow: canSubmit ? '0 4px 24px rgba(37,211,102,0.25)' : 'none',
            }}
            onMouseEnter={e => { if (canSubmit) e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {loading ? 'Opening WhatsApp…' : '↗ Continue on WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  )
}
