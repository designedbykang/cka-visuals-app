'use client'

import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const PLACEHOLDERS = [
  'Buy Services...',
  'Find Products...',
  'Start a Project...',
  'Browse Portfolio...',
]

const FILTERS = {
  Category: ['Services', 'Portfolio', 'Content'],
  Location: ['Lekki', 'Molyko', 'Ikeja', 'Logpom', 'Osu'],
}
function FilterButton({ onToggle, hasActive, theme }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '44px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hasActive ? 'rgba(110,1,240,0.15)' : 'transparent',
        border: 'none',
        borderRight: `1px solid ${theme === 'dark'
          ? 'rgba(97,222,44,0.2)'
          : 'rgba(110,1,240,0.2)'}`,
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s ease',
        borderRadius: '4px 0 0 4px',
      }}
    >
      <SlidersHorizontal
        size={18}
        color={hasActive ? '#61DE2C' : theme === 'dark' ? '#F3F3F3' : '#120F0F'}
      />
    </button>
  )
}

function SearchIconButton({ theme }) {
  return (
    <button
      style={{
        width: '44px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        borderLeft: `1px solid ${theme === 'dark'
          ? 'rgba(97,222,44,0.2)'
          : 'rgba(110,1,240,0.2)'}`,
        cursor: 'pointer',
        flexShrink: 0,
        borderRadius: '0 4px 4px 0',
      }}
    >
      <Search
        size={18}
        color={theme === 'dark' ? '#61DE2C' : '#6E01F0'}
      />
    </button>
  )
}

function FilterDropdown({ active, onSelect, theme }) {
  const isDark = theme === 'dark'
  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 8px)',
      left: 0,
      right: 0,
      background: isDark ? '#1A1A1A' : '#F3F3F3',
      border: `1px solid ${isDark ? 'rgba(97,222,44,0.2)' : 'rgba(110,1,240,0.2)'}`,
      borderRadius: '6px',
      padding: '20px',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: isDark
        ? '0 8px 32px rgba(0,0,0,0.4)'
        : '0 8px 32px rgba(110,1,240,0.1)',
    }}>
      {Object.entries(FILTERS).map(([group, options]) => (
        <div key={group}>
          <p style={{
            color: isDark ? '#CFAAFA' : '#6E01F0',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
          }}>
            {group}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {options.map(option => {
              const isActive = active[group] === option
              return (
                <button
                  key={option}
                  onClick={() => onSelect(group, option)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '2px',
                    background: isActive
                      ? '#6E01F0'
                      : isDark
                        ? 'rgba(243,243,243,0.06)'
                        : 'rgba(110,1,240,0.06)',
                    border: `1px solid ${isActive
                      ? '#61DE2C'
                      : isDark
                        ? 'rgba(243,243,243,0.1)'
                        : 'rgba(110,1,240,0.15)'}`,
                    color: isActive
                      ? '#F3F3F3'
                      : isDark
                        ? 'rgba(243,243,243,0.8)'
                        : '#120F0F',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontWeight: isActive ? '600' : '400',
                  }}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Active filter summary */}
      {Object.values(active).some(Boolean) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: `1px solid ${isDark
            ? 'rgba(243,243,243,0.08)'
            : 'rgba(110,1,240,0.1)'}`,
        }}>
          <span style={{
            fontSize: '12px',
            color: isDark ? 'rgba(243,243,243,0.5)' : 'rgba(18,15,15,0.5)',
            fontFamily: 'Inter, sans-serif',
          }}>
            {Object.values(active).filter(Boolean).length} filter(s) active
          </span>
          <button
            onClick={() => Object.keys(active).forEach(k => onSelect(k, active[k]))}
            style={{
              fontSize: '12px',
              color: '#61DE2C',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

export default function SearchBar() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (focused) return
    const current = PLACEHOLDERS[placeholderIndex]
    let timeout

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1))
      }, 60)
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1))
      }, 35)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setPlaceholderIndex(i => (i + 1) % PLACEHOLDERS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, placeholderIndex, focused])

  const handleFilterSelect = (group, option) => {
    setActiveFilters(prev => ({
      ...prev,
      [group]: prev[group] === option ? undefined : option,
    }))
    setFilterOpen(false)
  }

  const hasActiveFilters = Object.values(activeFilters).some(Boolean)

  return (
    <div data-searchbar style={{
      padding: '12px 16px',
      position: 'relative',
    }}>
      {/* Single bordered container */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '52px',
        borderRadius: '100px',
        border: `1px solid ${focused
          ? '#61DE2C'
          : hasActiveFilters
            ? '#6E01F0'
            : isDark
              ? 'rgba(97,222,44,0.4)'
              : 'rgba(110,1,240,0.3)'}`,
        background: isDark
          ? 'rgba(243,243,243,0.04)'
          : 'rgba(110,1,240,0.03)',
        transition: 'border-color 0.2s ease',
        overflow: 'hidden',
      }}>

        <FilterButton
          onToggle={() => setFilterOpen(!filterOpen)}
          hasActive={hasActiveFilters}
          theme={theme}
        />

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? '' : displayText}
          style={{
            flex: 1,
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: isDark ? '#F3F3F3' : '#120F0F',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
            padding: '0 12px',
          }}
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
            }}
          >
            <X size={14} color={isDark
              ? 'rgba(243,243,243,0.4)'
              : 'rgba(18,15,15,0.4)'}
            />
          </button>
        )}

        <SearchIconButton theme={theme} />
      </div>

      {/* Filter dropdown */}
      {filterOpen && (
        <FilterDropdown
          active={activeFilters}
          onSelect={handleFilterSelect}
          theme={theme}
        />
      )}
    </div>
  )
}
