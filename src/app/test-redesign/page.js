'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import ImageCarousel from '@/components/services/ImageCarousel'
import ServiceTitle from '@/components/services/ServiceTitle'
import ServiceDescription from '@/components/services/ServiceDescription'
import PriceBox from '@/components/services/PriceBox'
import RefundInfo from '@/components/services/RefundInfo'

const mockImages = [
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop&q=60',
]

export default function TestRedesignPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <div style={{ minHeight: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column' }}>
      {/* Back nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '56px 20px 20px',
        position: 'sticky',
        top: 0,
        background: 'rgba(8,8,9,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 10,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button
          onClick={() => window.history.back()}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(243,243,243,0.6)',
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <span style={{ color: 'rgba(243,243,243,0.4)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
          Test Redesign
        </span>
      </div>

      {/* Main content area */}
      <div style={{
        flex: 1,
        padding: '32px 20px 100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        maxWidth: '100%',
      }}>
        {/* Image carousel section */}
        <div style={{ width: '100%' }}>
          <ImageCarousel
            images={mockImages}
            serviceName="Logo Design Concept"
          />
        </div>

        {/* Title section */}
        <ServiceTitle
          title="Logo Conception"
          subtitle="Create a unique brand identity with professional logo design"
        />

        {/* Description section */}
        <ServiceDescription text="Nulla quam. Aenean fermentum Duis eget enim. Curabitur felis erat, tempus eu, placerat et, pellentesque sed, purus. Sed sed diam. Nam nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean risus est, porttitor vel, placerat sit amet," />

        {/* Price box */}
        <PriceBox
          price={60}
          currency="$"
          deliveryTime="Delivered Within 24hrs"
          label="PRICE"
        />

        {/* CTA Button */}
        <button
          onClick={() => setEnquiryOpen(true)}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6E01F0 0%, #00D9FF 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            boxShadow: '0 8px 24px rgba(110,1,240,0.3)',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          BUY NOW
        </button>

        {/* Refund info */}
        <RefundInfo text="You get an 80% Refund if you don't like all of the first 3 concepts we will present." />
      </div>

      {enquiryOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}>
          <div style={{
            background: '#1A1A28',
            padding: '24px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h2 style={{ color: '#F3F3F3', margin: '0 0 16px 0' }}>Contact Us</h2>
            <p style={{ color: 'rgba(243,243,243,0.6)', margin: '0 0 24px 0' }}>Thank you for your interest! We'll contact you soon.</p>
            <button
              onClick={() => setEnquiryOpen(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#6E01F0',
                border: 'none',
                color: '#F3F3F3',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
