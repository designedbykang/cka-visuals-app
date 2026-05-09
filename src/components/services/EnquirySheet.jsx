'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useEnquirySubmit } from '@/hooks/useEnquirySubmit'

export default function EnquirySheet({ service, selectedPackage, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { submit, loading, error } = useEnquirySubmit()

  const canSubmit = name.trim() && description.trim() && selectedPackage

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

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

    if (result.success) {
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer')
      onClose()
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'var(--bg-card)',
    border: '1px solid var(--bg-card-border)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.18s ease',
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
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      <div style={{
        position: 'relative',
        background: 'var(--bg-primary)',
        borderRadius: '24px 24px 0 0',
        padding: '24px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxHeight: '90dvh',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{
            color: 'var(--text-primary)',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
          }}>
            Get a quote
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {selectedPackage && (
          <div style={{
            padding: '12px 14px',
            borderRadius: '12px',
            background: 'rgba(110,1,240,0.08)',
            border: '1px solid rgba(110,1,240,0.2)',
          }}>
            <p style={{ color: '#9E56F5', fontSize: '12px', fontFamily: 'Inter, sans-serif', margin: '0 0 2px' }}>
              Selected package
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              {service.name} — {selectedPackage.name}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: '2px 0 0' }}>
              {selectedPackage.price?.toLocaleString()} {selectedPackage.currency}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              Your name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Amara Osei"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(110,1,240,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--bg-card-border)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              Tell us about your project
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What are you building? Who is it for? Any deadlines?"
              rows={4}
              style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
              onFocus={e => e.target.style.borderColor = 'rgba(110,1,240,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--bg-card-border)'}
            />
          </div>

          {error && (
            <p style={{ color: '#E44FC6', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '14px',
              background: canSubmit ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
              border: canSubmit ? 'none' : '1px solid var(--bg-card-border)',
              color: canSubmit ? '#F3F3F3' : 'var(--text-secondary)',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              cursor: canSubmit ? 'pointer' : 'default',
              transition: 'all 0.18s ease',
            }}
          >
            {loading ? 'Sending…' : 'Send via WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  )
}
