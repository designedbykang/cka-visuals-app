'use client'

import { X } from 'lucide-react'
import { usePortfolioContext } from '@/context/PortfolioContext'

function renderNode(node, idx) {
  if (!node) return null
  switch (node.type) {
    case 'doc':
      return <div key={idx}>{node.content?.map((n, i) => renderNode(n, i))}</div>
    case 'paragraph':
      return (
        <p key={idx} style={{
          color: 'rgba(18,15,15,0.75)',
          fontSize: '15px',
          lineHeight: '1.75',
          fontFamily: 'Inter, sans-serif',
          margin: '0 0 16px',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    case 'heading': {
      const sizes = { 1: '22px', 2: '18px', 3: '16px' }
      return (
        <p key={idx} style={{
          color: '#120F0F',
          fontSize: sizes[node.attrs?.level] || '18px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          margin: '24px 0 8px',
          lineHeight: '1.3',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    }
    case 'text': {
      const marks = node.marks || []
      if (marks.some(m => m.type === 'bold'))
        return <strong key={idx} style={{ fontWeight: '700' }}>{node.text}</strong>
      if (marks.some(m => m.type === 'italic'))
        return <em key={idx}>{node.text}</em>
      return <span key={idx}>{node.text}</span>
    }
    default: return null
  }
}

export default function LiteratureSlideUp({ piece, images }) {
  const { literatureOpen, toggleLiterature } = usePortfolioContext()

  if (!literatureOpen || !piece) return null

  let parsedLiterature = piece.literature
  if (typeof parsedLiterature === 'string') {
    try { parsedLiterature = JSON.parse(parsedLiterature) } catch { parsedLiterature = null }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      {/* Backdrop */}
      <div
        onClick={toggleLiterature}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'relative',
        background: '#F3F3F3',
        borderRadius: '24px 24px 0 0',
        maxHeight: '90dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease',
      }}>
        {/* Handle + close */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 0 0',
          flexShrink: 0,
        }}>
          <div style={{
            width: '40px',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(18,15,15,0.15)',
          }} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px 8px',
          flexShrink: 0,
        }}>
          <h2 style={{
            color: '#120F0F',
            fontSize: '20px',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            letterSpacing: '-0.3px',
          }}>
            {piece.title}
          </h2>
          <button
            onClick={toggleLiterature}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(18,15,15,0.08)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={15} color="#120F0F" />
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{
          overflowY: 'auto',
          padding: '8px 20px 40px',
          scrollbarWidth: 'none',
        }}>
          {/* Problem */}
          {piece.problem && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{
                color: 'rgba(18,15,15,0.35)',
                fontSize: '10px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}>
                The Problem
              </p>
              <p style={{
                color: 'rgba(18,15,15,0.75)',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.65',
                margin: 0,
              }}>
                {piece.problem}
              </p>
            </div>
          )}

          {/* Solution */}
          {piece.solution && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{
                color: 'rgba(18,15,15,0.35)',
                fontSize: '10px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}>
                The Approach
              </p>
              <p style={{
                color: 'rgba(18,15,15,0.75)',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.65',
                margin: 0,
              }}>
                {piece.solution}
              </p>
            </div>
          )}

          {/* Outcome */}
          {piece.outcome && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{
                color: 'rgba(18,15,15,0.35)',
                fontSize: '10px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}>
                The Outcome
              </p>
              <p style={{
                color: 'rgba(18,15,15,0.75)',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.65',
                margin: 0,
              }}>
                {piece.outcome}
              </p>
            </div>
          )}

          {/* People */}
          {piece.people_involved && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                color: 'rgba(18,15,15,0.35)',
                fontSize: '10px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}>
                Credits
              </p>
              <p style={{
                color: 'rgba(18,15,15,0.6)',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6',
                margin: 0,
              }}>
                {piece.people_involved}
              </p>
            </div>
          )}

          {/* Divider before literature */}
          {parsedLiterature && (
            <div style={{
              height: '1px',
              background: 'rgba(18,15,15,0.08)',
              margin: '0 0 24px',
            }} />
          )}

          {/* Literature body */}
          {parsedLiterature && renderNode(parsedLiterature, 0)}
        </div>
      </div>
    </div>
  )
}
