'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useTheme } from '@/context/ThemeContext'
import { X, Eye, EyeOff } from 'lucide-react'

export default function LoginSheet({ onClose }) {
  const { login, logout, isAdmin } = useAdmin()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      onClose()
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    onClose()
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${isDark
      ? 'rgba(243,243,243,0.12)'
      : 'rgba(110,1,240,0.2)'}`,
    background: isDark
      ? 'rgba(243,243,243,0.06)'
      : 'rgba(110,1,240,0.04)',
    color: isDark ? '#F3F3F3' : '#120F0F',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: isDark ? '#1A1A1A' : '#F3F3F3',
        borderRadius: '24px 24px 0 0',
        padding: '24px 24px 48px',
        zIndex: 61,
        border: `1px solid ${isDark
          ? 'rgba(243,243,243,0.08)'
          : 'rgba(110,1,240,0.1)'}`,
      }}>

        {/* Handle */}
        <div style={{
          width: '40px',
          height: '4px',
          borderRadius: '2px',
          background: isDark
            ? 'rgba(243,243,243,0.2)'
            : 'rgba(18,15,15,0.2)',
          margin: '0 auto 24px',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: isDark
              ? 'rgba(243,243,243,0.08)'
              : 'rgba(110,1,240,0.08)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={16} color={isDark ? '#F3F3F3' : '#120F0F'} />
        </button>

        {isAdmin ? (
          // Logged in as admin — show logout
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(97,222,44,0.15)',
              border: '1px solid rgba(97,222,44,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#61DE2C',
              }} />
            </div>

            <p style={{
              color: isDark ? '#F3F3F3' : '#120F0F',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '4px',
            }}>
              Admin Active
            </p>
            <p style={{
              color: isDark
                ? 'rgba(243,243,243,0.5)'
                : 'rgba(18,15,15,0.5)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '32px',
            }}>
              Edit mode is on
            </p>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(228,79,198,0.1)',
                border: '1px solid rgba(228,79,198,0.3)',
                color: '#E44FC6',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>

        ) : (
          // Not logged in — show login form
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              style={inputStyle}
            />

            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ ...inputStyle, paddingRight: '48px' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword
                  ? <EyeOff size={16} color={isDark ? 'rgba(243,243,243,0.4)' : 'rgba(18,15,15,0.4)'} />
                  : <Eye size={16} color={isDark ? 'rgba(243,243,243,0.4)' : 'rgba(18,15,15,0.4)'} />
                }
              </button>
            </div>

            {error && (
              <p style={{
                color: '#E44FC6',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
              }}>
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: loading
                  ? 'rgba(110,1,240,0.4)'
                  : '#6E01F0',
                border: 'none',
                color: '#F3F3F3',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
