'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Check, Plus, BookOpen } from 'lucide-react'
import { useServicesContext } from '@/context/ServicesContext'
import { useAdmin } from '@/context/AdminContext'
import { useLongPress } from '@/hooks/useLongPress'
import { useService } from '@/hooks/useService'
import ServiceHero from './ServiceHero'
import PackageBox from './PackageBox'
import HeroUploadSheet from './HeroUploadSheet'
import PackageEditSheet from './PackageEditSheet'
import DeliverableEditSheet from './DeliverableEditSheet'

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

export default function ServiceSlideup() {
  const {
    slideupOpen, selectedServiceId, closeSlideup,
    setSelectedPackageId, selectedPackageId,
    openContactPopup,
  } = useServicesContext()
  const { isAdmin } = useAdmin()
  const [fetchKey, setFetchKey] = useState(0)
  const { service, packages, deliverables, loading } = useService(selectedServiceId, fetchKey)

  const [heroUploadOpen, setHeroUploadOpen] = useState(false)
  const [editPkg, setEditPkg] = useState(null)
  const [addPkgOpen, setAddPkgOpen] = useState(false)
  const [editDeliverable, setEditDeliverable] = useState(null)
  const [addDeliverableOpen, setAddDeliverableOpen] = useState(false)

  const heroLongPress = useLongPress(() => { if (isAdmin) setHeroUploadOpen(true) })

  if (!slideupOpen) return null

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || null
  const refresh = () => setFetchKey(k => k + 1)

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* backdrop */}
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
          onClick={closeSlideup}
        />

        {/* sheet */}
        <div style={{
          position: 'relative',
          background: 'var(--bg-primary)',
          borderRadius: '24px 24px 0 0',
          maxHeight: '92dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'var(--bg-card-border)' }} />
          </div>

          {/* header: START PROJECT + X */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px 14px',
            flexShrink: 0,
          }}>
            <div style={{ width: '32px' }} />
            <span style={{
              color: 'rgba(243,243,243,0.6)',
              fontSize: '12px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Start Project
            </span>
            <button
              onClick={closeSlideup}
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

          {/* scrollable body */}
          <div style={{
            overflowY: 'auto',
            flex: 1,
            padding: '0 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            scrollbarWidth: 'none',
          }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: i === 1 ? '220px' : '60px', borderRadius: '14px', background: 'var(--bg-card)' }} />
                ))}
              </div>
            ) : service ? (
              <>
                {/* Hero carousel */}
                <div {...(isAdmin ? heroLongPress : {})} style={{ position: 'relative', userSelect: 'none' }}>
                  <ServiceHero service={service} serviceName={service.name} variant="carousel" />
                  {isAdmin && (
                    <div style={{
                      position: 'absolute', bottom: '28px', right: '10px',
                      background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '4px 8px',
                      color: '#9E56F5', fontSize: '10px', fontFamily: 'Inter, sans-serif', fontWeight: '600',
                      backdropFilter: 'blur(6px)',
                    }}>
                      Hold to change
                    </div>
                  )}
                </div>

                {/* Name + tagline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <h2 style={{
                    color: '#F3F3F3', fontSize: '24px', fontWeight: '800',
                    fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '-0.5px',
                  }}>
                    {service.name}
                  </h2>
                  {service.tagline && (
                    <p style={{
                      color: 'rgba(243,243,243,0.65)', fontSize: '14px',
                      fontFamily: 'Inter, sans-serif', margin: 0, lineHeight: '1.6',
                    }}>
                      {service.tagline}
                    </p>
                  )}
                </div>

                {/* Packages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{
                    color: 'rgba(243,243,243,0.45)', fontSize: '11px', fontWeight: '600',
                    fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0,
                  }}>
                    Choose a package
                  </p>
                  {packages.map(pkg => (
                    <PackageBox
                      key={pkg.id}
                      pkg={pkg}
                      selected={pkg.id === selectedPackageId}
                      onSelect={p => setSelectedPackageId(p.id)}
                      isAdmin={isAdmin}
                      onLongPress={p => setEditPkg(p)}
                    />
                  ))}
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
                </div>

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

                {/* Deep dive link */}
                {service.literature && (
                  <Link
                    href={`/services/${service.id}/learn-more`}
                    onClick={closeSlideup}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      color: 'rgba(243,243,243,0.4)', fontSize: '13px',
                      fontFamily: 'Inter, sans-serif', textDecoration: 'none',
                    }}
                  >
                    <BookOpen size={13} /> Deep dive into {service.name}
                  </Link>
                )}
              </>
            ) : null}
          </div>

          {/* sticky CTA */}
          <div style={{
            padding: '12px 20px 28px',
            flexShrink: 0,
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--bg-card-border)',
          }}>
            <button
              onClick={() => selectedPackage && openContactPopup()}
              disabled={!selectedPackage}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '14px',
                background: selectedPackage ? '#FF3B8C' : 'var(--bg-card)',
                border: selectedPackage ? 'none' : '1px solid var(--bg-card-border)',
                color: selectedPackage ? '#fff' : 'var(--text-secondary)',
                fontSize: '15px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                cursor: selectedPackage ? 'pointer' : 'default',
                transition: 'background 0.18s ease',
                boxShadow: selectedPackage ? '0 4px 20px rgba(255,59,140,0.4)' : 'none',
              }}
            >
              {selectedPackage ? `Book — ${selectedPackage.name}` : 'Select a package to continue'}
            </button>
          </div>
        </div>
      </div>

      {heroUploadOpen && service && (
        <HeroUploadSheet service={service} onClose={() => setHeroUploadOpen(false)} onSuccess={refresh} />
      )}
      {editPkg && (
        <PackageEditSheet pkg={editPkg} serviceId={service?.id} onClose={() => setEditPkg(null)} onSuccess={refresh} />
      )}
      {addPkgOpen && (
        <PackageEditSheet isNew serviceId={service?.id} onClose={() => setAddPkgOpen(false)} onSuccess={refresh} />
      )}
      {editDeliverable && (
        <DeliverableEditSheet deliverable={editDeliverable} serviceId={service?.id} onClose={() => setEditDeliverable(null)} onSuccess={refresh} />
      )}
      {addDeliverableOpen && (
        <DeliverableEditSheet isNew serviceId={service?.id} nextOrderIndex={deliverables.length + 1} onClose={() => setAddDeliverableOpen(false)} onSuccess={refresh} />
      )}
    </>
  )
}
