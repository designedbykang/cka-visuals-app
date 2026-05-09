'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useServiceCategories } from '@/hooks/useServiceCategories'
import { useServicesContext } from '@/context/ServicesContext'

export default function CategoryBand() {
  const { categories, loading } = useServiceCategories()
  const { selectedCategoryId, setSelectedCategoryId, setActiveTagId } = useServicesContext()
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedCategory = categories.find(c => c.id === selectedCategoryId)
  const label = selectedCategory ? selectedCategory.name : 'All Services'

  function selectCategory(id) {
    setSelectedCategoryId(id)
    setActiveTagId(null)
    setSheetOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setSheetOpen(true)}
        style={{
          width: '100%',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--bg-card-border)',
          cursor: 'pointer',
        }}
      >
        <span style={{
          color: 'var(--text-primary)',
          fontSize: '16px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.3px',
        }}>
          {loading ? '…' : label}
        </span>
        <ChevronDown
          size={18}
          color="var(--text-secondary)"
          style={{ transform: sheetOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        />
      </button>

      {sheetOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSheetOpen(false)}
          />
          <div style={{
            position: 'relative',
            background: 'var(--bg-primary)',
            borderRadius: '24px 24px 0 0',
            paddingBottom: 'env(safe-area-inset-bottom, 16px)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'var(--bg-card-border)' }} />
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              padding: '12px 20px 8px',
              margin: 0,
            }}>
              Category
            </p>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                style={{
                  width: '100%',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                  background: 'transparent',
                  border: 'none',
                  borderTop: '1px solid var(--bg-card-border)',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  color: cat.id === selectedCategoryId ? '#6E01F0' : 'var(--text-primary)',
                  fontSize: '16px',
                  fontWeight: cat.id === selectedCategoryId ? '700' : '400',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {cat.name}
                </span>
                {cat.id === selectedCategoryId && <Check size={16} color="#6E01F0" />}
              </button>
            ))}
            <div style={{ height: '16px' }} />
          </div>
        </div>
      )}
    </>
  )
}
