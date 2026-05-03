'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { ArrowLeft, MoreVertical, Heart, Share2, Download, Bookmark, X } from 'lucide-react'

const STORIES = [
  { id: 1, media: '/story-1.png', type: 'image', caption: 'Fresh drops this week.', timestamp: '2h ago' },
  { id: 2, media: '/story-2.png', type: 'image', caption: 'Behind the scenes.', timestamp: '4h ago' },
  { id: 3, media: '/story-3.png', type: 'image', caption: 'New services available.', timestamp: '6h ago' },
  { id: 4, media: '/story-4.png', type: 'image', caption: 'Portfolio highlight.', timestamp: '8h ago' },
  { id: 5, media: '/story-5.png', type: 'image', caption: 'Stay tuned for more.', timestamp: '10h ago' },
]

const DURATION = 5000 // 5 seconds per story

// ── Progress Bar ───────────────────────────────────────
function ProgressBars({ total, current, progress }) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      padding: '0 12px',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '2px',
            borderRadius: '2px',
            background: 'rgba(243,243,243,0.3)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            height: '100%',
            borderRadius: '2px',
            background: '#F3F3F3',
            width: i < current
              ? '100%'
              : i === current
                ? `${progress}%`
                : '0%',
            transition: i === current ? 'none' : 'none',
          }} />
        </div>
      ))}
    </div>
  )
}

// ── Story Header ───────────────────────────────────────
function StoryHeader({ story, onClose, onMenuToggle }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
    }}>
      {/* Left — back + identity */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <button
          onClick={onClose}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="#F3F3F3" />
        </button>

        {/* Avatar — no gradient ring in viewer */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#120F0F',
          border: '1px solid rgba(243,243,243,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#F3F3F3',
            fontFamily: 'Inter, sans-serif',
          }}>CK</span>
        </div>

        <div>
          <p style={{
            color: '#F3F3F3',
            fontSize: '13px',
            fontWeight: '600',
            margin: 0,
            fontFamily: 'Inter, sans-serif',
          }}>CKA Visuals</p>
          <p style={{
            color: 'rgba(243,243,243,0.6)',
            fontSize: '11px',
            margin: 0,
            fontFamily: 'Inter, sans-serif',
          }}>{story.timestamp}</p>
        </div>
      </div>

      {/* Right — 3 dot menu */}
      <button
        onClick={onMenuToggle}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'rgba(0,0,0,0.3)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <MoreVertical size={18} color="#F3F3F3" />
      </button>
    </div>
  )
}

// ── 3 Dot Menu ─────────────────────────────────────────
function StoryMenu({ onClose }) {
  const items = [
    { icon: <Share2 size={16} />, label: 'Share' },
    { icon: <Download size={16} />, label: 'Download' },
    { icon: <Bookmark size={16} />, label: 'Bookmark' },
  ]

  return (
    <div style={{
      position: 'absolute',
      top: '60px',
      right: '16px',
      width: '180px',
      background: '#1A1A1A',
      border: '1px solid rgba(243,243,243,0.1)',
      borderRadius: '14px',
      padding: '8px',
      zIndex: 100,
    }}>
      {items.map(({ icon, label }) => (
        <button
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            background: 'none',
            border: 'none',
            color: '#F3F3F3',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(243,243,243,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  )
}

// ── Story Footer ───────────────────────────────────────
function StoryFooter({ liked, onLike, caption }) {
  const [reply, setReply] = useState('')

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'CKA Visuals',
        text: caption,
        url: window.location.href,
      })
    }
  }

  return (
    <div style={{
      padding: '12px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Caption */}
      {caption && (
        <p style={{
          color: '#F3F3F3',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
          opacity: 0.9,
        }}>
          {caption}
        </p>
      )}

      {/* Reply + Like row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {/* Reply input — mirrors search bar */}
        <div style={{
          flex: 1,
          height: '44px',
          borderRadius: '12px',
          border: '1.5px solid rgba(243,243,243,0.25)',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
        }}>
          <input
            type="text"
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Reply..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#F3F3F3',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>

        {/* Like button */}
        <button
          onClick={onLike}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: liked
              ? 'rgba(228,79,198,0.2)'
              : 'rgba(0,0,0,0.3)',
            border: `1.5px solid ${liked
              ? '#E44FC6'
              : 'rgba(243,243,243,0.25)'}`,
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
        >
          <Heart
            size={18}
            color={liked ? '#E44FC6' : '#F3F3F3'}
            fill={liked ? '#E44FC6' : 'none'}
          />
        </button>
      </div>
    </div>
  )
}

// ── Story Viewer ───────────────────────────────────────
export default function StoryViewer({ onClose }) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [liked, setLiked] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const intervalRef = useRef(null)
  const progressRef = useRef(0)

  const story = STORIES[current]

  // Progress timer
  useEffect(() => {
    if (paused) return

    progressRef.current = progress

    intervalRef.current = setInterval(() => {
      progressRef.current += (100 / (DURATION / 100))

      if (progressRef.current >= 100) {
        progressRef.current = 0
        setProgress(0)
        setCurrent(prev => {
          if (prev < STORIES.length - 1) return prev + 1
          return prev
        })
      } else {
        setProgress(progressRef.current)
      }
    }, 100)

    return () => clearInterval(intervalRef.current)
  }, [current, paused])

  // Reset progress on story change
  useEffect(() => {
    setProgress(0)
    progressRef.current = 0
  }, [current])

  // Tap navigation
  const handleTap = (e) => {
    if (menuOpen) {
      setMenuOpen(false)
      return
    }
    const x = e.clientX
    const mid = window.innerWidth / 2

    if (x > mid) {
      if (current < STORIES.length - 1) {
        setCurrent(prev => prev + 1)
      }
    } else {
      if (current > 0) {
        setCurrent(prev => prev - 1)
      }
    }
  }

  // Press and hold to pause
  const handlePressStart = () => setPaused(true)
  const handlePressEnd = () => setPaused(false)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
      }}
      onClick={handleTap}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      {/* Progress bars */}
      <div style={{ paddingTop: '12px' }}>
        <ProgressBars
          total={STORIES.length}
          current={current}
          progress={progress}
        />
      </div>

      {/* Header */}
      <div onClick={e => e.stopPropagation()}>
        <StoryHeader
          story={story}
          onClose={onClose}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* 3 dot menu */}
      {menuOpen && (
        <div onClick={e => e.stopPropagation()}>
          <StoryMenu onClose={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Media — full screen, respects dimensions */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={story.media}
          alt=""
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />

        {/* Paused indicator */}
        {paused && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex',
              gap: '4px',
            }}>
              <div style={{ width: '3px', height: '16px', background: '#F3F3F3', borderRadius: '2px' }} />
              <div style={{ width: '3px', height: '16px', background: '#F3F3F3', borderRadius: '2px' }} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div onClick={e => e.stopPropagation()}>
        <StoryFooter
          liked={liked[current] || false}
          onLike={() => setLiked(prev => ({
            ...prev,
            [current]: !prev[current]
          }))}
          caption={story.caption}
        />
      </div>
    </div>
  )
}
