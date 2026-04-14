import { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

/* ─────────────────────────────────────────────
   Données exactes (aucune invention)
───────────────────────────────────────────── */
const RAW_DATA = [
  {
    id: '400m4N',
    label: '400m 4 Nages',
    shortLabel: '400m 4N',
    serie:    '4:08.30',
    finale:   '4:02.95',
    serieS:   248.30,   // en secondes (pour le graphique)
    finaleS:  242.95,
    gain:     -5.35,
    statut:   'Record Olympique',
    color:    '#C9A84C',
  },
  {
    id: '200mPap',
    label: '200m Papillon',
    shortLabel: '200m Pap.',
    serie:    '1:55.26',
    finale:   '1:51.21',
    serieS:   115.26,
    finaleS:  111.21,
    gain:     -4.05,
    statut:   'Record Olympique',
    color:    '#4FA3E0',
  },
  {
    id: '200mBra',
    label: '200m Brasse',
    shortLabel: '200m Bra.',
    serie:    '2:09.55',
    finale:   '2:05.85',
    serieS:   129.55,
    finaleS:  125.85,
    gain:     -3.70,
    statut:   'Record Olympique',
    color:    '#E8547A',
  },
  {
    id: '200m4N',
    label: '200m 4 Nages',
    shortLabel: '200m 4N',
    serie:    '1:57.86',
    finale:   '1:54.06',
    serieS:   117.86,
    finaleS:  114.06,
    gain:     -3.80,
    statut:   'Record Olympique',
    color:    '#7B52AB',
  },
];

const FILTERS = [
  { id: 'all', label: 'Tout voir' },
  ...RAW_DATA.map(d => ({ id: d.id, label: d.label })),
];

/* ─────────────────────────────────────────────
   Formatage des secondes → mm:ss.hh
───────────────────────────────────────────── */
function fmtSec(s) {
  const m = Math.floor(s / 60);
  const rem = (s % 60).toFixed(2).padStart(5, '0');
  return `${m}:${rem}`;
}

/* ─────────────────────────────────────────────
   Tooltip personnalisé Recharts
───────────────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const row = RAW_DATA.find(d => d.shortLabel === label || d.label === label);
  return (
    <div style={{
      background: 'rgba(11,29,58,0.97)',
      border: '1px solid rgba(201,168,76,0.4)',
      borderRadius: '12px',
      padding: '1rem 1.25rem',
      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
      minWidth: '200px',
    }}>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', fontWeight: 700, color: '#FAF7F0', margin: '0 0 0.75rem' }}>{row?.label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.55)' }}>{p.name}</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: p.fill }}>{fmtSec(p.value)}</span>
        </div>
      ))}
      {row && (
        <div style={{
          marginTop: '0.75rem', paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(250,247,240,0.45)' }}>Amélioration</span>
          <span style={{
            fontSize: '0.82rem', fontWeight: 800, color: '#00B4A6',
            background: 'rgba(0,180,166,0.12)', borderRadius: '50px',
            padding: '0.15rem 0.6rem',
          }}>{row.gain} s</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Axe Y personnalisé : affiche mm:ss
───────────────────────────────────────────── */
function CustomYAxisTick({ x, y, payload }) {
  return (
    <text x={x} y={y} dy={4} textAnchor="end"
      style={{ fontSize: '0.7rem', fill: 'rgba(250,247,240,0.4)', fontFamily: 'Inter,sans-serif' }}>
      {fmtSec(payload.value)}
    </text>
  );
}

/* ─────────────────────────────────────────────
   Légende personnalisée — couleurs correctes
───────────────────────────────────────────── */
function CustomLegend({ chartData }) {
  // Couleur représentative : première entrée visible, ou doré par défaut
  const refColor = chartData?.[0]?.color ?? '#C9A84C';
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: '1.5rem',
      paddingTop: '1rem', fontFamily: 'Inter,sans-serif',
    }}>
      {/* Temps Série : carré semi-transparent + contour */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <div style={{
          width: '12px', height: '12px', borderRadius: '3px',
          background: `${refColor}55`,
          border: `1.5px solid ${refColor}`,
        }} />
        <span style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.55)' }}>Temps Série</span>
      </div>
      {/* Temps Finale : carré plein */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <div style={{
          width: '12px', height: '12px', borderRadius: '3px',
          background: refColor,
        }} />
        <span style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.55)' }}>Temps Finale</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Carte KPI
───────────────────────────────────────────── */
function KpiCard({ icon, value, label, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${color}30`,
      borderRadius: '16px', padding: '1.25rem 1.5rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
      flex: '1 1 180px',
    }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{icon}</div>
      <p style={{
        fontFamily: "'Playfair Display',serif", fontSize: '1.9rem', fontWeight: 900,
        color, margin: '0 0 0.2rem', lineHeight: 1,
      }}>{value}</p>
      <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.5)', margin: 0, letterSpacing: '0.02em' }}>{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */
export default function Athlete() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animated,    setAnimated]      = useState(false);

  // Trigger animation une fois monté
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 200); return () => clearTimeout(t); }, []);

  // Données filtrées pour le graphique
  const chartData = (activeFilter === 'all' ? RAW_DATA : RAW_DATA.filter(d => d.id === activeFilter))
    .map(d => ({
      name:     d.shortLabel,
      'Temps Série':   d.serieS,
      'Temps Finale':  d.finaleS,
      color:    d.color,
    }));

  // Domaine de l'axe Y : min - 5s / max + 2s pour lisibilité
  const allVals = chartData.flatMap(d => [d['Temps Série'], d['Temps Finale']]);
  const yMin = allVals.length ? Math.floor(Math.min(...allVals) - 5) : 100;
  const yMax = allVals.length ? Math.ceil (Math.max(...allVals) + 2) : 260;

  return (
    <main
      id="page-athlete"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(180deg, #0B1D3A 0%, #0e1e3a 60%, #091525 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── En-tête ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '50px', padding: '0.4rem 1.2rem', marginBottom: '1.5rem',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C9A84C',
          }}>
            Section 02 · Dashboard Athlète
          </div>

          {/* Nom + photo stylisée */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            {/* Avatar initiales */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 900,
              color: '#0B1D3A', flexShrink: 0,
              boxShadow: '0 0 30px rgba(201,168,76,0.4)',
            }}>LM</div>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900, color: '#FAF7F0', margin: 0, lineHeight: 1.05,
              }}>
                Léon{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Marchand</span>
              </h1>
              <p style={{ color: 'rgba(250,247,240,0.45)', fontSize: '0.85rem', margin: '0.3rem 0 0', letterSpacing: '0.05em' }}>
                France 🇫🇷 · Natation · JO Paris 2024
              </p>
            </div>
          </div>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(135deg, #C9A84C, #F0D080)', borderRadius: '2px', margin: '1rem auto 0' }} />
        </div>

        {/* ── KPI Cards ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <KpiCard icon="🥇" value="4"       label="Médailles d'Or"          color="#C9A84C" delay={0} />
          <KpiCard icon="🏅" value="4"       label="Records Olympiques"       color="#F0D080" delay={100} />
          <KpiCard icon="⏱️" value="−17.00 s" label="Gain de temps total"    color="#00B4A6" delay={200} />
          <KpiCard icon="🏊" value="4"       label="Épreuves disputées"       color="#4FA3E0" delay={300} />
        </div>

        {/* ── Zone graphique ── */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', padding: '2rem',
          marginBottom: '1.75rem',
        }}>
          {/* Titre + Filtres */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center',
            gap: '1rem', marginBottom: '1.75rem',
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display',serif", fontSize: '1.3rem',
                fontWeight: 700, color: '#FAF7F0', margin: '0 0 0.25rem',
              }}>Temps Série vs Temps Finale</h2>
              <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,240,0.4)', margin: 0 }}>
                Comparaison des performances — JO Paris 2024
              </p>
            </div>
            {/* Filtres */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {FILTERS.map(f => {
                const isActive = activeFilter === f.id;
                const epreuve  = RAW_DATA.find(d => d.id === f.id);
                const col = epreuve?.color ?? '#C9A84C';
                return (
                  <button
                    key={f.id}
                    id={`filter-${f.id}`}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '50px',
                      border: `1px solid ${isActive ? col : 'rgba(255,255,255,0.1)'}`,
                      background: isActive ? `${col}22` : 'transparent',
                      color: isActive ? col : 'rgba(250,247,240,0.5)',
                      fontSize: '0.75rem', fontWeight: 600,
                      fontFamily: "'Inter',sans-serif",
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#FAF7F0'; }}}
                    onMouseOut={e  => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(250,247,240,0.5)'; }}}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recharts BarChart */}
          <div style={{ height: '340px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                barCategoryGap="30%"
                barGap={6}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'rgba(250,247,240,0.5)', fontSize: 12, fontFamily: 'Inter,sans-serif' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[yMin, yMax]}
                  tick={<CustomYAxisTick />}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="__legend__" legendType="none" fill="transparent" />
                {/* Barres Série */}
                <Bar
                  dataKey="Temps Série"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={animated}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={`${entry.color}55`} stroke={entry.color} strokeWidth={1} />
                  ))}
                </Bar>
                {/* Barres Finale */}
                <Bar
                  dataKey="Temps Finale"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={animated}
                  animationDuration={900}
                  animationBegin={150}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Légende couleurs correctes */}
          <CustomLegend chartData={chartData} />

          {/* Légende gain */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
            marginTop: '1.25rem', justifyContent: 'center',
          }}>
            {(activeFilter === 'all' ? RAW_DATA : RAW_DATA.filter(d => d.id === activeFilter)).map(d => (
              <div key={d.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: `${d.color}10`,
                border: `1px solid ${d.color}30`,
                borderRadius: '50px', padding: '0.3rem 0.85rem',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(250,247,240,0.65)', fontWeight: 500 }}>{d.label}</span>
                <span style={{ fontSize: '0.72rem', color: '#00B4A6', fontWeight: 700 }}>{d.gain} s</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tableau détaillé ── */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', padding: '2rem',
          overflowX: 'auto',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontSize: '1.3rem',
            fontWeight: 700, color: '#FAF7F0', margin: '0 0 1.5rem',
          }}>
            Données détaillées — Résultats complets
          </h2>

          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: '600px' }}>
            <thead>
              <tr>
                {['Épreuve', 'Temps Série', 'Temps Finale', 'Amélioration', 'Statut'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '0 1rem 0.75rem',
                    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(250,247,240,0.3)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RAW_DATA.map((row, idx) => (
                <TableRow key={row.id} row={row} idx={idx} />
              ))}
            </tbody>
          </table>

          {/* Total gain */}
          <div style={{
            marginTop: '1.5rem',
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem',
            paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(250,247,240,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Gain total
            </span>
            <span style={{
              fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 900, color: '#00B4A6',
            }}>
              −17.00 s
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   Ligne de tableau interactive
───────────────────────────────────────────── */
function TableRow({ row, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${row.color}0D` : idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
        transition: 'background 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* Épreuve */}
      <td style={{ padding: '0.9rem 1rem', borderRadius: '10px 0 0 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
            background: row.color,
            boxShadow: hovered ? `0 0 8px ${row.color}` : 'none',
            transition: 'box-shadow 0.2s ease',
          }} />
          <span style={{ fontWeight: 600, color: '#FAF7F0', fontSize: '0.9rem' }}>{row.label}</span>
        </div>
      </td>
      {/* Temps Série */}
      <td style={{ padding: '0.9rem 1rem' }}>
        <code style={{
          fontSize: '0.88rem', fontFamily: "'Inter',monospace",
          color: 'rgba(250,247,240,0.55)',
          background: 'rgba(255,255,255,0.04)',
          padding: '0.2rem 0.5rem', borderRadius: '6px',
        }}>{row.serie}</code>
      </td>
      {/* Temps Finale */}
      <td style={{ padding: '0.9rem 1rem' }}>
        <code style={{
          fontSize: '0.88rem', fontFamily: "'Inter',monospace",
          color: row.color, fontWeight: 700,
          background: `${row.color}12`,
          padding: '0.2rem 0.5rem', borderRadius: '6px',
        }}>{row.finale}</code>
      </td>
      {/* Amélioration */}
      <td style={{ padding: '0.9rem 1rem' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          background: 'rgba(0,180,166,0.12)', border: '1px solid rgba(0,180,166,0.25)',
          borderRadius: '50px', padding: '0.2rem 0.7rem',
          fontSize: '0.82rem', fontWeight: 800, color: '#00B4A6',
        }}>
          <span style={{ fontSize: '0.7rem' }}>▼</span>
          {Math.abs(row.gain).toFixed(2)} s
        </span>
      </td>
      {/* Statut */}
      <td style={{ padding: '0.9rem 1rem', borderRadius: '0 10px 10px 0' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(240,208,128,0.1))',
          border: '1px solid rgba(201,168,76,0.45)',
          borderRadius: '50px', padding: '0.25rem 0.85rem',
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
          color: '#F0D080',
        }}>
          <span>🏅</span>
          {row.statut}
        </span>
      </td>
    </tr>
  );
}
