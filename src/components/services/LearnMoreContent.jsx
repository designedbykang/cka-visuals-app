'use client'

import { Check } from 'lucide-react'

function renderNode(node, key) {
  if (!node) return null

  switch (node.type) {
    case 'doc':
      return <>{node.content?.map((child, i) => renderNode(child, i))}</>

    case 'paragraph':
      return (
        <p key={key} style={{
          color: 'rgba(243,243,243,0.75)',
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.75',
          margin: '0 0 16px',
        }}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </p>
      )

    case 'heading': {
      const level = node.attrs?.level || 2
      const Tag = `h${level}`
      return (
        <Tag key={key} style={{
          color: '#F3F3F3',
          fontSize: level === 1 ? '22px' : level === 2 ? '19px' : '16px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.3px',
          margin: '24px 0 10px',
          lineHeight: '1.3',
        }}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </Tag>
      )
    }

    case 'bulletList':
      return (
        <ul key={key} style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      )

    case 'orderedList':
      return (
        <ol key={key} style={{ paddingLeft: '20px', margin: '0 0 16px', color: 'rgba(243,243,243,0.75)', fontSize: '16px', fontFamily: 'Inter, sans-serif', lineHeight: '1.75' }}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      )

    case 'listItem':
      return (
        <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
            background: 'rgba(110,1,240,0.2)', border: '1px solid rgba(110,1,240,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9E56F5' }} />
          </div>
          <span style={{ color: 'rgba(243,243,243,0.75)', fontSize: '15px', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </span>
        </li>
      )

    case 'text': {
      let text = node.text || ''
      const marks = node.marks || []
      let el = <>{text}</>
      for (const mark of marks) {
        if (mark.type === 'bold') el = <strong style={{ fontWeight: '700', color: '#F3F3F3' }}>{el}</strong>
        if (mark.type === 'italic') el = <em>{el}</em>
        if (mark.type === 'code') el = <code style={{ background: 'rgba(110,1,240,0.2)', padding: '1px 5px', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace', color: '#9E56F5' }}>{el}</code>
      }
      return <span key={key}>{el}</span>
    }

    case 'hardBreak':
      return <br key={key} />

    default:
      return node.content?.map((child, i) => renderNode(child, i)) || null
  }
}

export function LiteratureRenderer({ content }) {
  if (!content) {
    return (
      <p style={{
        color: 'rgba(243,243,243,0.3)',
        fontSize: '15px',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        padding: '40px 0',
        margin: 0,
      }}>
        No content available yet.
      </p>
    )
  }

  let parsed = content
  if (typeof content === 'string') {
    try { parsed = JSON.parse(content) } catch { return <p style={{ color: 'rgba(243,243,243,0.5)', fontFamily: 'Inter, sans-serif' }}>{content}</p> }
  }

  return <>{renderNode(parsed, 'root')}</>
}

export function DeliverablesRenderer({ deliverables }) {
  if (!deliverables || deliverables.length === 0) {
    return (
      <p style={{
        color: 'rgba(243,243,243,0.3)',
        fontSize: '15px',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        padding: '40px 0',
        margin: 0,
      }}>
        No deliverables listed yet.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {deliverables.map(d => (
        <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(110,1,240,0.2)', border: '1px solid rgba(110,1,240,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={12} color="#9E56F5" />
          </div>
          <span style={{ color: 'rgba(243,243,243,0.85)', fontSize: '15px', fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function LearnMoreContent({ activeTab, service, deliverables }) {
  if (activeTab === 'deliverables') {
    return <DeliverablesRenderer deliverables={deliverables} />
  }
  return <LiteratureRenderer content={service?.literature} />
}
