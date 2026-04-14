export default function SectionPage({
  num,
  title,
  subtitle,
  description,
  icon,
  accentColor,
  badgeLabel,
  id,
}) {
  return (
    <main
      id={id}
      className="section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', padding: '0 1rem' }}>
        {/* Badge */}
        <div
          className="animate-fadeInUp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}40`,
            borderRadius: '50px',
            padding: '0.4rem 1.2rem',
            marginBottom: '2rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accentColor,
          }}
        >
          Section {num} · {badgeLabel}
        </div>

        {/* Icon */}
        <div
          className="animate-fadeInUp delay-100"
          style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1 }}
        >
          {icon}
        </div>

        {/* Big number */}
        <div
          className="animate-fadeInUp delay-200"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: `${accentColor}10`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}
        >
          {num}
        </div>

        {/* Title */}
        <h1
          className="animate-fadeInUp delay-200"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 900,
            color: '#FAF7F0',
            margin: '0 0 0.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {title}
        </h1>

        {/* Accent line */}
        <div
          className="animate-fadeInUp delay-300"
          style={{
            width: '60px',
            height: '3px',
            background: accentColor,
            borderRadius: '2px',
            margin: '1rem auto',
          }}
        />

        {/* Subtitle */}
        <p
          className="animate-fadeInUp delay-400"
          style={{
            fontSize: '1rem',
            color: 'rgba(250,247,240,0.55)',
            lineHeight: 1.7,
            margin: '0 auto',
            maxWidth: '480px',
          }}
        >
          {description}
        </p>

        {/* Coming soon badge */}
        <div
          className="animate-fadeInUp delay-500"
          style={{
            marginTop: '2.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            padding: '0.6rem 1.5rem',
            fontSize: '0.8rem',
            color: 'rgba(250,247,240,0.4)',
            letterSpacing: '0.06em',
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: accentColor,
            display: 'inline-block',
            boxShadow: `0 0 8px ${accentColor}`,
          }} />
          Contenu en cours de développement — Étape 2
        </div>
      </div>
    </main>
  );
}
