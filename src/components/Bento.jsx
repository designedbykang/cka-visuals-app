'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useAdmin } from '@/context/AdminContext'
import StatusUploadSheet from './StatusUploadSheet'
import { Plus } from 'lucide-react'
import { Download, Share2, Bookmark, MessageCircle } from 'lucide-react'
import StoryViewer from './StoryViewer'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

function ActionBar({ story, bookmarked, setBookmarked, onAction }) {
  const handleShare = async () => {
    if (navigator.share && story.media_url) {
      try {
        await navigator.share({
          title: 'CKA Status',
          text: story.caption || 'Check this out!',
          url: window.location.href
        })
      } catch (err) {
        console.log('Share dismissed')
      }
    }
  }
  
  const handleDownload = async () => {
    if (!story.media_url) return
    try {
      const response = await fetch(story.media_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cka-status-${story.id || Date.now()}.${story.media_type === 'video' ? 'mp4' : 'jpg'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      onAction?.('Downloaded')
    } catch (error) {
      console.error('Download failed:', error)
      onAction?.('Download failed')
    }
  }
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    onAction?.(bookmarked ? 'Removed bookmark' : 'Added bookmark')
  }
  const actions = [
    { icon: <Download size={16} />, label: 'Save', onClick: handleDownload },
    { 
      icon: <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />, 
      label: 'Bookmark', 
      onClick: handleBookmark 
    },
    { icon: <Share2 size={16} />, label: 'Share', onClick: handleShare },
  ]

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
      borderRadius: '0 0 6px 6px',
      boxSizing: 'border-box',
      zIndex: 3,
    }}>
      {actions.map(({ icon, label, onClick }) => (
        <button
          key={label}
          onClick={e => {
            e.stopPropagation()
            onClick?.()
          }}
                    style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            flex: 1,
            minWidth: 0,
            padding: '8px 10px',
            borderRadius: '60px',
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

function DailyStatus({ theme, onClick, hasUnseen, onSaved, bookmarks, setBookmarks }) {
  const isDark = theme === 'dark'
  const [stories, setStories] = useState([])
  const [showPeek, setShowPeek] = useState(false)
  const currentStory = stories[0]
  const peekStory = stories[1]

useEffect(() => {
  supabase
    .from('daily_status')
    .select('id, media_url, media_type, caption')
    .eq('is_active', true)
    .order('sequence_order', { ascending: true })
    .limit(2)
    .then(({ data }) => { if (data?.length) setStories(data) })
}, [])

  useEffect(() => {
    if (!peekStory) return
    
    const peekInterval = setInterval(() => {
      setShowPeek(true)
      setTimeout(() => setShowPeek(false), 1800)
    }, 5200)
    
    return () => clearInterval(peekInterval)
  }, [peekStory])

  const renderStoryPreview = (story, style = {}) => {
    if (!story) return null
    if (story.media_type === 'text') {
      return (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          ...style,
        }}>
          <p style={{
            color: '#F3F3F3',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            margin: 0,
          }}>
            {story.caption}
          </p>
        </div>
      )
    }

    return (
      <img
        key={story.id}
        src={story.media_url}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          pointerEvents: 'none',
          userSelect: 'none',
          ...style,
        }}
      />
    )
  }

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '6px',
        overflow: 'hidden',
        background: isDark ? 'rgba(243,243,243,0.04)' : '#F7F7F8',
        border: `1px solid ${isDark
          ? 'rgba(243,243,243,0.08)'
          : '#E4E4E7'}`,
        cursor: 'pointer',
      }}
    >
      {peekStory && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '6px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.92,
          transform: 'scale(0.985)',
        }}>
          {renderStoryPreview(peekStory)}
        </div>
      )}

      {currentStory && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '6px',
          overflow: 'hidden',
          zIndex: 1,
          transform: showPeek ? 'translateX(-15%)' : 'translateX(0)',
          transition: 'transform 900ms cubic-bezier(0.42, 0, 0.2, 1)',
          boxShadow: peekStory ? '12px 0 28px rgba(0,0,0,0.3)' : 'none',
        }}>
          {renderStoryPreview(currentStory)}
        </div>
      )}

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

{currentStory && (
  <ActionBar 
    story={currentStory} 
    bookmarked={bookmarks?.[currentStory.id] || false}
    setBookmarked={(isBookmarked) => {
      setBookmarks(prev => ({
        ...prev,
        [currentStory.id]: isBookmarked
      }))
    }}
    onAction={onSaved}
  />
)}
    </div>
  )
}

const CARD_LINKS = {
  Services: '/services',
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
  const href = CARD_LINKS[label]

  const cardStyle = {
    flex: 1,
    borderRadius: '6px',
    background: isDark
      ? 'rgba(243,243,243,0.04)'
      : '#F7F7F8',
    border: `1px solid ${isDark
      ? 'rgba(243,243,243,0.08)'
      : '#E4E4E7'}`,
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
    textDecoration: 'none',
  }

  const inner = (
    <>
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
    </>
  )

  const hoverOn = e => {
    e.currentTarget.style.border = `1px solid ${accent}66`
    e.currentTarget.style.background = isDark ? `${accent}11` : '#F2F2F3'
  }
  const hoverOff = e => {
    e.currentTarget.style.border = `1px solid ${isDark ? 'rgba(243,243,243,0.08)' : '#E4E4E7'}`
    e.currentTarget.style.background = isDark ? 'rgba(243,243,243,0.04)' : '#F7F7F8'
  }

  if (href) {
    return (
      <Link href={href} style={cardStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
        {inner}
      </Link>
    )
  }

  return (
    <div style={cardStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
      {inner}
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
        borderRadius: '50px',
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
  const { isAdmin } = useAdmin()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [bentoHeight, setBentoHeight] = useState('calc(100dvh - 120px)')
  const [hasUnseen, setHasUnseen] = useState(false)
  const [bookmarks, setBookmarks] = useState({})
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const seen = localStorage.getItem('cka-stories-seen')
        setHasUnseen(!seen)
      } catch {
        // ignore
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('cka-bookmarks')
        if (saved) setBookmarks(JSON.parse(saved))
      } catch {
        // ignore
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])
  
  // ADD when bookmarks change:
  useEffect(() => {
    try {
      localStorage.setItem('cka-bookmarks', JSON.stringify(bookmarks))
    } catch {
      // ignore
    }
  }, [bookmarks])

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

  const handleOpenStory = () => {
    setStoryOpen(true)
    setHasUnseen(false)
    localStorage.setItem('cka-stories-seen', 'true')
  }

  const handleUploadSuccess = () => {
    setHasUnseen(true)
    localStorage.removeItem('cka-stories-seen')
  }

  if (isMobile) {
    return (
      <>
        {storyOpen && (
          <StoryViewer onClose={() => setStoryOpen(false)} />
        )}

        {uploadOpen && (
          <StatusUploadSheet
            onClose={() => setUploadOpen(false)}
            onSuccess={() => {
              setHasUnseen(true)
              localStorage.removeItem('cka-stories-seen')
            }}
          />
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: bentoHeight,
          padding: '12px 16px',
          gap: '10px',
          overflow: 'hidden',
        }}>
          <div style={{ flex: '0 0 55%', minHeight: 0, position: 'relative' }}>
          <DailyStatus
  theme={theme}
  onClick={handleOpenStory}
  hasUnseen={hasUnseen}
  onSaved={setToast}
  bookmarks={bookmarks}
  setBookmarks={setBookmarks}
/>

            {isAdmin && (
              <button
                onClick={e => {
                  e.stopPropagation()
                  setUploadOpen(true)
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #9E56F5, #6E01F0)',
                  border: '1px solid rgba(243,243,243,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 3,
                  boxShadow: '0 2px 12px rgba(110,1,240,0.4)',
                }}
              >
                <Plus size={18} color="#F3F3F3" />
              </button>
            )}
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

        {uploadOpen && (
          <StatusUploadSheet
            onClose={() => setUploadOpen(false)}
            onSuccess={handleUploadSuccess}
          />
        )}

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
        <div style={{ flex: '0 0 55%', minHeight: 0, position: 'relative' }}>
        <DailyStatus
  theme={theme}
  onClick={handleOpenStory}
  hasUnseen={hasUnseen}
  onSaved={setToast}
  bookmarks={bookmarks}
  setBookmarks={setBookmarks}
/>

          {isAdmin && (
            <button
              onClick={e => {
                e.stopPropagation()
                setUploadOpen(true)
              }}
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #9E56F5, #6E01F0)',
                border: '1px solid rgba(243,243,243,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 3,
                boxShadow: '0 2px 12px rgba(110,1,240,0.4)',
              }}
            >
              <Plus size={18} color="#F3F3F3" />
            </button>
          )}
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

      {uploadOpen && (
        <StatusUploadSheet
          onClose={() => setUploadOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
{toast && (
  <div style={{
    position: 'fixed',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.8)',
    color: '#F3F3F3',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    zIndex: 50,
    fontFamily: 'Inter, sans-serif',
  }}>
    {toast}
  </div>
)}
      <FloatingChat />
    </>
  )
}
