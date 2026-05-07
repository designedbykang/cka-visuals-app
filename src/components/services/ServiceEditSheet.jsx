'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useServiceMutations } from '@/hooks/useServiceMutations'

export default function ServiceEditSheet({ service, onClose, onSuccess }) {
  const [name, setName] = useState(service.name || '')
  const [tagline, setTagline] = useState(service.tagline || '')
  const [isVisible, setIsVisible] = useState(service.is_visible !== false)
  const { updateService, saving, error } = useServiceMutations()

  async function handleSave() {
    const ok = await updateService(service.id, { name, tagline, is_visible: isVisible })
    if (ok) { onSuccess(); onClose() }
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
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{
        position: 'relative',
        background: 'var(--bg-primary)',
        borderRadius: '24px 24px 0 0',
        padding: '24px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: '700', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Edit service
          </h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(110,1,240,0.5)'}
            onBlur={e => e.target.style.borderColor = 'var(--bg-card-border)'} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Tagline</label>
          <textarea value={tagline} onChange={e => setTagline(e.target.value)} rows={2}
            style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
            onFocus={e => e.target.style.borderColor = 'rgba(110,1,240,0.5)'}
            onBlur={e => e.target.style.borderColor = 'var(--bg-card-border)'} />
        </div>

        <button
          onClick={() => setIsVisible(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderRadius: '12px',
            background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Visible to public</span>
          <div style={{
            width: '40px', height: '22px', borderRadius: '11px',
            background: isVisible ? '#6E01F0' : 'var(--bg-card-border)',
            position: 'relative', transition: 'background 0.2s ease',
          }}>
            <div style={{
              position: 'absolute', top: '3px',
              left: isVisible ? '21px' : '3px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#F3F3F3', transition: 'left 0.2s ease',
            }} />
          </div>
        </button>

        {error && <p style={{ color: '#E44FC6', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: 0 }}>Save failed. Try again.</p>}

        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          style={{
            width: '100%', padding: '15px', borderRadius: '14px',
            background: name.trim() ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
            border: name.trim() ? 'none' : '1px solid var(--bg-card-border)',
            color: name.trim() ? '#F3F3F3' : 'var(--text-secondary)',
            fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
            cursor: name.trim() ? 'pointer' : 'default',
          }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
