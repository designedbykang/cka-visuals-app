export default function PageLoader() {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#080809',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* Spinning ring */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2.5px solid rgba(110,1,240,0.2)',
            borderTop: '2.5px solid #6E01F0',
            animation: 'spin 0.75s linear infinite',
          }} />
          {/* Logo mark */}
          <img
            src="/logo.png"
            alt=""
            style={{
              height: '20px',
              width: 'auto',
              objectFit: 'contain',
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    )
  }
  