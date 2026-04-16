import { Link } from 'react-router-dom';

const sections = [
  {
    num: '01',
    to: '/ecosysteme',
    title: 'Écosystème JO',
    subtitle: 'Infographie interactive',
    description: 'Explorez la carte complète de l\'écosystème des Jeux : sites, épreuves, nations et athlètes.',
    icon: '🗺️',
    accent: 'linear-gradient(135deg, #4FA3E0 0%, #00B4A6 100%)',
    id: 'cta-ecosysteme',
  },
  {
    num: '02',
    to: '/athlete',
    title: 'Dashboard Athlète',
    subtitle: 'Léon Marchand',
    description: 'Plongez dans les performances et le parcours d\'exception du champion olympique français.',
    icon: '🏊',
    accent: 'linear-gradient(135deg, #C9A84C 0%, #F0D080 100%)',
    id: 'cta-athlete',
  },
  {
    num: '03',
    to: '/heritage',
    title: 'Héritage Olympique',
    subtitle: 'Le récit de Paris',
    description: 'Découvrez l\'impact durable des Jeux sur la ville de Paris et ses habitants.',
    icon: '🏛️',
    accent: 'linear-gradient(135deg, #E8547A 0%, #7B52AB 100%)',
    id: 'cta-heritage',
  },
  {
    num: '04',
    to: '/innovations',
    title: 'Innovations Tech',
    subtitle: 'La technologie au service du sport',
    description: 'Explorez les technologies de pointe qui ont redéfini l\'expérience olympique.',
    icon: '⚡',
    accent: 'linear-gradient(135deg, #7B52AB 0%, #00B4A6 100%)',
    id: 'cta-innovations',
  },
];

export default function Home() {
  return (
    <main id="home-page" style={{ minHeight: '100vh' }}>
      {/* ── Hero Section ── */}
      <section
        id="hero"
        className="animated-bg noise-overlay"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 1.5rem 4rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,166,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,84,122,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', paddingBottom: '4rem' }}>
          {/* Badge */}
          <div
            id="hero-badge"
            className="animate-fadeInUp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50px',
              padding: '0.4rem 1.2rem',
              marginBottom: '2rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A84C',
            }}
          >
            <span>✦</span>
            <span>Vibe Coding × JO Paris 2024</span>
            <span>✦</span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-title"
            className="animate-fadeInUp delay-200"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 900,
              marginBottom: '1.25rem',
              lineHeight: 1.05,
            }}
          >
            <span className="text-gold">Paris</span>
            <br />
            <span style={{ color: '#FAF7F0' }}>2024</span>
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            className="animate-fadeInUp delay-300"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'rgba(250,247,240,0.7)',
              maxWidth: '560px',
              margin: '0 auto 0.75rem',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            L'expérience olympique réinventée — explorez l'histoire, les athlètes,
            l'héritage et les innovations des Jeux Olympiques de Paris.
          </p>

          {/* Olympic Rings */}
          <div
            className="animate-fadeInUp delay-400"
            style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '1.75rem 0 2.5rem' }}
          >
            {['#4FA3E0', '#000000', '#CE1126', '#FFB612', '#00A651'].map((color, i) => (
              <div key={i} style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: `3.5px solid ${color}`,
                opacity: 0.85,
              }} />
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="animate-fadeInUp delay-500"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
          >
            <Link to="/ecosysteme" className="btn-gold" id="hero-cta-primary">
              Explorer l'écosystème
            </Link>
            <Link to="/athlete" className="btn-outline" id="hero-cta-secondary">
              Voir Léon Marchand
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.45,
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C' }}>
            Découvrir
          </span>
          <div style={{
            width: '1.5px',
            height: '40px',
            background: 'linear-gradient(to bottom, #C9A84C, transparent)',
          }} />
        </div>
      </section>

      {/* ── Section Cards ── */}
      <section
        id="sections-grid"
        style={{
          padding: '5rem 1.5rem 6rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            Les 4 Grandes Sections
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#FAF7F0',
            margin: 0,
          }}>
            Explorer l'univers <span className="text-accent">olympique</span>
          </h2>
          <div className="divider-gold" style={{ margin: '1.25rem auto 0' }} />
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {sections.map(({ num, to, title, subtitle, description, icon, accent, id }) => (
            <Link
              key={to}
              to={to}
              id={id}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="glass-card"
                style={{ padding: '2rem', height: '100%', cursor: 'pointer' }}
              >
                {/* Number + Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {num}
                  </span>
                  <span style={{ fontSize: '2.2rem' }}>{icon}</span>
                </div>

                {/* Accent line */}
                <div style={{
                  width: '40px',
                  height: '3px',
                  background: accent,
                  borderRadius: '2px',
                  marginBottom: '1.25rem',
                }} />

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#FAF7F0',
                  margin: '0 0 0.3rem',
                }}>
                  {title}
                </h3>

                {/* Subtitle */}
                <p style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  margin: '0 0 0.9rem',
                }}>
                  {subtitle}
                </p>

                {/* Description */}
                <p style={{
                  color: 'rgba(250,247,240,0.6)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {description}
                </p>

                {/* Arrow */}
                <div style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#C9A84C',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}>
                  <span>Explorer</span>
                  <span style={{ fontSize: '1rem' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
