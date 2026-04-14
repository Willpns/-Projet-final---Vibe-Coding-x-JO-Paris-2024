import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/ecosysteme',   label: 'Écosystème JO',       num: '01' },
  { to: '/athlete',      label: 'Dashboard Athlète',    num: '02' },
  { to: '/heritage',     label: 'Héritage Olympique',   num: '03' },
  { to: '/innovations',  label: 'Innovations Tech',     num: '04' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.6rem 2rem' : '1.1rem 2rem',
        transition: 'all 0.35s ease',
        background: scrolled
          ? 'rgba(11, 29, 58, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
      }}
    >
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }} id="nav-logo">
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '0.04em',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>PARIS</span>{' '}
            <span style={{ color: '#FAF7F0' }}>2024</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex',
          gap: '0.25rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          alignItems: 'center',
        }} className="desktop-nav">
          {navLinks.map(({ to, label, num }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  id={`nav-link-${num}`}
                  style={{
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: active ? '#C9A84C' : 'rgba(250,247,240,0.75)',
                    background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                    border: active ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseOver={e => {
                    if (!active) {
                      e.currentTarget.style.color = '#C9A84C';
                      e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
                    }
                  }}
                  onMouseOut={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(250,247,240,0.75)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.7rem' }}>{num}</span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          id="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="hamburger-btn"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#C9A84C',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        maxHeight: menuOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
        background: 'rgba(11,29,58,0.97)',
      }} className="mobile-menu">
        <ul style={{ listStyle: 'none', padding: '1rem 2rem 1.5rem', margin: 0 }}>
          {navLinks.map(({ to, label, num }) => (
            <li key={to} style={{ borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '0.75rem 0' }}>
              <Link
                to={to}
                id={`nav-mobile-${num}`}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === to ? '#C9A84C' : '#FAF7F0',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.75rem' }}>{num}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
