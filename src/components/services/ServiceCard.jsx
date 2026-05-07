'use client'

import { useServicesContext } from '@/context/ServicesContext'
import TagBadge from './TagBadge'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service }) {
  const { openSlideup } = useServicesContext()

  const tags = service.service_tag_assignments?.map(a => a.tag_id) || []

  return (
    <div
      style={{
        borderRadius: '16px',
        background: 'var(--bg-card)',
        border: '1px solid var(--bg-card-border)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        cursor: 'pointer',
        transition: 'border-color 0.18s ease',
      }}
      onClick={() => openSlideup(service.id)}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(110,1,240,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-card-border)'}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 style={{
          color: 'var(--text-primary)',
          fontSize: '17px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
        }}>
          {service.name}
        </h3>
        {service.tagline && (
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            lineHeight: '1.5',
          }}>
            {service.tagline}
          </p>
        )}
      </div>

      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map(tagId => (
            <TagBadge key={tagId} label={tagId.replace('tag-', '')} />
          ))}
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#9E56F5',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
      }}>
        View details <ArrowRight size={14} />
      </div>
    </div>
  )
}

