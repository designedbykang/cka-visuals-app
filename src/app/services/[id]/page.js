'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Check, Plus } from 'lucide-react'
import { useService } from '@/hooks/useService'
import { useAdmin } from '@/context/AdminContext'
import { useLongPress } from '@/hooks/useLongPress'
import { useServicesContext } from '@/context/ServicesContext'
import ServiceHero from '@/components/services/ServiceHero'
import AvailabilityToggle from '@/components/services/AvailabilityToggle'
import DetailFacts from '@/components/services/DetailFacts'
import PackageList from '@/components/services/PackageList'
import PersistentBar from '@/components/services/PersistentBar'
import HeroUploadSheet from '@/components/services/HeroUploadSheet'
import ServiceEditSheet from '@/components/services/ServiceEditSheet'
import PackageEditSheet from '@/components/services/PackageEditSheet'
import DeliverableEditSheet from '@/components/services/DeliverableEditSheet'

function DeliverableRow({ deliverable, isAdmin, onLongPress }) {
  const longPress = useLongPress(() => { if (isAdmin && onLongPress) onLongPress(deliverable) })
  return (
    <div
      {...(isAdmin ? longPress : {})}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', userSelect: 'none' }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
        background: 'rgba(110,1,240,0.2)', border: '1px solid rgba(110,1,240,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check size={11} color="#9E56F5" />
      </div>
      <span style={{ color: 'rgba(243,243,243,0.8)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
        {deliverable.label}
      </span>
    </div>
  )
}

export default function ServicePage() {
  const { id } = useParams()
  const { isAdmin } = useAdmin()
  const { selectedPackageId, setSelectedPackageId } = useServicesContext()
  const [fetchKey, setFetchKey] = useState(0)
  const { service, packages, deliverables, loading } = useService(id, fetchKey)
  const refresh = () => setFetchKey(k => k + 1)

  const [heroUploadOpen, setHeroUploadOpen] = useState(false)
  const [editServiceOpen, setEditServiceOpen] = useState(false)
  const [editPkg, setEditPkg] = useState(null)
  const [addPkgOpen, setAddPkgOpen] = useState(false)
  const [editDeliverable, setEditDeliverable] = useState(null)
  const [addDeliverableOpen, setAddDeliverableOpen] = useState(false)

  const heroLongPress = useLongPress(() => { if (isAdmin) setHeroUploadOpen(true) })
  const nameLongPress = useLongPress(() => { if (isAdmin) setEditServiceOpen(true) })

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: i === 1 ? '260px' : '80px', borderRadius: '16px', background: '#111118' }} />
        ))}
      </div>
    )
  }

  if (!service) return null

  return (
    <>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', paddingBottom: '100px' }}>
        {/* Hero */}
        <div
          {...(isAdmin ? heroLongPress : {})}
          style={{ position: 'relative', userSelect: 'none' }}
        >
          <ServiceHero service={service} serviceName={service.name} height="300px" variant="static" />
          {isAdmin && (
            <div style={{
              position: 'absolute', bottom: '12px', right: '12px',
              background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '4px 10px',
              color: '#9E56F5', fontSize: '10px', fontFamily: 'Inter, sans-serif', fontWeight: '600',
              backdropFilter: 'blur(6px)',
            }}>
              Hold to change
            </div>
          )}
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Availability */}
          <AvailabilityToggle available={service.available} />

          {/* Name + tagline */}
          <div
            {...(isAdmin ? nameLongPress : {})}
            style={{ display: 'flex', flexDirection: 'column', gap: '6px', userSelect: 'none' }}
          >
            <h1 style={{
              color: '#F3F3F3',
              fontSize: '28px',
              fontWeight: '800',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              letterSpacing: '-0.6px',
              lineHeight: '1.15',
            }}>
              {service.name}
            </h1>
            {service.tagline && (
              <p style={{
                color: 'rgba(243,243,243,0.6)',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
                lineHeight: '1.6',
              }}>
                {service.tagline}
              </p>
            )}
            {isAdmin && (
              <span style={{ color: '#9E56F5', fontSize: '11px', fontFamily: 'Inter, sans-serif', opacity: 0.5 }}>
                Hold to edit
              </span>
            )}
          </div>

          {/* Facts grid */}
          <DetailFacts facts={service.facts} />

          {/* Deep dive link */}
          {service.literature && (
            <Link
              href={`/services/${id}/learn-more`}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 16px', borderRadius: '14px',
                background: 'rgba(110,1,240,0.06)', border: '1px solid rgba(110,1,240,0.15)',
                textDecoration: 'none',
              }}
            >
              <BookOpen size={18} color="#9E56F5" />
              <div>
                <p style={{ color: '#F3F3F3', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                  Deep dive
                </p>
                <p style={{ color: 'rgba(243,243,243,0.5)', fontSize: '12px', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                  Read our full approach to {service.name.toLowerCase()}
                </p>
              </div>
            </Link>
          )}

          {/* Package list */}
          <PackageList
            packages={packages}
            selectedId={selectedPackageId}
            onSelect={pkg => setSelectedPackageId(pkg.id)}
            isAdmin={isAdmin}
            onLongPress={pkg => setEditPkg(pkg)}
          />
          {isAdmin && (
            <button onClick={() => setAddPkgOpen(true)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '12px', borderRadius: '12px', background: 'transparent',
              border: '1.5px dashed rgba(110,1,240,0.35)', color: '#9E56F5',
              fontSize: '13px', fontWeight: '600', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
            }}>
              <Plus size={14} /> Add package
            </button>
          )}

          {/* Deliverables */}
          {(deliverables.length > 0 || isAdmin) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{
                color: 'rgba(243,243,243,0.45)', fontSize: '11px', fontWeight: '600',
                fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0,
              }}>
                What's included
              </p>
              {deliverables.map(d => (
                <DeliverableRow
                  key={d.id}
                  deliverable={d}
                  isAdmin={isAdmin}
                  onLongPress={() => setEditDeliverable(d)}
                />
              ))}
              {isAdmin && (
                <button onClick={() => setAddDeliverableOpen(true)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px', borderRadius: '10px', background: 'transparent',
                  border: '1.5px dashed rgba(110,1,240,0.35)', color: '#9E56F5',
                  fontSize: '13px', fontWeight: '600', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                }}>
                  <Plus size={14} /> Add deliverable
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <PersistentBar variant="detail" serviceId={id} />

      {heroUploadOpen && (
        <HeroUploadSheet service={service} onClose={() => setHeroUploadOpen(false)} onSuccess={refresh} />
      )}
      {editServiceOpen && (
        <ServiceEditSheet service={service} onClose={() => setEditServiceOpen(false)} onSuccess={refresh} />
      )}
      {editPkg && (
        <PackageEditSheet pkg={editPkg} serviceId={id} onClose={() => setEditPkg(null)} onSuccess={refresh} />
      )}
      {addPkgOpen && (
        <PackageEditSheet isNew serviceId={id} onClose={() => setAddPkgOpen(false)} onSuccess={refresh} />
      )}
      {editDeliverable && (
        <DeliverableEditSheet deliverable={editDeliverable} serviceId={id} onClose={() => setEditDeliverable(null)} onSuccess={refresh} />
      )}
      {addDeliverableOpen && (
        <DeliverableEditSheet isNew serviceId={id} nextOrderIndex={deliverables.length + 1} onClose={() => setAddDeliverableOpen(false)} onSuccess={refresh} />
      )}
    </>
  )
}
