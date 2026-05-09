'use client'

import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useServiceMutations } from '@/hooks/useServiceMutations'

export default function DeliverableEditSheet({ deliverable, serviceId, nextOrderIndex, isNew, onClose, onSuccess }) {
  const [label, setLabel] = useState(deliverable?.label || '')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { updateDeliverable, addDeliverable, deleteDeliverable, saving, error } = useServiceMutations()

  async function handleSave() {
    const ok = isNew
      ? await addDeliverable(serviceId, label.trim(), nextOrderIndex)
      : await updateDeliverable(deliverable.id, { label: label.trim() })
    if (ok) { onSuccess(); onClose() }
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    const ok = await deleteDeliverable(deliverable.id)
    if (ok) { onSuccess(); onClose() }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{
        position: 'relative', background: 'var(--bg-primary)',
        borderRadius: '24px 24px 0 0', padding: '24px 20px 40px',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: '700', fontFamily: 'Inter, sans-serif', margin: 0 }}>
            {isNew ? 'Add deliverable' : 'Edit deliverable'}
          </h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Label</label>
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="e.g. Source files (AI/SVG)"
            autoFocus
            style={{
              width: '100%', padding: '12px 14px', borderRadius: '12px',
              background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)',
              color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(110,1,240,0.5)'}
            onBlur={e => e.target.style.borderColor = 'var(--bg-card-border)'}
          />
        </div>

        {error && <p style={{ color: '#E44FC6', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: 0 }}>Save failed. Try again.</p>}

        <button onClick={handleSave} disabled={!label.trim() || saving} style={{
          width: '100%', padding: '15px', borderRadius: '14px',
          background: label.trim() ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
          border: label.trim() ? 'none' : '1px solid var(--bg-card-border)',
          color: label.trim() ? '#F3F3F3' : 'var(--text-secondary)',
          fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
          cursor: label.trim() ? 'pointer' : 'default',
        }}>
          {saving ? 'Saving…' : isNew ? 'Add deliverable' : 'Save changes'}
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
            {confirmDelete ? 'Tap again to confirm delete' : 'Delete deliverable'}
          </button>
        )}
      </div>
    </div>
  )
}
