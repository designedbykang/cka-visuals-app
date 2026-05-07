'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useServicesContext } from '@/context/ServicesContext'
import { useService } from '@/hooks/useService'
import { useEnquirySubmit } from '@/hooks/useEnquirySubmit'

export default function ContactPopup() {
  const {
    contactPopupOpen, closeContactPopup,
    selectedServiceId, selectedPackageId,
  } = useServicesContext()

  const { service, packages } = useService(selectedServiceId)
  const { submit, loading } = useEnquirySubmit()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sent, setSent] = useState(false)

  if (!contactPopupOpen) return null

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || null

  async function handleSend() {
    if (!name.trim() || !description.trim()) return
    const result = await submit({
      name: name.trim(),
      description: description.trim(),
      serviceId: service?.id,
      serviceName: service?.name,
      packageId: selectedPackage?.id,
      packageName: selectedPackage?.name,
      price: selectedPackage?.price,
      currency: selectedPackage?.currency,
    })
    if (result.success && result.whatsappUrl) {
      setSent(true)
      window.open(result.whatsappUrl, '_blank')
      setTimeout(() => {
        setSent(false)
        setName('')
        setDescription('')
        closeContactPopup()
      }, 1200)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* backdrop */}
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
        onClick={closeContactPopup}
      />

      {/* card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        background: '#111118',
        borderRadius: '24px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>
        {/* close */}
        <button
          onClick={closeContactPopup}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.08)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(243,243,243,0.5)',
          }}
        >
          <X size={14} />
        </button>

        {/* profile photo + headline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            border: '2.5px solid #6E01F0',
            boxShadow: '0 0 20px rgba(110,1,240,0.5)',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <img
              src="/cka-profile.jpg"
              alt="CKA Visuals"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h2 style={{
              color: '#F3F3F3',
              fontSize: '22px',
              fontWeight: '800',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              letterSpacing: '-0.5px',
            }}>
              Let's make it happen.
            </h2>
            <p style={{
              color: 'rgba(243,243,243,0.55)',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              lineHeight: '1.55',
            }}>
              Tell us a bit about your project and we'll reach out via WhatsApp to kick things off.
            </p>
          </div>
        </div>

        {/* inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '13px 14px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F3F3F3',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="Describe your project…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '13px 14px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F3F3F3',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box',
              lineHeight: '1.5',
            }}
          />
        </div>

        {/* actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handleSend}
            disabled={loading || !name.trim() || !description.trim()}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '14px',
              background: sent ? '#1a9e50' : '#25D366',
              border: 'none',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              cursor: (loading || !name.trim() || !description.trim()) ? 'default' : 'pointer',
              opacity: (loading || !name.trim() || !description.trim()) ? 0.6 : 1,
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {sent ? 'Opening WhatsApp…' : loading ? 'Sending…' : 'Send via WhatsApp'}
          </button>

          <button
            onClick={closeContactPopup}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(243,243,243,0.4)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
