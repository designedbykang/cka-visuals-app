'use client'

import { Check } from 'lucide-react'

export default function PriceBox({ price, currency = 'USD', deliveryTime = 'Delivered Within 24hrs', label = 'PRICE' }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: '16px',
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(110,1,240,0.05) 0%, rgba(0,217,255,0.05) 100%)',
      border: '2px solid',
      borderImage: 'linear-gradient(135deg, #6E01F0 0%, #00D9FF 100%) 1',
    }}>

      {/* Price label badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '20px',
        background: '#6E01F0',
        color: '#FFFFFF',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.5px',
        zIndex: 10,
      }}>
        {label}
      </div>

      {/* Checkmark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}>
        <Check size={18} color="#FFFFFF" strokeWidth={3} />
      </div>

      {/* Price amount */}
      <div style={{
        paddingTop: '36px',
        paddingRight: '60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <span style={{
          color: '#FFFFFF',
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.5px',
        }}>
          {currency} {typeof price === 'number' ? price.toLocaleString() : price}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.2px',
        }}>
          {deliveryTime}
        </span>
      </div>
    </div>
  )
}
