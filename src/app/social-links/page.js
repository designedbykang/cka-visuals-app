'use client'

import { useRouter } from 'next/navigation'
import { link,} from '@icons-pack/react-simple-icons';
import { ArrowLeft, Music2, Globe,} from 'lucide-react'
import PageLoader from '@/components/PageLoader'

const LINKS = [
  {
    platform: 'Instagram',
    handle: '@ckavisuals',
    url: 'https://instagram.com/ckavisuals',
    icon: Instagram,
    color: '#E44FC6',
  },
  {
    platform: 'Twitter / X',
    handle: '@ckavisuals',
    url: 'https://twitter.com/ckavisuals',
    icon: Twitter,
    color: '#9E56F5',
  },
  {
    platform: 'YouTube',
    handle: 'CKA Visuals',
    url: 'https://youtube.com/@ckavisuals',
    icon: Youtube,
    color: '#61DE2C',
  },
  {
    platform: 'TikTok',
    handle: '@ckavisuals',
    url: 'https://tiktok.com/@ckavisuals',
    icon: Music2,
    color: '#33D0C2',
  },
  {
    platform: 'Website',
    handle: 'ckavisuals.com',
    url: 'https://ckavisuals.com',
    icon: Globe,
    color: '#CFAAFA',
  },
]

export default function SocialLinksPage() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#080809',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Header */}
      <div style={{
        background: '#6E01F0',
        padding: '52px 20px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#F3F3F3',
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <span style={{
          color: '#F3F3F3',
          fontSize: '18px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.2px',
        }}>
          Find us here
        </span>
      </div>

      {/* Profile block */}
      <div style={{
        padding: '32px 20px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #9E56F5, #6E01F0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src="/logo.png"
            alt="CKA Visuals"
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: '#F3F3F3',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
          }}>
            CKA Visuals
          </p>
          <p style={{
            color: 'rgba(243,243,243,0.4)',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            margin: '4px 0 0',
          }}>
            Curated creative studio
          </p>
        </div>
      </div>

      {/* Links */}
      <div style={{
        padding: '20px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {LINKS.map(({ platform, handle, url, icon: Icon, color }) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              textDecoration: 'none',
              transition: 'background 0.15s ease, border-color 0.15s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = `${color}40`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            }}
          >
            {/* Icon circle */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `${color}18`,
              border: `1px solid ${color}35`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={20} color={color} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                color: '#F3F3F3',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
              }}>
                {platform}
              </p>
              <p style={{
                color: 'rgba(243,243,243,0.4)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                margin: '2px 0 0',
              }}>
                {handle}
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              color: `${color}80`,
              fontSize: '18px',
              flexShrink: 0,
            }}>
              →
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
