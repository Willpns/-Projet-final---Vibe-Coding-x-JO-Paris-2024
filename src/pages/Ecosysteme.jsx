import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Sous-composants internes
───────────────────────────────────────────── */

/** Barre de progression animée */
function ProgressBar({ label, percent, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setWidth(percent), delay); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent, delay]);

  return (
    <div ref={ref} style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.7)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color, fontWeight: 700 }}>{percent}%</span>
      </div>
      <div style={{
        height: '7px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          borderRadius: '10px',
          background: color,
          transition: 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 10px ${color}60`,
        }} />
      </div>
    </div>
  );
}

/** Carte hover générique */
function HoverCard({ children, style = {}, accentColor = '#C9A84C' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? accentColor + '80' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '16px',
        padding: '1.5rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.35), 0 0 20px ${accentColor}20`
          : '0 4px 16px rgba(0,0,0,0.2)',
        cursor: 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page principale
───────────────────────────────────────────── */
export default function Ecosysteme() {
  return (
    <main
      id="page-ecosysteme"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(180deg, #0B1D3A 0%, #0d2040 60%, #091628 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── En-tête de section ── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(79,163,224,0.12)', border: '1px solid rgba(79,163,224,0.3)',
            borderRadius: '50px', padding: '0.4rem 1.2rem', marginBottom: '1.5rem',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#4FA3E0',
          }}>
            Section 01 · Infographie Interactive
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900, color: '#FAF7F0', margin: '0 0 1rem',
          }}>
            Écosystème <span style={{
              background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>JO</span> Paris 2024
          </h1>
          <p style={{
            color: 'rgba(250,247,240,0.55)', fontSize: '1rem',
            maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Gouvernance, sites emblématiques, finances et héritage durable —
            une vue d'ensemble structurée des Jeux.
          </p>
          <div style={{
            width: '60px', height: '3px',
            background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
            borderRadius: '2px', margin: '1.5rem auto 0',
          }} />
        </div>

        {/* ── Grille principale ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(540px, 1fr))',
          gap: '1.75rem',
        }}>

          {/* ════════════════════════════════
              BLOC 1 — Gouvernance
          ════════════════════════════════ */}
          <section id="bloc-gouvernance" aria-label="Gouvernance">
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '2rem',
            }}>
              {/* titre du bloc */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>⚖️</div>
                <div>
                  <p style={{ color: '#C9A84C', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Bloc 01</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#FAF7F0', margin: 0 }}>La Gouvernance</h2>
                </div>
              </div>

              {/* Organigramme */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

                {/* CIO */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                  border: '1.5px solid rgba(201,168,76,0.6)',
                  borderRadius: '14px', padding: '1rem 2rem', textAlign: 'center', width: '100%', maxWidth: '260px',
                  position: 'relative',
                }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 0.2rem' }}>Entité Principale</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: '#F0D080', margin: '0 0 0.15rem' }}>CIO</p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.6)', margin: 0 }}>Le Garant</p>
                </div>

                {/* Connecteur vertical */}
                <div style={{ width: '2px', height: '24px', background: 'rgba(201,168,76,0.3)' }} />

                {/* Ligne horizontale */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', width: '100%', justifyContent: 'center' }}>
                  {/* Branche gauche */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ width: '100%', height: '2px', background: 'rgba(201,168,76,0.25)', borderRadius: '2px', marginLeft: '50%' }} />
                    <div style={{ width: '2px', height: '20px', background: 'rgba(201,168,76,0.25)' }} />
                    <OrgCard
                      title="COJO"
                      role="Organisation"
                      sub="L'Événement"
                      color="#4FA3E0"
                    />
                  </div>
                  {/* Branche droite */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ width: '100%', height: '2px', background: 'rgba(201,168,76,0.25)', borderRadius: '2px', marginRight: '50%' }} />
                    <div style={{ width: '2px', height: '20px', background: 'rgba(201,168,76,0.25)' }} />
                    <OrgCard
                      title="SOLIDEO"
                      role="Livraison"
                      sub="Les Travaux"
                      color="#00B4A6"
                    />
                  </div>
                </div>

                {/* Mention CNOSF */}
                <div style={{
                  marginTop: '1.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px dashed rgba(255,255,255,0.15)',
                  borderRadius: '50px', padding: '0.45rem 1.2rem',
                }}>
                  <span style={{ fontSize: '0.9rem' }}>🤝</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.5)', fontStyle: 'italic' }}>
                    Soutenu par le <strong style={{ color: 'rgba(250,247,240,0.75)', fontStyle: 'normal' }}>CNOSF</strong>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              BLOC 2 — Sites & Concepts
          ════════════════════════════════ */}
          <section id="bloc-sites" aria-label="Sites et Concepts">
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '2rem',
              height: '100%',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4FA3E0, #00B4A6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>🗺️</div>
                <div>
                  <p style={{ color: '#4FA3E0', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Bloc 02</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#FAF7F0', margin: 0 }}>Sites & Concepts</h2>
                </div>
              </div>

              {/* Badge 95% */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'linear-gradient(135deg, rgba(0,180,166,0.15), rgba(79,163,224,0.08))',
                border: '1px solid rgba(0,180,166,0.4)',
                borderRadius: '12px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#00B4A6' }}>95%</span>
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00B4A6', margin: '0 0 0.1rem' }}>Chiffre Clé</p>
                  <p style={{ fontSize: '0.85rem', color: '#FAF7F0', margin: 0, fontWeight: 500 }}>de sites existants ou temporaires</p>
                </div>
              </div>

              {/* 3 sites */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { icon: '🏐', name: 'Champ de Mars', sport: 'Beach Volley', color: '#C9A84C' },
                  { icon: '🛹', name: 'La Concorde',   sport: 'Sports Urbains', color: '#E8547A' },
                  { icon: '🐴', name: 'Château de Versailles', sport: 'Équitation', color: '#7B52AB' },
                ].map(({ icon, name, sport, color }) => (
                  <SiteCard key={name} icon={icon} name={name} sport={sport} color={color} />
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              BLOC 3 — Balance Financière
          ════════════════════════════════ */}
          <section id="bloc-finance" aria-label="Balance Financière">
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '2rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #E8547A, #C9A84C)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>💰</div>
                <div>
                  <p style={{ color: '#E8547A', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Bloc 03</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#FAF7F0', margin: 0 }}>La Balance Financière</h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* COJO */}
                <HoverCard accentColor="#C9A84C">
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 0.2rem' }}>COJO</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900, color: '#F0D080', margin: '0 0 0.1rem' }}>4.4 Mds €</p>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(250,247,240,0.45)', margin: 0 }}>Budget opérationnel</p>
                  </div>
                  <ProgressBar label="Privé" percent={96} color="#C9A84C" delay={0} />
                  <ProgressBar label="Public" percent={4}  color="#4FA3E0" delay={200} />
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(250,247,240,0.35)', margin: '0 0 0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Sources</p>
                    {['🎟️ Billetterie', '🤝 Sponsoring', '🏅 CIO'].map(s => (
                      <p key={s} style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.6)', margin: '0 0 0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>{s}</p>
                    ))}
                  </div>
                </HoverCard>

                {/* SOLIDEO */}
                <HoverCard accentColor="#00B4A6">
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00B4A6', margin: '0 0 0.2rem' }}>SOLIDEO</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900, color: '#00B4A6', margin: '0 0 0.1rem' }}>4.5 Mds €</p>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(250,247,240,0.45)', margin: 0 }}>Budget infrastructures</p>
                  </div>
                  <ProgressBar label="Public"  percent={50} color="#4FA3E0" delay={100} />
                  <ProgressBar label="Privé"   percent={50} color="#00B4A6" delay={300} />
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(250,247,240,0.35)', margin: '0 0 0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Sources</p>
                    {['🏛️ État', '🏙️ Collectivités', '📈 Investisseurs'].map(s => (
                      <p key={s} style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.6)', margin: '0 0 0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>{s}</p>
                    ))}
                  </div>
                </HoverCard>
              </div>

              {/* Total */}
              <div style={{
                marginTop: '1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '1rem 1.25rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(250,247,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Budget total combiné</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 900, color: '#FAF7F0' }}>≈ 8.9 Mds €</span>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              BLOC 4 — Héritage Durable
          ════════════════════════════════ */}
          <section id="bloc-heritage" aria-label="Héritage Durable">
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '2rem',
              height: '100%',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7B52AB, #00B4A6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>🌱</div>
                <div>
                  <p style={{ color: '#7B52AB', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Bloc 04</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#FAF7F0', margin: 0 }}>Héritage Durable</h2>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <HeritageCard
                  icon="🏊"
                  iconBg="linear-gradient(135deg, #4FA3E0, #00B4A6)"
                  title="Seine"
                  desc="Fleuve baignable dès 2025"
                  tag="Environnement"
                  tagColor="#00B4A6"
                  stat="1er bain public · Paris en 100 ans"
                />
                <HeritageCard
                  icon="🏘️"
                  iconBg="linear-gradient(135deg, #C9A84C, #E8547A)"
                  title="Logement"
                  desc="Village transformé en quartier de vie"
                  tag="Urbanisme"
                  tagColor="#C9A84C"
                  stat="6 000 logements · Seine-Saint-Denis"
                />
                <HeritageCard
                  icon="🚴"
                  iconBg="linear-gradient(135deg, #7B52AB, #E8547A)"
                  title="Mobilité"
                  desc="400km de pistes cyclables"
                  tag="Transport"
                  tagColor="#7B52AB"
                  stat="Plan vélo Paris 2024 accéléré"
                />
              </div>
            </div>
          </section>

        </div>{/* /grid */}
      </div>
    </main>
  );
}

/* ─── Composants de rendu ─── */

function OrgCard({ title, role, sub, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}18` : `${color}0C`,
        border: `1.5px solid ${hovered ? color + 'AA' : color + '44'}`,
        borderRadius: '12px', padding: '0.85rem 1rem', textAlign: 'center',
        width: '100%',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 8px 24px ${color}30` : 'none',
        cursor: 'default',
      }}
    >
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 900, color, margin: '0 0 0.2rem' }}>{title}</p>
      <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: `${color}CC`, margin: '0 0 0.15rem' }}>{role}</p>
      <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.55)', margin: 0 }}>{sub}</p>
    </div>
  );
}

function SiteCard({ icon, name, sport, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        background: hovered ? `${color}12` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '60' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '12px', padding: '0.9rem 1.1rem',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateX(4px)' : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
        background: `${color}20`,
        border: `1px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 12px ${color}40` : 'none',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FAF7F0', margin: '0 0 0.15rem' }}>{name}</p>
        <p style={{ fontSize: '0.75rem', color, fontWeight: 600, margin: 0, letterSpacing: '0.04em' }}>{sport}</p>
      </div>
      <div style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: color, opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.3s ease',
        boxShadow: hovered ? `0 0 6px ${color}` : 'none',
      }} />
    </div>
  );
}

function HeritageCard({ icon, iconBg, title, desc, tag, tagColor, stat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1.1rem',
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? tagColor + '50' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px', padding: '1.1rem 1.25rem',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 12px 30px rgba(0,0,0,0.3), 0 0 16px ${tagColor}15` : 'none',
        cursor: 'default',
      }}
    >
      {/* Icône */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.3)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        {icon}
      </div>
      {/* Texte */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: '#FAF7F0', margin: 0 }}>{title}</p>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: tagColor, background: `${tagColor}18`, border: `1px solid ${tagColor}40`,
            borderRadius: '50px', padding: '0.15rem 0.5rem',
          }}>{tag}</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'rgba(250,247,240,0.8)', margin: '0 0 0.2rem', fontWeight: 500 }}>{desc}</p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(250,247,240,0.35)', margin: 0, fontStyle: 'italic' }}>{stat}</p>
      </div>
    </div>
  );
}
