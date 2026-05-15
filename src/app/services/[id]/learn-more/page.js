'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Share2 } from 'lucide-react'
import { useService } from '@/app/hooks/useService'
import { useServiceFeaturedClients } from '@/hooks/useServiceFeaturedClients'
import { useServicesContext } from '@/context/ServicesContext'
import ContactPopup from '@/components/services/ContactPopup'

// Renders TipTap JSON as React elements
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
          color: 'rgba(243,243,243,0.7)',
          fontSize: '16px',
          lineHeight: '1.75',
          fontFamily: 'Inter, sans-serif',
          margin: '0 0 20px 0',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    case 'heading': {
      const level = node.attrs?.level || 2
      const sizes = { 1: '26px', 2: '21px', 3: '18px' }
      return (
        <p key={idx} style={{
          color: '#F3F3F3',
          fontSize: sizes[level] || '20px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          margin: '32px 0 12px 0',
          lineHeight: '1.3',
          letterSpacing: '-0.2px',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      )
    }
    case 'bulletList':
      return (
        <ul key={idx} style={{
          paddingLeft: '20px',
          margin: '0 0 20px 0',
        }}>
          {node.content?.map((n, i) => renderNode(n, i))}
        </ul>
      )
    case 'listItem':
      return (
        <li key={idx} style={{
          color: 'rgba(243,243,243,0.7)',
          fontSize: '16px',
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

function Literature({ content }) {
  if (!content) return null
  let parsed = content
  if (typeof content === 'string') {
    try { parsed = JSON.parse(content) } catch { return null }
  }
  return <div>{renderNode(parsed, 0)}</div>
}

function FeaturedClientsStrip({ clients, serviceId }) {
  const router = useRouter()

  // Placeholder avatars when no real clients yet
  const placeholders = [
    { id: 'p1', name: 'Client A', avatar_url: null, portfolio_piece_id: null },
    { id: 'p2', name: 'Client B', avatar_url: null, portfolio_piece_id: null },
    { id: 'p3', name: 'Client C', avatar_url: null, portfolio_piece_id: null },
    { id: 'p4', name: 'Client D', avatar_url: null, portfolio_piece_id: null },
  ]

  const display = clients.length > 0 ? clients : placeholders

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{
        color: 'rgba(243,243,243,0.35)',
        fontSize: '11px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        Brands we've done this for
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
        {display.map((client, i) => (
          <button
            key={client.id}
            onClick={() => {
              if (client.portfolio_piece_id) {
                router.push(`/portfolio/identity-creation/${client.portfolio_piece_id}`)
              }
            }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2.5px solid #080809',
              overflow: 'hidden',
              marginLeft: i === 0 ? 0 : '-12px',
              cursor: client.portfolio_piece_id ? 'pointer' : 'default',
              flexShrink: 0,
              background: client.avatar_url
                ? 'transparent'
                : `hsl(${i * 60 + 140}, 45%, 25%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: display.length - i,
              position: 'relative',
            }}
          >
            {client.avatar_url ? (
              <img
                src={client.avatar_url}
                alt={client.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
              />
            ) : (
              <span style={{
                color: 'rgba(243,243,243,0.5)',
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
              }}>
                {client.name.charAt(0)}
              </span>
            )}
          </button>
        ))}

        {clients.length > 0 && (
          <span style={{
            color: 'rgba(243,243,243,0.4)',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            marginLeft: '14px',
          }}>
            {clients.length} brand{clients.length !== 1 ? 's' : ''} served
          </span>
        )}
      </div>
    </div>
  )
}

function DetailFacts({ deliverables }) {
  if (!deliverables || deliverables.length === 0) return null

  const pairs = []
  for (let i = 0; i < Math.min(deliverables.length, 4); i += 2) {
    pairs.push([deliverables[i], deliverables[i + 1]])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {pairs.map(([left, right], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          {/* Left fact */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(110,1,240,0.2)',
              border: '1px solid rgba(110,1,240,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#9E56F5',
              }} />
            </div>
            <span style={{
              color: 'rgba(243,243,243,0.65)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}>
              {left.label}
            </span>
          </div>

          {right && (
            <>
              <span style={{
                color: 'rgba(243,243,243,0.2)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                flexShrink: 0,
                paddingTop: '4px',
              }}>·</span>

              {/* Right fact */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(110,1,240,0.2)',
                  border: '1px solid rgba(110,1,240,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#9E56F5',
                  }} />
                </div>
                <span style={{
                  color: 'rgba(243,243,243,0.65)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500',
                }}>
                  {right.label}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default function LearnMorePage() {
  const { id } = useParams()
  const router = useRouter()
  const { service, packages, deliverables, loading } = useService(id)
  const { clients } = useServiceFeaturedClients(id)
  const { selectedPackageId, openContactPopup } = useServicesContext()
  const [contactOpen, setContactOpen] = useState(false)

  const lowestPrice = packages
    ?.map(p => p.price)
    .filter(p => typeof p === 'number' && p > 0)
    .sort((a, b) => a - b)[0] ?? null

  const currency = packages?.[0]?.currency || 'XAF'

  // PAY if user came through checkout, BUY NOW if fresh arrival
  const hasSelectedPackage = Boolean(selectedPackageId)
  const ctaLabel = hasSelectedPackage
    ? `PAY ${lowestPrice?.toLocaleString()} ${currency}`
    : 'BUY NOW'

  const handleCta = () => {
    if (hasSelectedPackage) {
      openContactPopup()
    } else {
      router.push(`/services/${id}`)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: '#080809',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(243,243,243,0.1)',
          borderTop: '2px solid #6E01F0',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  if (!service) return null

  return (
    <>
      <div style={{
        minHeight: '100dvh',
        background: '#080809',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '96px',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '56px 20px 16px',
          flexShrink: 0,
        }}>
          <button
            onClick={() => router.back()}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(243,243,243,0.6)',
            }}
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({
                  title: service.name,
                  url: window.location.href,
                })
              }
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(243,243,243,0.6)',
            }}
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Hero image */}
        <div style={{
          width: '100%',
          height: '38vh',
          flexShrink: 0,
          overflow: 'hidden',
          background: '#002812',
        }}>
          {service.hero_image_url ? (
            <img
              src={service.hero_image_url}
              alt={service.name}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                pointerEvents: 'none',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: '#002812',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                color: 'rgba(255,255,255,0.1)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                No image yet
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: '24px 20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>

          {/* Bundle badge */}
          {service.bundle_name && (
            <div style={{ alignSelf: 'flex-start' }}>
              <span style={{
                background: '#6E01F0',
                color: '#F3F3F3',
                fontSize: '10px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '5px 14px',
                borderRadius: '20px',
              }}>
                Included in {service.bundle_name}
              </span>
            </div>
          )}

          {/* Hook paragraph + subscribe */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{
              color: 'rgba(243,243,243,0.65)',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.65',
              margin: 0,
            }}>
              {service.tagline || 'Lorem ipsum dolor sit of lorem ipsum dolor sit of lorem ipsum dolor sit of lorem ipsum.'}
            </p>
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#9E56F5',
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                textAlign: 'left',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Subscribe Here
            </button>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.07)',
          }} />

          {/* Tags */}
          {service.service_tag_assignments?.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {service.service_tag_assignments.map(a => (
                <span
                  key={a.tag_id}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '100px',
                    border: '1px solid rgba(243,243,243,0.2)',
                    color: 'rgba(243,243,243,0.5)',
                    fontSize: '12px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  {a.tag_id.replace(/^tag-/, '').replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Service name — editorial headline */}
          <h1 style={{
            color: '#F3F3F3',
            fontSize: '30px',
            fontWeight: '900',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            lineHeight: '1.15',
            letterSpacing: '-0.5px',
            textTransform: 'uppercase',
          }}>
            {service.name}
          </h1>

          {/* Featured clients strip */}
          <FeaturedClientsStrip clients={clients} serviceId={id} />

          {/* Short descriptor beside clients */}
          {service.tagline && (
            <p style={{
              color: 'rgba(243,243,243,0.5)',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.6',
              margin: 0,
            }}>
              {service.tagline}
            </p>
          )}

          {/* Detail facts */}
          {deliverables.length > 0 && (
            <DetailFacts deliverables={deliverables} />
          )}

          {/* Divider before literature */}
          {service.literature && (
            <div style={{
              height: '1px',
              background: 'rgba(255,255,255,0.07)',
            }} />
          )}

          {/* Literature — the blog body */}
          {service.literature && (
            <div style={{ paddingBottom: '8px' }}>
              <Literature content={service.literature} />
            </div>
          )}

        </div>
      </div>

      {/* Persistent bottom bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#080809',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 20px 36px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: 10,
      }}>
        {/* Terms + Privacy + Policy links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          flexShrink: 0,
        }}>
          {['Terms', 'Privacy', 'Policy'].map(label => (
            <button
              key={label}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'rgba(243,243,243,0.35)',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                textAlign: 'left',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={handleCta}
          style={{
            flex: 1,
            padding: '16px',
            borderRadius: '14px',
            background: '#6E01F0',
            border: 'none',
            color: '#F3F3F3',
            fontSize: '16px',
            fontWeight: '900',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'opacity 0.15s ease',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {ctaLabel}
        </button>
      </div>

      {/* Contact popup — only shown if user has selected package */}
      {contactOpen && (
        <ContactPopup />
      )}
    </>
  )
}
