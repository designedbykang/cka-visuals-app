'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Download, Share2, Bookmark, MessageCircle } from 'lucide-react'
import StoryViewer from './StoryViewer'

function ActionBar() {
  const actions = [
    { icon: <Download size={16} />, label: 'Save' },
    { icon: <Share2 size={16} />, label: 'Share' },
    { icon: <Bookmark size={16} />, label: 'Bookmark' },
  ]

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '12px 16px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
      borderRadius: '0 0 16px 16px',
    }}>
      {actions.map(({ icon, label }) => (
        <button
          key={label}
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 20px',
            borderRadius: '10px',
            background: 'rgba(243,243,243,0.12)',
            border: '1px solid rgba(243,243,243,0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#F3F3F3',
            fontSize: '12px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(243,243,243,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(243,243,243,0.12)'}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  )
}

function DailyStatus({ theme, onClick, hasUnseen }) {
  const isDark = theme === 'dark'

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${isDark
          ? 'rgba(243,243,243,0.08)'
          : 'rgba(110,1,240,0.1)'}`,
        cursor: 'pointer',
      }}
    >
      {/* Blurred preview image */}
      <img
        src="/story-1.png"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(12px)',
          transform: 'scale(1.1)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
      }} />

      {/* Center play button */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(110,1,240,0.5)',
          border: '1.5px solid rgba(243,243,243,0.3)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 0,
            height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            borderLeft: '16px solid #F3F3F3',
            marginLeft: '4px',
          }} />
        </div>

        <p style={{
          color: 'rgba(243,243,243,0.8)',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          margin: 0,
          letterSpacing: '0.3px',
        }}>
          Daily Status
        </p>
      </div>

      {/* Green dot — unseen indicator */}
      {hasUnseen && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(97,222,44,0.3)',
          borderRadius: '20px',
          padding: '4px 10px 4px 6px',
          zIndex: 2,
        }}>
          {/* Pulsing dot */}
          <div style={{ position: 'relative', width: '8px', height: '8px' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#61DE2C',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
          </div>
          <span style={{
            color: '#61DE2C',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            letterSpacing: '0.3px',
          }}>
            New
          </span>
        </div>
      )}

      <ActionBar />
    </div>
  )
}

function GridCard({ label, theme }) {
  const isDark = theme === 'dark'

  const accents = {
    Services: '#6E01F0',
    Portfolio: '#9E56F5',
    Content: '#61DE2C',
    Chat: '#E44FC6',
    Portal: '#E44FC6',
  }

  const accent = accents[label] || '#6E01F0'

  return (
    <div
      style={{
        flex: 1,
        borderRadius: '16px',
        background: isDark
          ? 'rgba(243,243,243,0.04)'
          : 'rgba(110,1,240,0.04)',
        border: `1px solid ${isDark
          ? 'rgba(243,243,243,0.08)'
          : 'rgba(110,1,240,0.1)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = `1px solid ${accent}66`
        e.currentTarget.style.background = `${accent}11`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = `1px solid ${isDark
          ? 'rgba(243,243,243,0.08)'
          : 'rgba(110,1,240,0.1)'}`
        e.currentTarget.style.background = isDark
          ? 'rgba(243,243,243,0.04)'
          : 'rgba(110,1,240,0.04)'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: accent,
      }} />

      <p style={{
        color: isDark ? '#F3F3F3' : '#120F0F',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        margin: 0,
      }}>
        {label}
      </p>
    </div>
  )
}

function FloatingChat() {
  return (
    <button
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '20px',
        width: '52px',
        height: '52px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #9E56F5, #6E01F0)',
        border: '1px solid rgba(243,243,243,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 40,
        boxShadow: '0 4px 24px rgba(110,1,240,0.4)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(110,1,240,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(110,1,240,0.4)'
      }}
    >
      <MessageCircle size={22} color="#F3F3F3" />
    </button>
  )
}

export default function Bento() {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(true)
  const [storyOpen, setStoryOpen] = useState(false)
  const [bentoHeight, setBentoHeight] = useState('calc(100dvh - 120px)')
  const [hasUnseen, setHasUnseen] = useState(false)

useEffect(() => {
  const seen = localStorage.getItem('cka-stories-seen')
  if (!seen) setHasUnseen(true)
}, [])

const handleOpenStory = () => {
  setStoryOpen(true)
  setHasUnseen(false)
  localStorage.setItem('cka-stories-seen', 'true')
}


  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const calculateHeight = () => {
      const header = document.querySelector('header')
      const searchBar = document.querySelector('[data-searchbar]')
      const headerH = header?.offsetHeight || 60
      const searchH = searchBar?.offsetHeight || 76
      setBentoHeight(`calc(100dvh - ${headerH + searchH}px)`)
    }
    calculateHeight()
    window.addEventListener('resize', calculateHeight)
    return () => window.removeEventListener('resize', calculateHeight)
  }, [])

  if (isMobile) {
    return (
      <>
        {storyOpen && (
          <StoryViewer onClose={() => setStoryOpen(false)} />
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: bentoHeight,
          padding: '12px 16px',
          gap: '10px',
          overflow: 'hidden',
        }}>
          <div style={{ flex: '0 0 55%', minHeight: 0 }}>
            <DailyStatus
              theme={theme}
              onClick={handleOpenStory}
              hasUnseen={hasUnseen}
            />
          </div>

          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '10px',
            minHeight: 0,
          }}>
            {['Services', 'Portfolio', 'Content', 'Portal'].map(label => (
              <GridCard key={label} label={label} theme={theme} />
            ))}
          </div>
        </div>

        <FloatingChat />
      </>
    )
  }

  return (
    <>
      {storyOpen && (
        <StoryViewer onClose={() => setStoryOpen(false)} />
      )}

      <div style={{
        display: 'flex',
        height: bentoHeight,
        padding: '16px 28px',
        gap: '12px',
        overflow: 'hidden',
      }}>
        <div style={{ flex: '0 0 45%', minHeight: 0 }}>
          <DailyStatus
            theme={theme}
            onClick={() => setStoryOpen(true)}
          />
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minHeight: 0,
        }}>
          {['Services', 'Portfolio', 'Content'].map(label => (
            <GridCard key={label} label={label} theme={theme} fullHeight />
          ))}
        </div>
      </div>

      <FloatingChat />
    </>
  )
}
