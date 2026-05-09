'use client'

import { useState, useRef } from 'react'
import { X, ImagePlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useServiceMutations } from '@/hooks/useServiceMutations'

export default function HeroUploadSheet({ service, onClose, onSuccess }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(service.hero_image_url || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef()
  const { updateService } = useServiceMutations()

  function handleFilePick(e) {
    const picked = e.target.files[0]
    if (!picked) return
    setFile(picked)
    setPreview(URL.createObjectURL(picked))
    setError(null)
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const ext = file.name.split('.').pop()
      const path = `${service.id}/hero.${ext}`

      const { error: uploadErr } = await supabase.storage
        .from('service-heroes')
        .upload(path, file, { upsert: true })

      if (uploadErr) throw uploadErr

      const { data: urlData } = supabase.storage
        .from('service-heroes')
        .getPublicUrl(path)

      const ok = await updateService(service.id, { hero_image_url: urlData.publicUrl })
      if (ok) { onSuccess(); onClose() }
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
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
            Hero image
          </h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={15} />
          </button>
        </div>

        {/* Preview area */}
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            width: '100%', height: '180px', borderRadius: '14px',
            background: preview ? 'transparent' : 'var(--bg-card)',
            border: `2px dashed ${preview ? 'transparent' : 'var(--bg-card-border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', overflow: 'hidden', position: 'relative',
          }}
        >
          {preview ? (
            <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <ImagePlus size={28} color="var(--text-secondary)" />
              <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
                Tap to select image
              </span>
            </div>
          )}
          {preview && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}
            >
              <span style={{ color: '#F3F3F3', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>Change</span>
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" onChange={handleFilePick} style={{ display: 'none' }} />

        {error && <p style={{ color: '#E44FC6', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: 0 }}>{error}</p>}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            width: '100%', padding: '15px', borderRadius: '14px',
            background: file ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
            border: file ? 'none' : '1px solid var(--bg-card-border)',
            color: file ? '#F3F3F3' : 'var(--text-secondary)',
            fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
            cursor: file ? 'pointer' : 'default',
          }}
        >
          {uploading ? 'Uploading…' : 'Upload hero image'}
        </button>
      </div>
    </div>
  )
}
