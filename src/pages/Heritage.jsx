import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Hook : animation d'entrée au scroll
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
   Hook : progression de scroll (0-1)
───────────────────────────────────────────── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return progress;
}

/* ─────────────────────────────────────────────
   Composant : bloc animé générique
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', threshold = 0.15 }) {
  const [ref, visible] = useReveal(threshold);
  const translateMap = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', none: 'none' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : translateMap[direction],
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Composant : blockquote citation mise en avant
───────────────────────────────────────────── */
function Blockquote({ text, color = '#C9A84C', delay = 0 }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.97)',
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      margin: '2.5rem 0',
    }}>
      <blockquote style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${color}10, ${color}05)`,
        border: `1px solid ${color}35`,
        borderLeft: `4px solid ${color}`,
        borderRadius: '0 16px 16px 0',
        padding: '1.5rem 1.75rem 1.5rem 2rem',
        margin: 0,
      }}>
        {/* Guillemet décoratif */}
        <span style={{
          position: 'absolute', top: '-0.5rem', left: '1.5rem',
          fontSize: '4rem', lineHeight: 1, color,
          fontFamily: "'Playfair Display',serif", opacity: 0.35,
        }}>"</span>
        <p style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: 600, fontStyle: 'italic',
          color: '#FAF7F0', lineHeight: 1.65, margin: 0,
        }}>{text}</p>
      </blockquote>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Composant : image réelle avec révélation au scroll
───────────────────────────────────────────── */
function ImageReveal({ src, alt, caption, color = '#C9A84C', delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      <figure className="heritage-fig" style={{
        boxShadow: `0 0 0 1px ${color}20`,
      }}>
        <img
          src={src}
          alt={alt}
          className="heritage-img"
          loading="lazy"
          decoding="async"
        />
        {caption && (
          <figcaption>{caption}</figcaption>
        )}
      </figure>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Composant : numéro de partie + titre
───────────────────────────────────────────── */
function PartTitle({ num, title, color, delay = 0 }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `all 0.7s ease ${delay}ms`,
      marginBottom: '2rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <span style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: '4rem', fontWeight: 900,
          color, opacity: 0.18, lineHeight: 1,
          flexShrink: 0,
        }}>{String(num).padStart(2, '0')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 800, color: '#FAF7F0', margin: 0, lineHeight: 1.2,
        }}>{title}</h2>
      </div>
      <div style={{ width: '48px', height: '3px', background: color, borderRadius: '2px', marginTop: '0.75rem' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Composant : corps de texte narratif
───────────────────────────────────────────── */
function NarrativeText({ children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
        lineHeight: 1.9, color: 'rgba(250,247,240,0.72)',
        margin: 0,
      }}>{children}</p>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   Séparateur de section
───────────────────────────────────────────── */
function SectionDivider({ color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem', margin: '4rem 0',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 12px ${color}` }} />
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Badge "Mise en garde / Alerte"
───────────────────────────────────────────── */
function AlertBadge({ icon, text, color }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateX(-20px)',
      transition: 'all 0.7s ease 200ms',
      display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
      background: `${color}0D`,
      border: `1px solid ${color}25`,
      borderRadius: '12px', padding: '1rem 1.25rem',
      marginBottom: '0.75rem',
    }}>
      <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: '0.92rem', color: 'rgba(250,247,240,0.68)',
        lineHeight: 1.7, margin: 0,
      }}>{text}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page principale
───────────────────────────────────────────── */
export default function Heritage() {
  const progress = useScrollProgress();

  return (
    <main
      id="page-heritage"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0B1D3A 0%, #0c1c37 50%, #0a1830 100%)',
        position: 'relative',
      }}
    >
      {/* ── Barre de progression lecture ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        height: '3px', width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, #C9A84C, #E8547A, #7B52AB)',
        zIndex: 999, transition: 'width 0.1s linear',
        boxShadow: '0 0 10px rgba(201,168,76,0.5)',
      }} />

      {/* ── Indicateur de scroll latéral ── */}
      <div style={{
        position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        zIndex: 100,
      }}>
        {['#C9A84C','#4FA3E0','#00B4A6','#E8547A','#7B52AB'].map((c, i) => (
          <div key={i} style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: progress >= i / 5 && progress < (i + 1) / 5 ? c : 'rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
            boxShadow: progress >= i / 5 && progress < (i + 1) / 5 ? `0 0 8px ${c}` : 'none',
          }} />
        ))}
      </div>

      {/* ══════════════════════════════════════
          HERO — En-tête cinématique
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '8rem 1.5rem 4rem',
        textAlign: 'center', position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Fond ambiant */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(123,82,171,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Reveal delay={0}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(123,82,171,0.12)', border: '1px solid rgba(123,82,171,0.3)',
            borderRadius: '50px', padding: '0.4rem 1.2rem', marginBottom: '2rem',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#7B52AB',
          }}>
            Section 03 · Récit Immersif — Héritage Olympique
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 900, color: '#FAF7F0',
            lineHeight: 1.1, margin: '0 0 1.25rem',
            maxWidth: '900px',
          }}>
            Ma Seine-Saint-Denis après 2024 :{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Bilan d'un héritage</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontStyle: 'italic', color: 'rgba(250,247,240,0.5)',
            margin: '0 0 3rem',
          }}>
            Une lettre ouverte de <strong style={{ color: 'rgba(250,247,240,0.75)', fontStyle: 'normal' }}>Karim B.</strong>, habitant de Saint-Denis
          </p>
        </Reveal>

        {/* Indicateur de scroll vers le bas */}
        <Reveal delay={600}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(250,247,240,0.3)', fontSize: '0.72rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <span>Faites défiler pour lire</span>
            <div style={{
              width: '24px', height: '40px',
              border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: '12px', position: 'relative',
            }}>
              <div style={{
                width: '4px', height: '8px',
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '2px',
                position: 'absolute', top: '6px', left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scrollDot 1.6s ease-in-out infinite',
              }} />
            </div>
          </div>
        </Reveal>

        <style>{`
          @keyframes scrollDot {
            0%   { transform: translateX(-50%) translateY(0); opacity: 1; }
            100% { transform: translateX(-50%) translateY(16px); opacity: 0; }
          }
        `}</style>
      </section>

      {/* ── Contenu narratif ── */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ══════════════════════════════════════
            PARTIE 1 — Introduction
        ══════════════════════════════════════ */}
        <section id="part-01" style={{ paddingBottom: '7rem' }}>
          <PartTitle num={1} title="Introduction" color="#C9A84C" />

          <ImageReveal
            src="/img/Photo_aerienne_StDenis_2004-2024.png"
            alt="Vue aérienne comparée de Saint-Denis en 2004 et en 2024, montrant la métamorphose urbaine du territoire"
            caption="Vue aérienne par drone — Saint-Denis, 2004 vs 2024"
            color="#C9A84C"
            delay={100}
          />

          <Reveal delay={200}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '8px', padding: '0.5rem 1rem', marginBottom: '1.5rem',
            }}>
              <span style={{ fontSize: '1rem' }}>⏳</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#C9A84C', letterSpacing: '0.06em' }}>
                VINGT ANS DE MÉTAMORPHOSE
              </span>
            </div>
          </Reveal>

          <NarrativeText delay={0}>
            Je vis à Saint-Denis depuis 2004, assez longtemps pour voir la ville changer de peau. J'ai connu l'époque où Pleyel n'était qu'une zone logistique grise se vidant à 18h, coupée du fleuve. Face aux premières promesses, comme beaucoup, j'ai haussé les épaules, pensant que ce n'était que de la communication sans lendemain.
          </NarrativeText>

          <Blockquote
            text="Aujourd'hui, alors que la ferveur de l'été 2024 est retombée, je dois admettre une vérité complexe : le « 93 » a changé d'ère."
            color="#C9A84C"
            delay={100}
          />

          <NarrativeText delay={200}>
            Ce bilan, je le dresse honnêtement, avec la fierté d'un habitant mais la vigilance d'un citoyen conscient des enjeux.
          </NarrativeText>
        </section>

        <SectionDivider color="#4FA3E0" />

        {/* ══════════════════════════════════════
            PARTIE 2 — Transformation physique
        ══════════════════════════════════════ */}
        <section id="part-02" style={{ paddingBottom: '7rem' }}>
          <PartTitle num={2} title="La transformation physique" color="#4FA3E0" />

          <Reveal delay={0}>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 700, color: '#4FA3E0',
              margin: '0 0 1.5rem', lineHeight: 1.3,
            }}>
              Un nouveau centre de gravité
            </p>
          </Reveal>

          <NarrativeText delay={0}>
            Le changement le plus brutal est géographique : nous ne sommes plus la périphérie, mais un nouveau centre. L'arrivée de la ligne 14 à Saint-Denis Pleyel a été un choc tectonique.
          </NarrativeText>

          <ImageReveal
            src="/img/Carte_interractive_StDenis_Pleyel-Châtelet.png"
            alt="Carte du nouveau tracé de la ligne 14 du métro reliant Saint-Denis Pleyel à Châtelet en moins de 15 minutes"
            caption="Grand Paris Express — Ligne 14 · Saint-Denis Pleyel ↔ Châtelet : 14 min"
            color="#4FA3E0"
            delay={100}
          />

          <Blockquote
            text="Rejoindre Châtelet en moins de 15 minutes est devenu ma routine, un gain de temps de vie inespéré."
            color="#4FA3E0"
            delay={0}
          />

          <NarrativeText delay={100}>
            Avec l'interconnexion du Grand Paris Express, cette "Gare XXL" nous place désormais au cœur du réacteur métropolitain. Le paysage urbain a aussi muté. Je marche dans l'ancien Village des Athlètes comme dans un quartier établi.
          </NarrativeText>

          <ImageReveal
            src="/img/Pleyel_2020-2024_Zone_industrielle_Eco-quartier_végé.png"
            alt="Comparaison avant/après du quartier Pleyel : zone industrielle abandonnée en 2020 transformée en éco-quartier végétalisé en 2024"
            caption="Avant / Après — Pleyel 2020 vs 2024 · Zone industrielle → Éco-quartier végétalisé"
            color="#00B4A6"
            delay={200}
          />

          <Blockquote
            text="Voir des familles s'installer là où il y avait des friches est une victoire de l'urbanisme sur le bétonnage."
            color="#4FA3E0"
            delay={0}
          />

          <NarrativeText delay={200}>
            Loin de la "ville fantôme" redoutée, la transformation en éco-quartier végétalisé a réussi à recoudre la ville avec la Seine.
          </NarrativeText>
        </section>

        <SectionDivider color="#00B4A6" />

        {/* ══════════════════════════════════════
            PARTIE 3 — Impact social
        ══════════════════════════════════════ */}
        <section id="part-03" style={{ paddingBottom: '7rem' }}>
          <PartTitle num={3} title="L'impact social" color="#00B4A6" />

          <Reveal delay={0}>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 700, color: '#00B4A6',
              margin: '0 0 1.5rem', lineHeight: 1.3,
            }}>
              Réparer les injustices
            </p>
          </Reveal>

          <NarrativeText delay={0}>
            Mais l'héritage le plus précieux est celui de la dignité. Le symbole en est le Centre Aquatique Olympique (CAO). Au-delà de sa magnifique charpente, sa beauté réside dans sa fonction : briser la fatalité du "ne pas savoir nager" qui touchait la moitié de nos collégiens.
          </NarrativeText>

          {/* Stat impact */}
          <Reveal delay={100}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
              margin: '2rem 0',
            }}>
              {[
                { val: '50%', label: 'des collégiens ne savaient pas nager avant 2024', color: '#E8547A' },
                { val: 'Plan\nSavoir\nNager', label: 'programme ciblant tous les établissements du 93', color: '#00B4A6' },
              ].map(({ val, label, color }) => (
                <Reveal key={val} delay={0}>
                  <div style={{
                    background: `${color}10`,
                    border: `1px solid ${color}25`,
                    borderRadius: '14px', padding: '1.25rem',
                    textAlign: 'center',
                  }}>
                    <p style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: '1.8rem', fontWeight: 900, color,
                      margin: '0 0 0.35rem', lineHeight: 1.1, whiteSpace: 'pre-line',
                    }}>{val}</p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.5)', margin: 0, lineHeight: 1.5 }}>{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <NarrativeText delay={200}>
            Grâce au plan "Savoir Nager", je vois les élèves traverser la nouvelle passerelle au-dessus de l'A1 pour rejoindre les bassins.
          </NarrativeText>

          <Blockquote
            text="Ce franchissement est symbolique : on a relié les quartiers et les gens."
            color="#00B4A6"
            delay={100}
          />

          <NarrativeText delay={300}>
            S'ajoute à cela la fierté d'avoir accueilli le monde sans incident, redressant bien des têtes ici.
          </NarrativeText>

          <ImageReveal
            src="/img/Centre_Aquatique_Olympique.png"
            alt="Centre Aquatique Olympique de Saint-Denis, avec sa charpente en bois lamellé-collé et ses bassins olympiques"
            caption="Centre Aquatique Olympique — Saint-Denis · Charpente bois lamellé-collé · 5 000 places"
            color="#00B4A6"
            delay={200}
          />
        </section>

        <SectionDivider color="#E8547A" />

        {/* ══════════════════════════════════════
            PARTIE 4 — La vigilance
        ══════════════════════════════════════ */}
        <section id="part-04" style={{ paddingBottom: '7rem' }}>
          <PartTitle num={4} title="La vigilance" color="#E8547A" />

          <Reveal delay={0}>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 700, color: '#E8547A',
              margin: '0 0 1.5rem', lineHeight: 1.3,
            }}>
              Le revers de la médaille
            </p>
          </Reveal>

          <NarrativeText delay={0}>
            Cependant, l'euphorie ne doit pas nous aveugler. Voici les points de vigilance que je formule en tant que citoyen.
          </NarrativeText>

          <div style={{ margin: '2rem 0' }}>
            <AlertBadge
              icon="🚧"
              text="N'oublions pas les années de nuisances : cinq ans de poussière et de bruit que nous avons endurés, parfois la rage au ventre."
              color="#C9A84C"
            />
            <AlertBadge
              icon="📈"
              text="L'inquiétude de la gentrification monte. Avec Pleyel à 15 minutes du Louvre, les loyers flambent, menaçant de transformer notre quartier mixte en enclave pour cadres et de repousser les habitants historiques."
              color="#E8547A"
            />
            <AlertBadge
              icon="💸"
              text="Je m'interroge sur la pérennité des équipements. Le CAO est un bijou coûteux à entretenir ; nous serons intransigeants pour que nos impôts ne servent pas à combler un gouffre financier futur."
              color="#7B52AB"
            />
          </div>

          <ImageReveal
            src="/img/graphique_loyer_StDenis_Pleyel.png"
            alt="Graphique montrant l'évolution des loyers à Saint-Denis Pleyel de 2019 à 2025, comparée à la moyenne nationale"
            caption="Évolution des loyers — Saint-Denis Pleyel 2019→2025 vs Moyenne nationale nationale (source : OLAP)"
            color="#E8547A"
            delay={300}
          />
        </section>

        <SectionDivider color="#7B52AB" />

        {/* ══════════════════════════════════════
            PARTIE 5 — Conclusion
        ══════════════════════════════════════ */}
        <section id="part-05" style={{ paddingBottom: '10rem' }}>
          <PartTitle num={5} title="Conclusion" color="#7B52AB" />

          <Reveal delay={0}>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 700, color: '#7B52AB',
              margin: '0 0 1.5rem', lineHeight: 1.3,
            }}>
              Un héritage sous condition
            </p>
          </Reveal>

          <NarrativeText delay={0}>
            Alors, est-ce que ça valait le coup ? Oui, car Saint-Denis avait besoin de ce coup d'accélérateur pour obtenir métros et équipements. Mais cet héritage n'est pas un cadeau, c'est un outil qu'il ne faut pas laisser nous échapper.
          </NarrativeText>

          <Blockquote
            text="C'est maintenant que le vrai travail citoyen commence : s'assurer que la modernisation ne rime pas avec exclusion."
            color="#7B52AB"
            delay={100}
          />

          {/* Signature */}
          <Reveal delay={300}>
            <div style={{
              marginTop: '3rem',
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              padding: '1.5rem 2rem',
              background: 'rgba(123,82,171,0.08)',
              border: '1px solid rgba(123,82,171,0.2)',
              borderRadius: '16px',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #7B52AB, #E8547A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Playfair Display',serif", fontSize: '1.2rem',
                fontWeight: 900, color: '#FAF7F0',
              }}>KB</div>
              <div>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontWeight: 700, color: '#FAF7F0', margin: '0 0 0.15rem' }}>
                  Karim B.
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.45)', margin: 0 }}>
                  Habitant de Saint-Denis depuis 2004 · Seine-Saint-Denis, France 🇫🇷
                </p>
              </div>
            </div>
          </Reveal>

          {/* Liens vers autres sections */}
          <Reveal delay={400}>
            <div style={{
              marginTop: '4rem', textAlign: 'center',
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
            }}>
              <p style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: '1rem', color: 'rgba(250,247,240,0.5)',
                margin: '0 0 0.25rem', fontStyle: 'italic',
              }}>
                Récit rédigé dans le cadre du projet
              </p>
              <p style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: '1.3rem', fontWeight: 700, color: '#FAF7F0', margin: 0,
              }}>
                Vibe Coding × JO Paris 2024
              </p>
            </div>
          </Reveal>
        </section>

      </div>
    </main>
  );
}
