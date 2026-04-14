export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: 'rgba(0,0,0,0.4)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Logo */}
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>PARIS</span>{' '}
          <span style={{ color: '#FAF7F0' }}>2024</span>
        </p>

        {/* Olympic rings */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '1rem 0' }}>
          {['#4FA3E0','#000000','#CE1126','#FFB612','#00A651'].map((color, i) => (
            <div key={i} style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `3px solid ${color}`,
              opacity: 0.7,
            }} />
          ))}
        </div>

        <p style={{
          color: 'rgba(250,247,240,0.5)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.82rem',
          letterSpacing: '0.04em',
          margin: '0.5rem 0 0',
        }}>
          Projet réalisé par{' '}
          <span style={{ color: '#C9A84C', fontWeight: 600 }}>Samuel</span>
          {' & '}
          <span style={{ color: '#C9A84C', fontWeight: 600 }}>William</span>
          {' '}· Vibe Coding × JO Paris 2024
        </p>
        <p style={{
          color: 'rgba(250,247,240,0.25)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.72rem',
          marginTop: '0.5rem',
        }}>
          © 2024 — Projet académique Ynov
        </p>
      </div>
    </footer>
  );
}
