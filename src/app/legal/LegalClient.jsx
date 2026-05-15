'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const TABS = [
  { id: 'terms',   label: 'Terms'   },
  { id: 'privacy', label: 'Privacy' },
  { id: 'refund',  label: 'Refund'  },
]

function renderNode(node, idx) {
  if (!node) return null
  switch (node.type) {
    case 'doc':
      return (
        <div key={idx}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </div>
      )
    case 'paragraph':
      return (
        <p key={idx} style={{
          color: 'rgba(243,243,243,0.65)',
          fontSize: '15px',
          lineHeight: '1.75',
          fontFamily: 'Inter, sans-serif',
          margin: '0 0 18px 0',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    case 'heading': {
      const level = node.attrs?.level || 2
      const sizes = { 1: '22px', 2: '17px', 3: '15px' }
      return (
        <p key={idx} style={{
          color: '#F3F3F3',
          fontSize: sizes[level] || '17px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          margin: '28px 0 8px 0',
          lineHeight: '1.3',
          letterSpacing: '-0.1px',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    }
    case 'bulletList':
      return (
        <ul key={idx} style={{ paddingLeft: '20px', margin: '0 0 18px 0' }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </ul>
      )
    case 'listItem':
      return (
        <li key={idx} style={{
          color: 'rgba(243,243,243,0.65)',
          fontSize: '15px',
          lineHeight: '1.75',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '6px',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </li>
      )
    case 'text': {
      const marks = node.marks || []
      if (marks.some(m => m.type === 'bold'))
        return <strong key={idx} style={{ fontWeight: '700', color: '#F3F3F3' }}>{node.text}</strong>
      if (marks.some(m => m.type === 'italic'))
        return <em key={idx}>{node.text}</em>
      return <span key={idx}>{node.text}</span>
    }
    default:
      return null
  }
}

function LegalContent({ doc }) {
  if (!doc) {
    return (
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '60px 20px',
      }}>
        <p style={{
          color: 'rgba(243,243,243,0.3)', fontSize: '15px',
          fontFamily: 'Inter, sans-serif', textAlign: 'center',
        }}>
          No content yet.
        </p>
      </div>
    )
  }

  let parsed = doc.content
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed) } catch { parsed = null }
  }

  const lastUpdated = doc.last_updated
    ? new Date(doc.last_updated).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <div style={{ flex: 1, padding: '28px 20px 60px' }}>
      <h1 style={{
        color: '#F3F3F3', fontSize: '24px', fontWeight: '800',
        fontFamily: 'Inter, sans-serif', margin: '0 0 6px 0', letterSpacing: '-0.4px',
      }}>
        {doc.title}
      </h1>
      {lastUpdated && (
        <p style={{
          color: 'rgba(243,243,243,0.3)', fontSize: '12px',
          fontFamily: 'Inter, sans-serif', margin: '0 0 28px 0', letterSpacing: '0.2px',
        }}>
          Last updated {lastUpdated}
        </p>
      )}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }} />
      {parsed ? renderNode(parsed, 0) : (
        <p style={{ color: 'rgba(243,243,243,0.3)', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
          No content yet.
        </p>
      )}
    </div>
  )
}

export default function LegalClient({ terms, privacy, refund }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('terms')

  const docMap = { terms, privacy, refund }

  return (
    <div style={{ minHeight: '100dvh', background: '#080809', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: '#6E01F0', padding: '52px 20px 20px',
        display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.15)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#F3F3F3', flexShrink: 0,
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <span style={{
          color: '#F3F3F3', fontSize: '18px', fontWeight: '700',
          fontFamily: 'Inter, sans-serif', letterSpacing: '-0.2px',
        }}>
          Legal
        </span>
      </div>

      <div style={{
        display: 'flex', background: '#0D0D10',
        borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
      }}>
        {TABS.map(tab => {
          const active = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, height: '48px', background: 'none', border: 'none',
                borderBottom: active ? '2px solid #6E01F0' : '2px solid transparent',
                color: active ? '#F3F3F3' : 'rgba(243,243,243,0.35)',
                fontSize: '14px', fontWeight: active ? '600' : '400',
                fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                transition: 'all 0.15s ease', letterSpacing: '-0.1px',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <LegalContent doc={docMap[activeTab]} />
      </div>
    </div>
  )
}
