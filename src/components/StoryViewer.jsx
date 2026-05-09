'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, MoreVertical, Heart, Share2, Download, Bookmark } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const DURATION = 5000

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function ProgressBars({ total, current, progress }) {
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '0 12px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1,
          height: '2px',
          borderRadius: '2px',
          background: 'rgba(243,243,243,0.3)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            borderRadius: '2px',
            background: '#F3F3F3',
            width: i < current ? '100%' : i === current ? `${progress}%` : '0%',
          }} />
        </div>
      ))}
    </div>
  )
}

function StoryHeader({ story, onClose, onMenuToggle }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

function StoryMenu({ story, bookmarked, setBookmarked, onAction }) 
{  
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
      a.download = `cka-status-${story.id}.${story.media_type === 'video' ? 'mp4' : 'jpg'}`
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
  
  const items = [
    { icon: <Share2 size={16} />, label: 'Share', onClick: handleShare },
    { icon: <Download size={16} />, label: 'Download', onClick: handleDownload },
    { 
      icon: <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />, 
      label: 'Bookmark', 
      onClick: handleBookmark 
    },
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
          }}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
          onClick={() => item.onClick?.()}
          >          
          {icon}
          {label}
        </button>
      ))}
    </div>
  )
}

function StoryFooter({ liked, onLike, caption }) {
  const [reply, setReply] = useState('')

  return (
    <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        <button
          onClick={onLike}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: liked ? 'rgba(228,79,198,0.2)' : 'rgba(0,0,0,0.3)',
            border: `1.5px solid ${liked ? '#E44FC6' : 'rgba(243,243,243,0.25)'}`,
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

export default function StoryViewer({ onClose, initialBookmarks, onBookmarksChange }) {  const [stories, setStories] = useState([])
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [liked, setLiked] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mediaLoading, setMediaLoading] = useState(false)
  const progressRef = useRef(0)
  const [bookmarks, setBookmarks] = useState(initialBookmarks || {})
  const [actionMessage, setActionMessage] = useState(null)

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('daily_status')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order', { ascending: true })

      if (error) {
        console.error('Error fetching stories:', error)
        return
      }

      setStories(data)
      setLoading(false)
    }

    fetchStories()
  }, [])

  const story = stories[current]

  useEffect(() => {
    onBookmarksChange?.(bookmarks)
  }, [bookmarks, onBookmarksChange])
  
  useEffect(() => {
    if (!actionMessage) return
    const timer = setTimeout(() => setActionMessage(null), 2000)
    return () => clearTimeout(timer)
  }, [actionMessage])

  useEffect(() => {
    if (paused || loading || mediaLoading || stories.length === 0) return

    progressRef.current = progress

    const interval = setInterval(() => {
      progressRef.current += (100 / (DURATION / 100))

      if (progressRef.current >= 100) {
        progressRef.current = 0
        setProgress(0)
        setCurrent(prev =>
          prev < stories.length - 1 ? prev + 1 : prev
        )
      } else {
        setProgress(progressRef.current)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [current, paused, loading, mediaLoading, stories])

  useEffect(() => {
    progressRef.current = 0
    requestAnimationFrame(() => setProgress(0))
    const story = stories[current]
    if (!story || story.media_type === 'text') {
      setMediaLoading(false)   // text stories have no media to wait for
    } else {
      setMediaLoading(true)
    }
  }, [current, stories])

  const handleTap = (e) => {
    if (menuOpen) { setMenuOpen(false); return }
    const x = e.clientX
    const mid = window.innerWidth / 2
    if (x > mid) {
      if (current < stories.length - 1) setCurrent(prev => prev + 1)
    } else {
      if (current > 0) setCurrent(prev => prev - 1)
    }
  }

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(243,243,243,0.1)',
          borderTop: '2px solid #61DE2C',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  if (!story) return null

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
      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div style={{ paddingTop: '12px' }}>
        <ProgressBars
          total={stories.length}
          current={current}
          progress={progress}
        />
      </div>

      <div onClick={e => e.stopPropagation()}>
        <StoryHeader
          story={{ ...story, timestamp: timeAgo(story.created_at) }}
          onClose={onClose}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {menuOpen && (
  <div onClick={e => e.stopPropagation()}>
    <StoryMenu 
      story={story} 
      bookmarked={bookmarks?.[story.id] || false}
      setBookmarked={(isBookmarked) => {
        setBookmarks(prev => ({
          ...prev,
          [story.id]: isBookmarked
        }))
      }}
      onAction={setActionMessage}
    />
  </div>
)}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
{story.media_type === 'video' ? (
  <video
    key={story.id}
    src={story.media_url}
    autoPlay
    muted
    playsInline
    onCanPlay={() => setMediaLoading(false)}
    onError={() => setMediaLoading(false)}
    style={{
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  />
) : (
  <img
    key={story.id}
    src={story.media_url}
    alt=""
    onLoad={() => setMediaLoading(false)}
    onError={() => setMediaLoading(false)}
    style={{
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
    draggable={false}
  />
)}

{mediaLoading && (
  <div style={{
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.15)',
  }}>
    <div style={{
      width: 28, height: 28,
      border: '3px solid rgba(255,255,255,0.4)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
  </div>
)}
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
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '3px', height: '16px', background: '#F3F3F3', borderRadius: '2px' }} />
              <div style={{ width: '3px', height: '16px', background: '#F3F3F3', borderRadius: '2px' }} />
            </div>
          </div>
        )}
        
      </div>

      <div onClick={e => e.stopPropagation()}>
        <StoryFooter
          liked={liked[current] || false}
          onLike={() => setLiked(prev => ({ ...prev, [current]: !prev[current] }))}
          caption={story.caption}
        />
      </div>
      {actionMessage && (
  <div style={{
    position: 'absolute',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.8)',
    color: '#F3F3F3',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    zIndex: 50,
    fontFamily: 'Inter, sans-serif',
  }}>
    {actionMessage}
  </div>
)}
    </div>
  )
}
