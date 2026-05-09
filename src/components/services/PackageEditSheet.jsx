'use client'

import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useServiceMutations } from '@/hooks/useServiceMutations'

export default function PackageEditSheet({ pkg, serviceId, isNew, onClose, onSuccess }) {
  const [name, setName] = useState(pkg?.name || '')
  const [price, setPrice] = useState(pkg?.price?.toString() || '')
  const [currency, setCurrency] = useState(pkg?.currency || 'XAF')
  const [description, setDescription] = useState(pkg?.description || '')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { updatePackage, addPackage, deletePackage, saving, error } = useServiceMutations()

  const canSave = name.trim() && price.trim() && !isNaN(Number(price))

  async function handleSave() {
    const fields = {
      name: name.trim(),
      price: Number(price),
      currency,
      description: description.trim(),
    }
    const ok = isNew
      ? await addPackage(serviceId, fields)
      : await updatePackage(pkg.id, fields)
    if (ok) { onSuccess(); onClose() }
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    const ok = await deletePackage(pkg.id)
    if (ok) { onSuccess(); onClose() }
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '12px',
    background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
    color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none',
  }

  const focusOn = e => { e.target.style.borderColor = 'rgba(110,1,240,0.5)' }
  const focusOff = e => { e.target.style.borderColor = 'var(--bg-card-border)' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{
        position: 'relative', background: 'var(--bg-primary)',
        borderRadius: '24px 24px 0 0', padding: '24px 20px 40px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        maxHeight: '90dvh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: '700', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            {isNew ? 'Add package' : 'Edit package'}
          </h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Package name</label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Price</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
          </div>
          <div style={{ width: '90px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Currency</label>
            <input value={currency} onChange={e => setCurrency(e.target.value)} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2}
            style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }} onFocus={focusOn} onBlur={focusOff} />
        </div>

        {error && <p style={{ color: '#E44FC6', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: 0 }}>Save failed. Try again.</p>}

        <button onClick={handleSave} disabled={!canSave || saving} style={{
          width: '100%', padding: '15px', borderRadius: '14px',
          background: canSave ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
          border: canSave ? 'none' : '1px solid var(--bg-card-border)',
          color: canSave ? '#F3F3F3' : 'var(--text-secondary)',
          fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
          cursor: canSave ? 'pointer' : 'default',
        }}>
          {saving ? 'Saving…' : isNew ? 'Add package' : 'Save changes'}
        </button>

        {!isNew && (
          <button onClick={handleDelete} disabled={saving} style={{
            width: '100%', padding: '13px', borderRadius: '14px',
            background: confirmDelete ? 'rgba(228,79,198,0.12)' : 'transparent',
            border: `1px solid ${confirmDelete ? '#E44FC6' : 'var(--bg-card-border)'}`,
            color: confirmDelete ? '#E44FC6' : 'var(--text-secondary)',
            fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <Trash2 size={14} />
            {confirmDelete ? 'Tap again to confirm delete' : 'Delete package'}
          </button>
        )}
      </div>
    </div>
  )
}
