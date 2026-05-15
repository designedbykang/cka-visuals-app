'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import LoginSheet from './LoginSheet'
import { useTheme } from '@/context/ThemeContext'
import {
  Menu, X, LayoutGrid, Store, Link,
  MessageCircle, Briefcase, Monitor, FileText,
  Moon, Sun, Home, HelpCircle, Scale,
} from 'lucide-react'

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      onClick={onToggle}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: isDark
          ? 'rgba(243,243,243,0.08)'
          : 'rgba(110,1,240,0.1)',
        border: `1px solid ${isDark
          ? 'rgba(243,243,243,0.15)'
          : 'rgba(110,1,240,0.25)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      }}
    >
      {isDark
        ? <Sun size={18} color="#F3F3F3" />
        : <Moon size={18} color="#F3F3F3" />
      }
    </button>
  )
}

function Logo() {
  const [pressing, setPressing] = useState(false)
  const pressTimer = useRef(null)

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setPressing(true)
    }, 900)
  }

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current)
    setPressing(false)
  }

  const handleTap = () => {
    window.location.href = '/'
  }

  return (
    <div
      onClick={handleTap}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      style={{
        width: 'clamp(80px, 10vw, 130px)',
        height: 'clamp(32px, 4vw, 44px)',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        opacity: pressing ? 0.6 : 1,
      }}
    >
      <img
        src="/logo.png"
        alt="CKA Visuals"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'left center',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

function HamburgerButton({ open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {open
        ? <X size={22} color="#F3F3F3" />
        : <Menu size={22} color="#F3F3F3" />
      }
    </button>
  )
}

function DesktopNav() {
  const router = useRouter()
  const links = [
    { label: 'Services', href: '/services', icon: <Briefcase size={16} /> },
    { label: 'Portfolio', href: '/portfolio', icon: <Monitor size={16} /> },
    { label: 'Content', href: '/content', icon: <FileText size={16} /> },
    { label: 'Portal', href: '/portal', icon: <MessageCircle size={16} /> },
  ]

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(4px, 2vw, 8px)',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    }}>
      {links.map(({ label, href, icon }) => (
        <button
          key={label}
          onClick={() => router.push(href)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 'clamp(8px, 1.5vw, 10px) clamp(12px, 2vw, 20px)',
            borderRadius: '12px',
            background: 'rgba(243,243,243,0.08)',
            border: '1px solid rgba(243,243,243,0.12)',
            color: '#F3F3F3',
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(243,243,243,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(243,243,243,0.08)'}
        >
          {icon && <span style={{ opacity: 0.9 }}>{icon}</span>}
          {label}
        </button>
      ))}
    </nav>
  )
}

function GridButton({ onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <LayoutGrid size={22} color="#F3F3F3" />
    </button>
  )
}

function DesktopGridButton({ onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(243,243,243,0.08)',
        border: '1px solid rgba(243,243,243,0.12)',
        borderRadius: '12px',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <LayoutGrid size={18} color="#F3F3F3" />
    </button>
  )
}

function Avatar() {
  const { isAdmin } = useAdmin()
  const [loginOpen, setLoginOpen] = useState(false)
  const pressTimer = useRef(null)

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setLoginOpen(true)
    }, 900)
  }

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current)
  }

  return (
    <>
      <button
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        style={{
          width: '44px',
          height: '44px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Rotating gradient ring */}
        <div style={{
          position: 'absolute',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: isAdmin
            ? 'conic-gradient(#61DE2C, #61DE2C, #61DE2C)'
            : 'conic-gradient(#61DE2C, #9E56F5, #E44FC6, #61DE2C)',
          animation: 'spin 3s linear infinite',
        }} />

        {/* Gap layer */}
        <div style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#6E01F0',
          zIndex: 1,
        }} />

        {/* Avatar circle */}
        <div style={{
          position: 'absolute',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#120F0F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          {isAdmin
            ? <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#61DE2C',
              }} />
            : <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#F3F3F3',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.5px',
              }}>CK</span>
          }
        </div>
      </button>

      {loginOpen && (
        <LoginSheet onClose={() => setLoginOpen(false)} />
      )}
    </>
  )
}

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [gridOpen, setGridOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (gridOpen && !e.target.closest('header')) {
        setGridOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [gridOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const drawerBg = isDark ? '#1A1A1A' : '#FFFFFF'
  const drawerBorder = isDark ? 'rgba(243,243,243,0.08)' : 'rgba(18,15,15,0.08)'
  const dropdownBg = isDark ? '#1A1A1A' : '#F3F3F3'
  const dropdownBorder = isDark
    ? 'rgba(97,222,44,0.15)'
    : 'rgba(110,1,240,0.15)'

  const navItems = [
    { label: 'Home', href: '/', icon: <Home size={20} /> },
    { label: 'Services', href: '/services', icon: <Briefcase size={20} /> },
    { label: 'Portfolio', href: '/portfolio', icon: <Monitor size={20} /> },
    { label: 'Content', href: '/content', icon: <FileText size={20} /> },
    { label: 'Chat', href: null, icon: <MessageCircle size={20} /> },
    { label: 'FAQ', href: null, icon: <HelpCircle size={20} /> },
    { label: 'Legal', href: '/legal', icon: <Scale size={20} /> },
  ]

  const handleNavItem = (href) => {
    setMenuOpen(false)
    if (href) router.push(href)
  }

  return (
    <>
      {/* Left drawer overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 200,
          }}
        />
      )}

      {/* Left drawer panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100dvh',
        width: 'min(280px, 80vw)',
        background: drawerBg,
        borderRight: `1px solid ${drawerBorder}`,
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {/* Drawer header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px 16px',
          borderBottom: `1px solid ${drawerBorder}`,
          flexShrink: 0,
        }}>
          <img
            src="/logo.png"
            alt="CKA Visuals"
            style={{
              height: '28px',
              width: 'auto',
              objectFit: 'contain',
              filter: isDark ? 'none' : 'none',
            }}
          />
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark ? 'rgba(243,243,243,0.06)' : 'rgba(18,15,15,0.06)',
              border: `1px solid ${drawerBorder}`,
              borderRadius: '10px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={18} color={isDark ? '#F3F3F3' : '#120F0F'} />
          </button>
        </div>

        {/* Nav items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 12px',
          flex: 1,
          gap: '2px',
        }}>
          {navItems.map(({ label, href, icon }) => (
            <button
              key={label}
              onClick={() => handleNavItem(href)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                width: '100%',
                padding: '14px 12px',
                borderRadius: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.15s ease',
                color: isDark ? '#F3F3F3' : '#120F0F',
              }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(243,243,243,0.06)' : 'rgba(18,15,15,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ opacity: 0.6, flexShrink: 0 }}>{icon}</span>
              <span style={{
                fontSize: '17px',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
              }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Divider + theme toggle */}
        <div style={{
          borderTop: `1px solid ${drawerBorder}`,
          padding: '16px 20px 32px',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              color: isDark ? 'rgba(243,243,243,0.6)' : 'rgba(18,15,15,0.6)',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
            }}>
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </div>

      <header style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        background: '#6E01F0',
        zIndex: 50,
      }}>

        {/* Main Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(8px, 2vw, 14px) clamp(12px, 3vw, 28px)',
          height: 'clamp(56px, 7vw, 68px)',
          position: 'relative',
        }}>

          {/* Left */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1,
          }}>
            <div style={{ display: isMobile ? 'flex' : 'none' }}>
              <HamburgerButton
                open={menuOpen}
                onToggle={() => setMenuOpen(!menuOpen)}
              />
            </div>
            <Logo />
          </div>

          {/* Center */}
          {!isMobile && <DesktopNav />}

          {/* Right */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1,
          }}>
            <div style={{ display: isMobile ? 'flex' : 'none' }}>
              <GridButton onToggle={() => setGridOpen(!gridOpen)} />
            </div>
            {!isMobile && (
              <DesktopGridButton onToggle={() => setGridOpen(!gridOpen)} />
            )}
            {!isMobile && (
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            )}
            <Avatar />
          </div>
        </div>

        {/* Grid Dropdown */}
        {gridOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 'clamp(12px, 3vw, 28px)',
            width: isMobile ? '220px' : '260px',
            background: dropdownBg,
            border: `1px solid ${dropdownBorder}`,
            borderRadius: '0 0 20px 20px',
            padding: '20px',
            zIndex: 50,
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(110,1,240,0.1)',
          }}>
            <p style={{
              color: isDark ? '#CFAAFA' : '#6E01F0',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
            }}>
              Quick Access
            </p>

            {/* Store */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px',
              borderRadius: '16px',
              background: isDark
                ? 'rgba(110,1,240,0.15)'
                : 'rgba(110,1,240,0.06)',
              border: `1px solid ${isDark
                ? 'rgba(110,1,240,0.3)'
                : 'rgba(110,1,240,0.2)'}`,
              marginBottom: '10px',
              cursor: 'pointer',
              color: isDark ? '#F3F3F3' : '#120F0F',
              fontFamily: 'Inter, sans-serif',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(110,1,240,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Store size={18} color="#CFAAFA" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: 0,
                  color: isDark ? '#F3F3F3' : '#120F0F',
                }}>Store</p>
                <p style={{
                  fontSize: '11px',
                  margin: 0,
                  color: isDark ? 'rgba(243,243,243,0.5)' : 'rgba(18,15,15,0.5)',
                }}>Marketplace</p>
              </div>
            </button>

            {/* LinkTree */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px',
              borderRadius: '16px',
              background: isDark
                ? 'rgba(97,222,44,0.08)'
                : 'rgba(97,222,44,0.06)',
              border: `1px solid ${isDark
                ? 'rgba(97,222,44,0.2)'
                : 'rgba(97,222,44,0.3)'}`,
              cursor: 'pointer',
              color: isDark ? '#F3F3F3' : '#120F0F',
              fontFamily: 'Inter, sans-serif',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(97,222,44,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Link size={18} color="#61DE2C" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: 0,
                  color: isDark ? '#F3F3F3' : '#120F0F',
                }}>LinkTree</p>
                <p style={{
                  fontSize: '11px',
                  margin: 0,
                  color: isDark ? 'rgba(243,243,243,0.5)' : 'rgba(18,15,15,0.5)',
                }}>Social Links</p>
              </div>
            </button>
          </div>
        )}
      </header>
    </>
  )
}
