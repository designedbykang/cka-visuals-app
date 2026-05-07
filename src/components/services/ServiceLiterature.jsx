'use client'

function renderNode(node, idx) {
  if (!node) return null

  switch (node.type) {
    case 'doc':
      return <div key={idx}>{node.content?.map((n, i) => renderNode(n, i))}</div>

    case 'paragraph':
      return (
        <p key={idx} style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: '1.7',
          fontFamily: 'Inter, sans-serif',
          margin: '0 0 16px 0',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )

    case 'heading': {
      const level = node.attrs?.level || 2
      const sizes = { 1: '24px', 2: '20px', 3: '17px' }
      return (
        <p key={idx} style={{
          color: 'var(--text-primary)',
          fontSize: sizes[level] || '18px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          margin: '24px 0 8px 0',
          lineHeight: '1.3',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    }

    case 'bulletList':
      return (
        <ul key={idx} style={{ paddingLeft: '20px', margin: '0 0 16px 0' }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </ul>
      )

    case 'listItem':
      return (
        <li key={idx} style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: '1.7',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '4px',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </li>
      )

    case 'text': {
      const marks = node.marks || []
      let el = <span key={idx}>{node.text}</span>
      if (marks.some(m => m.type === 'bold')) el = <strong key={idx} style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{node.text}</strong>
      if (marks.some(m => m.type === 'italic')) el = <em key={idx}>{node.text}</em>
      return el
    }

    default:
      return null
  }
}

export default function ServiceLiterature({ content }) {
  if (!content) return null

  let parsed = content
  if (typeof content === 'string') {
    try { parsed = JSON.parse(content) } catch { return null }
  }

  return (
    <div style={{ paddingBottom: '40px' }}>
      {renderNode(parsed, 0)}
    </div>
  )
}

