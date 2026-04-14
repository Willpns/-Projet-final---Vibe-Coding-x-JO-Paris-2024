import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   Hook : révélation au scroll
───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   Données des innovations
───────────────────────────────────────────── */
const INNOVATIONS = [
  {
    id: 'vsa',
    category: 'securite',
    categoryLabel: 'Sécurité (VSA)',
    icon: '🔍',
    accentColor: '#E8547A',
    bgGradient: 'linear-gradient(135deg, rgba(232,84,122,0.12), rgba(232,84,122,0.04))',
    borderColor: 'rgba(232,84,122,0.25)',
    titre: 'Gouvernance de la VSA — Instituer la "Confiance Vérifiable"',
    action: 'Créer une Autorité de Contrôle Algorithmique Indépendante.',
    mecanisme: 'Instaurer des "Clauses Crépusculaires" (Sunset Clauses) pour justifier les réactivations.',
    objectif: "Garantir l'auditabilité permanente et éviter que l'exception ne devienne la norme.",
    jauges: [
      { label: 'Sécurité',         value: 95, color: '#E8547A' },
      { label: 'Éthique garantie', value: 80, color: '#F0A0B5' },
    ],
  },
  {
    id: 'cloud',
    category: 'cloud',
    categoryLabel: 'Cloud & Médias',
    icon: '☁️',
    accentColor: '#4FA3E0',
    bgGradient: 'linear-gradient(135deg, rgba(79,163,224,0.12), rgba(79,163,224,0.04))',
    borderColor: 'rgba(79,163,224,0.25)',
    titre: 'Industrialiser le modèle "Cloud Broadcasting"',
    action: 'Lancer un plan de formation national "Médias & Cloud".',
    mecanisme: 'Inciter fiscalement à la migration vers un Cloud souverain (SecNumCloud).',
    objectif: 'Créer une filière d\'excellence "Green Production" et réduire l\'empreinte carbone.',
    jauges: [
      { label: 'Économie Carbone', value: 85, color: '#4FA3E0' },
      { label: 'Souveraineté',     value: 90, color: '#7BC8F0' },
    ],
  },
  {
    id: 'urbanisme',
    category: 'urbanisme',
    categoryLabel: 'Urbanisme',
    icon: '🌿',
    accentColor: '#00B4A6',
    bgGradient: 'linear-gradient(135deg, rgba(0,180,166,0.12), rgba(0,180,166,0.04))',
    borderColor: 'rgba(0,180,166,0.25)',
    titre: 'Passer de la "Démonstration" à la "Standardisation Flexible"',
    action: 'Rendre obligatoire l\'étude de faisabilité de la géothermie réversible avec marge de sécurité.',
    mecanisme: 'Hybrider les systèmes (géothermie en base + appoint électrique).',
    objectif: 'Éviter l\'effet "rebond" où les usagers installent des climatiseurs sauvages inefficaces.',
    jauges: [
      { label: 'Résilience Canicule', value: 90, color: '#00B4A6' },
      { label: 'Confort',             value: 85, color: '#4DD6C8' },
    ],
  },
];

const FILTERS = [
  { id: 'all',       label: 'Toutes les innovations', color: '#C9A84C' },
  { id: 'securite',  label: 'Sécurité (VSA)',          color: '#E8547A' },
  { id: 'cloud',     label: 'Cloud & Médias',           color: '#4FA3E0' },
  { id: 'urbanisme', label: 'Urbanisme',                color: '#00B4A6' },
];

/* ─────────────────────────────────────────────
   Jauge circulaire SVG animée
───────────────────────────────────────────── */
function CircularGauge({ value, color, label, size = 90, stroke = 7, animate }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = animate ? (value / 100) * circ : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Piste de fond */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}
          />
          {/* Arc de progression */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            strokeDashoffset={circ - dash}
            style={{
              transition: animate ? 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s' : 'none',
              filter: `drop-shadow(0 0 6px ${color}66)`,
            }}
          />
        </svg>
        {/* Valeur centrale */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Playfair Display',serif",
          fontSize: '1.1rem', fontWeight: 900, color,
        }}>
          {animate ? `${value}%` : '0%'}
        </div>
      </div>
      <span style={{
        fontSize: '0.7rem', fontWeight: 600,
        color: 'rgba(250,247,240,0.5)',
        letterSpacing: '0.04em', textAlign: 'center',
        maxWidth: size,
      }}>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Ligne de détail (Action / Mécanisme / Objectif)
───────────────────────────────────────────── */
function DetailRow({ icon, label, text, color }) {
  return (
    <div style={{
      display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
      marginBottom: '0.75rem',
    }}>
      <div style={{
        flexShrink: 0, width: '28px', height: '28px',
        borderRadius: '8px',
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem',
      }}>{icon}</div>
      <div>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: `${color}AA` }}>
          {label}
        </span>
        <p style={{ fontSize: '0.88rem', color: 'rgba(250,247,240,0.68)', lineHeight: 1.65, margin: '0.15rem 0 0' }}>
          {text}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Carte d'innovation
───────────────────────────────────────────── */
function InnovationCard({ data, index }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const delay = index * 120;
  const { accentColor, bgGradient, borderColor, icon, categoryLabel, titre, action, mecanisme, objectif, jauges } = data;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      <div style={{
        background: hovered ? bgGradient.replace('0.04)', '0.07)') : bgGradient,
        border: `1px solid ${hovered ? accentColor + '50' : borderColor}`,
        borderRadius: '20px',
        padding: '2rem',
        height: '100%',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 20px 50px ${accentColor}18` : '0 4px 16px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Halo décoratif */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '140px', height: '140px', borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }} />

        {/* En-tête de la carte */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{
            flexShrink: 0,
            width: '52px', height: '52px', borderRadius: '14px',
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'none',
          }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-flex', fontSize: '0.65rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: accentColor, background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              borderRadius: '50px', padding: '0.2rem 0.65rem',
              marginBottom: '0.5rem',
            }}>{categoryLabel}</span>
            <h3 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '1.05rem', fontWeight: 800,
              color: '#FAF7F0', margin: 0, lineHeight: 1.3,
            }}>{titre}</h3>
          </div>
        </div>

        {/* Détails */}
        <div>
          <DetailRow icon="⚡" label="Action"    text={action}    color={accentColor} />
          <DetailRow icon="⚙️" label="Mécanisme" text={mecanisme} color={accentColor} />
          <DetailRow icon="🎯" label="Objectif"  text={objectif}  color={accentColor} />
        </div>

        {/* Séparateur */}
        <div style={{ height: '1px', background: `${accentColor}20` }} />

        {/* Jauges */}
        <div>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(250,247,240,0.3)',
            margin: '0 0 1rem',
          }}>Scores d'impact</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {jauges.map(j => (
              <CircularGauge
                key={j.label}
                value={j.value}
                color={j.color}
                label={j.label}
                animate={visible}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bannière de conclusion
───────────────────────────────────────────── */
function ConclusionBanner() {
  const [ref, visible] = useReveal(0.15);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(30px)',
      transition: 'all 0.9s ease 0.1s',
      marginTop: '5rem',
    }}>
      <div style={{
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(123,82,171,0.1) 50%, rgba(79,163,224,0.08) 100%)',
        border: '1px solid rgba(201,168,76,0.25)',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Fond décoratif */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Pastilles déco */}
        {['#C9A84C','#7B52AB','#4FA3E0'].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '200px', height: '200px', borderRadius: '50%',
            background: `radial-gradient(circle, ${c}0A 0%, transparent 70%)`,
            top: i === 0 ? '-60px' : 'auto',
            bottom: i === 2 ? '-60px' : 'auto',
            left: i === 0 ? '-60px' : i === 2 ? 'auto' : '50%',
            right: i === 2 ? '-60px' : 'auto',
            transform: i === 1 ? 'translateX(-50%)' : 'none',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Contenu */}
        <div style={{ position: 'relative' }}>
          {/* Médaille déco */}
          <div style={{
            display: 'inline-flex', marginBottom: '1.5rem',
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 0 30px rgba(201,168,76,0.35)',
          }}>🏅</div>

          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)',
            margin: '0 0 1.25rem',
          }}>Conclusion du Rapport Stratégique</p>

          <blockquote style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)',
            fontWeight: 600, fontStyle: 'italic',
            color: '#FAF7F0', lineHeight: 1.75,
            margin: '0 auto',
            maxWidth: '850px',
          }}>
            <span style={{
              fontSize: '3rem', lineHeight: 0.5, verticalAlign: '-0.5rem',
              color: '#C9A84C', opacity: 0.4,
              fontFamily: "'Playfair Display',serif",
              marginRight: '0.15rem',
            }}>"</span>
            La véritable médaille d'or ne réside pas dans la performance de la technologie durant les 15 jours d'épreuves, mais dans la maturité de la régulation et l'industrialisation des savoir-faire qui en découleront pour les 15 prochaines années.
            <span style={{
              fontSize: '3rem', lineHeight: 0.5, verticalAlign: '-0.5rem',
              color: '#C9A84C', opacity: 0.4,
              fontFamily: "'Playfair Display',serif",
              marginLeft: '0.15rem',
            }}>"</span>
          </blockquote>

          {/* Ligne déco sous la citation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#C9A84C','#7B52AB','#4FA3E0','#00B4A6','#E8547A'].map((c, i) => (
                <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(250,247,240,0.35)', margin: '1rem 0 0', letterSpacing: '0.04em' }}>
            Rapport Innovations Technologiques · Paris 2024 · Vibe Coding × Ynov
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */
export default function Innovations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [prevFilter,   setPrevFilter]   = useState('all');
  const [transitioning, setTransitioning] = useState(false);

  const handleFilter = (id) => {
    if (id === activeFilter) return;
    setTransitioning(true);
    setTimeout(() => {
      setPrevFilter(activeFilter);
      setActiveFilter(id);
      setTransitioning(false);
    }, 250);
  };

  const visible = INNOVATIONS.filter(
    d => activeFilter === 'all' || d.category === activeFilter
  );

  return (
    <main
      id="page-innovations"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(180deg, #0B1D3A 0%, #0d1e3c 60%, #0a1830 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── En-tête ── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(79,163,224,0.1)', border: '1px solid rgba(79,163,224,0.3)',
            borderRadius: '50px', padding: '0.4rem 1.2rem', marginBottom: '1.5rem',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#4FA3E0',
          }}>
            Section 04 · Rapport des Innovations Technologiques
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900, color: '#FAF7F0',
            margin: '0 0 1rem', lineHeight: 1.1,
          }}>
            Recommandations{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4FA3E0, #7BC8F0)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Stratégiques</span>
          </h1>
          <p style={{
            fontSize: '1rem', color: 'rgba(250,247,240,0.45)',
            maxWidth: '560px', margin: '0 auto 0',
            lineHeight: 1.7,
          }}>
            De l'innovation olympique à l'héritage technologique — trois axes pour industrialiser les savoir-faire de Paris 2024.
          </p>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(135deg, #4FA3E0, #7BC8F0)', borderRadius: '2px', margin: '1.25rem auto 0' }} />
        </div>

        {/* ── Filtres Pilules ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
          justifyContent: 'center', marginBottom: '3rem',
        }}>
          {FILTERS.map(f => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                id={`filter-innovation-${f.id}`}
                onClick={() => handleFilter(f.id)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '50px',
                  border: `1.5px solid ${isActive ? f.color : 'rgba(255,255,255,0.1)'}`,
                  background: isActive
                    ? `linear-gradient(135deg, ${f.color}25, ${f.color}12)`
                    : 'rgba(255,255,255,0.03)',
                  color: isActive ? f.color : 'rgba(250,247,240,0.5)',
                  fontSize: '0.8rem', fontWeight: 700,
                  fontFamily: "'Inter',sans-serif",
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? `0 4px 20px ${f.color}25` : 'none',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#FAF7F0'; } }}
                onMouseOut={e  => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(250,247,240,0.5)'; } }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* ── Compteur de résultats ── */}
        <div style={{
          textAlign: 'center', marginBottom: '2rem',
          fontSize: '0.78rem', color: 'rgba(250,247,240,0.3)',
          letterSpacing: '0.06em',
        }}>
          {visible.length === INNOVATIONS.length
            ? `${visible.length} innovations affichées`
            : `${visible.length} innovation${visible.length > 1 ? 's' : ''} filtrée${visible.length > 1 ? 's' : ''}`}
        </div>

        {/* ── Grille de cartes ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}>
          {visible.map((d, i) => (
            <InnovationCard key={d.id} data={d} index={i} />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {visible.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '4rem 0',
            color: 'rgba(250,247,240,0.3)', fontSize: '1rem',
          }}>
            Aucune innovation pour cette catégorie.
          </div>
        )}

        {/* ── Résumé global (uniquement en vue "Toutes") ── */}
        {activeFilter === 'all' && (
          <div style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { label: 'Axes stratégiques', val: '3',    color: '#C9A84C', icon: '📐' },
              { label: 'Score moyen d\'impact', val: '87.5%', color: '#00B4A6', icon: '📊' },
              { label: 'Recommandations',   val: '9',    color: '#4FA3E0', icon: '📋' },
            ].map(({ label, val, color, icon }) => (
              <div key={label} style={{
                background: `${color}0A`,
                border: `1px solid ${color}20`,
                borderRadius: '14px', padding: '1.25rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
                <p style={{
                  fontFamily: "'Playfair Display',serif", fontSize: '1.75rem',
                  fontWeight: 900, color, margin: '0 0 0.25rem',
                }}>{val}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(250,247,240,0.4)', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Bannière de conclusion ── */}
        <ConclusionBanner />

      </div>
    </main>
  );
}
