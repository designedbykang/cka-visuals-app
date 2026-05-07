'use client'

import { useState } from 'react'
import { useServicesContext } from '@/context/ServicesContext'
import { useAdmin } from '@/context/AdminContext'
import { useLongPress } from '@/hooks/useLongPress'
import ServiceEditSheet from './ServiceEditSheet'
import { Pencil } from 'lucide-react'

function getMinPrice(service) {
  const pkgs = service.service_packages || []
  if (!pkgs.length) return null
  const prices = pkgs.map(p => p.price).filter(p => typeof p === 'number')
  if (!prices.length) return null
  return { price: Math.min(...prices), currency: pkgs[0].currency || 'XAF' }
}

export default function ServiceCard({ service, onUpdated }) {
  const { openSlideup, activeTagId } = useServicesContext()
  const { isAdmin } = useAdmin()
  const [editOpen, setEditOpen] = useState(false)

  const tags = service.service_tag_assignments?.map(a => a.tag_id) || []

  if (activeTagId && !tags.includes(activeTagId)) return null

  const minPrice = getMinPrice(service)

  const longPress = useLongPress(() => {
    if (isAdmin) setEditOpen(true)
  })

  const hasIllustration = Boolean(service.illustration_url)

  return (
    <>
      <div
        {...(isAdmin ? longPress : {})}
        onClick={() => !editOpen && openSlideup(service.id)}
        style={{
          borderRadius: '20px',
          background: '#111118',
          border: isAdmin ? '1.5px dashed rgba(110,1,240,0.35)' : '1px solid rgba(255,255,255,0.06)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          cursor: 'pointer',
          position: 'relative',
          userSelect: 'none',
          minHeight: '120px',
        }}
      >
        {isAdmin && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.5 }}>
            <Pencil size={12} color="#9E56F5" />
          </div>
        )}

        {/* Left — text */}
        <div style={{
          flex: '1 1 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          justifyContent: 'space-between',
          minWidth: 0,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <h3 style={{
              color: '#F3F3F3',
              fontSize: '18px',
              fontWeight: '800',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
              lineHeight: '1.15',
            }}>
              {service.name}
            </h3>
            {service.tagline && (
              <p style={{
                color: 'rgba(243,243,243,0.65)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {service.tagline}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {minPrice && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(200,255,0,0.1)',
                color: '#C8FF00',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                padding: '3px 8px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>
                {minPrice.currency} {minPrice.price.toLocaleString()}
              </span>
            )}
            <button
              onClick={e => { e.stopPropagation(); openSlideup(service.id) }}
              style={{
                background: '#FF3B8C',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '5px 14px',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              BUY
            </button>
          </div>
        </div>

        {/* Right — illustration */}
        <div style={{
          width: '96px',
          flexShrink: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          background: hasIllustration
            ? 'transparent'
            : 'linear-gradient(135deg, rgba(110,1,240,0.25) 0%, rgba(158,86,245,0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '88px',
        }}>
          {hasIllustration ? (
            <img
              src={service.illustration_url}
              alt={service.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(110,1,240,0.4)',
            }} />
          )}
        </div>
      </div>

      {editOpen && (
        <ServiceEditSheet
          service={service}
          onClose={() => setEditOpen(false)}
          onSuccess={() => onUpdated?.()}
        />
      )}
    </>
  )
}
