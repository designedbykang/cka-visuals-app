'use client'

import { useState, useRef } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useTheme } from '@/context/ThemeContext'
import { X, Image, Video, Type, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const EXPIRY_OPTIONS = [
  { label: '24h', hours: 24 },
  { label: '3 days', hours: 72 },
  { label: '7 days', hours: 168 },
  { label: 'No expiry', hours: null },
]

export default function StatusUploadSheet({ onClose, onSuccess }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [mediaType, setMediaType] = useState('image')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [expiry, setExpiry] = useState(EXPIRY_OPTIONS[2])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const handleFilePick = (e) => {
    const picked = e.target.files[0]
    if (!picked) return
    setFile(picked)
    setPreview(URL.createObjectURL(picked))
  }

  const handlePublish = async () => {
    if (!file && mediaType !== 'text') {
      setError('Please select a file')
      return
    }
    if (mediaType === 'text' && !caption) {
      setError('Please add some text')
      return
    }

    setLoading(true)
    setError('')

    try {
      let mediaUrl = null

      // Upload file to Supabase Storage
      if (file) {
        const ext = file.name.split('.').pop()
        const filename = `${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('daily-status-media')
          .upload(filename, file)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('daily-status-media')
          .getPublicUrl(filename)

        mediaUrl = urlData.publicUrl
      }

      // Get current max sequence order
      const { data: existing } = await supabase
        .from('daily_status')
        .select('sequence_order')
        .order('sequence_order', { ascending: false })
        .limit(1)

      const nextOrder = existing?.[0]?.sequence_order
        ? existing[0].sequence_order + 1
        : 1

      // Insert into database
      const { error: insertError } = await supabase
        .from('daily_status')
        .insert({
          media_url: mediaUrl,
          media_type: mediaType,
          caption,
          sequence_order: nextOrder,
          is_active: true,
          expires_at: expiry.hours
            ? new Date(Date.now() + expiry.hours * 3600000).toISOString()
            : null,
        })

      if (insertError) throw insertError

      onSuccess()
      onClose()

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const sheetStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: isDark ? '#1A1A1A' : '#F3F3F3',
    borderRadius: '24px 24px 0 0',
    padding: '24px 24px 48px',
    zIndex: 61,
    border: `1px solid ${isDark
      ? 'rgba(243,243,243,0.08)'
      : 'rgba(110,1,240,0.1)'}`,
    maxHeight: '90vh',
    overflowY: 'auto',
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${isDark
      ? 'rgba(243,243,243,0.12)'
      : 'rgba(110,1,240,0.2)'}`,
    background: isDark
      ? 'rgba(243,243,243,0.06)'
      : 'rgba(110,1,240,0.04)',
    color: isDark ? '#F3F3F3' : '#120F0F',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'none',
  }

  const labelStyle = {
    color: isDark
      ? 'rgba(243,243,243,0.5)'
      : 'rgba(18,15,15,0.5)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '8px',
    display: 'block',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
        }}
      />

      <div style={sheetStyle}>

        {/* Handle */}
        <div style={{
          width: '40px',
          height: '4px',
          borderRadius: '2px',
          background: isDark
            ? 'rgba(243,243,243,0.2)'
            : 'rgba(18,15,15,0.2)',
          margin: '0 auto 24px',
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <p style={{
            color: isDark ? '#F3F3F3' : '#120F0F',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
          }}>
            New Status
          </p>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: isDark
                ? 'rgba(243,243,243,0.08)'
                : 'rgba(110,1,240,0.08)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} color={isDark ? '#F3F3F3' : '#120F0F'} />
          </button>
        </div>

        {/* Media type selector */}
        <span style={labelStyle}>Content Type</span>
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
        }}>
          {[
            { type: 'image', icon: <Image size={16} />, label: 'Photo' },
            { type: 'video', icon: <Video size={16} />, label: 'Video' },
            { type: 'text', icon: <Type size={16} />, label: 'Text' },
          ].map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => {
                setMediaType(type)
                setFile(null)
                setPreview(null)
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '12px',
                background: mediaType === type
                  ? '#6E01F0'
                  : isDark
                    ? 'rgba(243,243,243,0.06)'
                    : 'rgba(110,1,240,0.06)',
                border: `1.5px solid ${mediaType === type
                  ? '#9E56F5'
                  : isDark
                    ? 'rgba(243,243,243,0.1)'
                    : 'rgba(110,1,240,0.15)'}`,
                color: mediaType === type
                  ? '#F3F3F3'
                  : isDark
                    ? 'rgba(243,243,243,0.7)'
                    : '#120F0F',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* File upload area */}
        {mediaType !== 'text' && (
          <div style={{ marginBottom: '20px' }}>
            <span style={labelStyle}>
              {mediaType === 'image' ? 'Photo' : 'Video'}
            </span>

            <input
              ref={fileRef}
              type="file"
              accept={mediaType === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFilePick}
              style={{ display: 'none' }}
            />

            {preview ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    maxHeight: '200px',
                    objectFit: 'cover',
                  }}
                />
                <button
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} color="#F3F3F3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current.click()}
                style={{
                  width: '100%',
                  padding: '32px',
                  borderRadius: '12px',
                  background: isDark
                    ? 'rgba(243,243,243,0.04)'
                    : 'rgba(110,1,240,0.04)',
                  border: `2px dashed ${isDark
                    ? 'rgba(243,243,243,0.15)'
                    : 'rgba(110,1,240,0.2)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <Upload
                  size={24}
                  color={isDark
                    ? 'rgba(243,243,243,0.4)'
                    : 'rgba(110,1,240,0.4)'}
                />
                <span style={{
                  color: isDark
                    ? 'rgba(243,243,243,0.5)'
                    : 'rgba(18,15,15,0.5)',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Tap to select {mediaType === 'image' ? 'photo' : 'video'}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Caption */}
        <div style={{ marginBottom: '20px' }}>
          <span style={labelStyle}>
            {mediaType === 'text' ? 'Text Content' : 'Caption (optional)'}
          </span>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder={mediaType === 'text'
              ? 'What do you want to say?'
              : 'Add a caption...'}
            rows={mediaType === 'text' ? 5 : 3}
            style={inputStyle}
          />
        </div>

        {/* Expiry */}
        <div style={{ marginBottom: '24px' }}>
          <span style={labelStyle}>Expires In</span>
          <div style={{
            display: 'flex',
            gap: '8px',
          }}>
            {EXPIRY_OPTIONS.map(option => (
              <button
                key={option.label}
                onClick={() => setExpiry(option)}
                style={{
                  flex: 1,
                  padding: '10px 4px',
                  borderRadius: '10px',
                  background: expiry.label === option.label
                    ? '#6E01F0'
                    : isDark
                      ? 'rgba(243,243,243,0.06)'
                      : 'rgba(110,1,240,0.06)',
                  border: `1.5px solid ${expiry.label === option.label
                    ? '#9E56F5'
                    : isDark
                      ? 'rgba(243,243,243,0.1)'
                      : 'rgba(110,1,240,0.15)'}`,
                  color: expiry.label === option.label
                    ? '#F3F3F3'
                    : isDark
                      ? 'rgba(243,243,243,0.7)'
                      : '#120F0F',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{
            color: '#E44FC6',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '12px',
          }}>
            {error}
          </p>
        )}

        {/* Publish button */}
        <button
          onClick={handlePublish}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '14px',
            background: loading
              ? 'rgba(110,1,240,0.4)'
              : 'linear-gradient(135deg, #9E56F5, #6E01F0)',
            border: 'none',
            color: '#F3F3F3',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: loading
              ? 'none'
              : '0 4px 20px rgba(110,1,240,0.3)',
          }}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </>
  )
}
