export default function ImmersiveLoading() {
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
