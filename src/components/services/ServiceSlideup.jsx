'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, BookOpen, Plus } from 'lucide-react'
import { useServicesContext } from '@/context/ServicesContext'
import { useAdmin } from '@/context/AdminContext'
import { useLongPress } from '@/hooks/useLongPress'
import { useService } from '@/hooks/useService'
import ServiceHero from './ServiceHero'
import PackageSelector from './PackageSelector'
import DeliverablesList from './DeliverablesList'
import EnquirySheet from './EnquirySheet'
import HeroUploadSheet from './HeroUploadSheet'
import PackageEditSheet from './PackageEditSheet'
import DeliverableEditSheet from './DeliverableEditSheet'

export default function ServiceSlideup() {
  const { slideupOpen, selectedServiceId, closeSlideup, setSelectedPackageId, selectedPackageId } = useServicesContext()
  const { isAdmin } = useAdmin()
  const [fetchKey, setFetchKey] = useState(0)
  const { service, packages, deliverables, loading } = useService(selectedServiceId, fetchKey)

  const [enquiryOpen, setEnquiryOpen] = useState(false)
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
      <div style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={closeSlideup}
        />

        <div style={{
          position: 'relative', background: 'var(--bg-primary)',
          borderRadius: '24px 24px 0 0', maxHeight: '88dvh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'var(--bg-card-border)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 16px' }}>
            <div />
            <button onClick={closeSlideup} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: '24px', scrollbarWidth: 'none' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3].map(i => <div key={i} style={{ height: i === 1 ? '200px' : '60px', borderRadius: '14px', background: 'var(--bg-card)' }} />)}
              </div>
            ) : service ? (
              <>
                {/* Hero */}
                <div {...(isAdmin ? heroLongPress : {})} style={{ position: 'relative', userSelect: 'none' }}>
                  <ServiceHero imageUrl={service.hero_image_url} serviceName={service.name} />
                  {isAdmin && (
                    <div style={{
                      position: 'absolute', bottom: '10px', right: '10px',
                      background: 'rgba(0,0,0,0.5)', borderRadius: '8px', padding: '4px 8px',
                      color: '#9E56F5', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: '600',
                      backdropFilter: 'blur(6px)',
                    }}>
                      Hold to change
                    </div>
                  )}
                </div>

                {/* Name + tagline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: '700', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                    {service.name}
                  </h2>
                  {service.tagline && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'Inter, sans-serif', margin: 0, lineHeight: '1.6' }}>
                      {service.tagline}
                    </p>
                  )}
                </div>

                {/* Packages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <PackageSelector
                    packages={packages}
                    selectedId={selectedPackageId}
                    onSelect={pkg => setSelectedPackageId(pkg.id)}
                    onLongPress={isAdmin ? pkg => setEditPkg(pkg) : undefined}
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
                </div>

                {/* Deliverables */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <DeliverablesList
                    deliverables={deliverables}
                    isAdmin={isAdmin}
                    onLongPress={d => setEditDeliverable(d)}
                  />
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

                <Link href={`/services/${service.id}`} onClick={closeSlideup} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: 'var(--text-secondary)', fontSize: '13px',
                  fontFamily: 'Inter, sans-serif', textDecoration: 'none',
                }}>
                  <BookOpen size={14} /> Read more about this service
                </Link>

                <button onClick={() => setEnquiryOpen(true)} disabled={!selectedPackage} style={{
                  width: '100%', padding: '15px', borderRadius: '14px',
                  background: selectedPackage ? 'linear-gradient(135deg, #9E56F5, #6E01F0)' : 'var(--bg-card)',
                  border: selectedPackage ? 'none' : '1px solid var(--bg-card-border)',
                  color: selectedPackage ? '#F3F3F3' : 'var(--text-secondary)',
                  fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                  cursor: selectedPackage ? 'pointer' : 'default', transition: 'all 0.18s ease',
                }}>
                  {selectedPackage ? `Enquire — ${selectedPackage.name}` : 'Select a package to enquire'}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {enquiryOpen && service && selectedPackage && (
        <EnquirySheet service={service} selectedPackage={selectedPackage} onClose={() => setEnquiryOpen(false)} />
      )}
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
