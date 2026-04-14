import { useNavigate, useLocation } from 'react-router-dom'

const CSS = `
@keyframes tabSlide {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes indicatorGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes logoPulse {
  0%,100% { filter: drop-shadow(0 0 0px rgba(249,115,22,0)); }
  50%     { filter: drop-shadow(0 0 8px rgba(249,115,22,0.6)); }
}
@keyframes shimmerNav {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.topnav-logo {
  animation: logoPulse 3s ease-in-out infinite;
}
.topnav-tab-active .tab-indicator {
  animation: indicatorGrow .25s cubic-bezier(.34,1.56,.64,1) both;
  transform-origin: center;
}
.topnav-tab:active {
  transform: scale(0.94);
}
`

const tabs = [
  { path: '/',         emoji: '🏠', label: 'Accueil',  color: '#10b981', glow: 'rgba(16,185,129,0.4)' },
  { path: '/galerie',  emoji: '🎨', label: 'Galerie',  color: '#3b82f6', glow: 'rgba(59,130,246,0.4)' },
  { path: '/partager', emoji: '✨', label: 'Partager', color: '#f97316', glow: 'rgba(249,115,22,0.4)'  },
]

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <style>{CSS}</style>

      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.08) inset',
      }}>

        {/* Effet de brillance en haut */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          pointerEvents: 'none',
        }}/>

        {/* ── Ligne 1 : Logo + badge ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px 10px',
        }}>

          {/* Logo animé */}
          <div
            className="topnav-logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <span style={{
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: '-0.5px',
              color: '#fff',
              fontFamily: 'system-ui, sans-serif',
            }}>Creat</span>
            <span style={{
              fontWeight: 900,
              fontSize: 28,
              background: 'linear-gradient(90deg, #fb923c, #f97316, #fb923c)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmerNav 3s linear infinite',
            }}>S4</span>
            <span style={{
              fontWeight: 900,
              fontSize: 28,
              color: '#6ee7b7',
            }}>pY</span>
          </div>

          {/* Badge */}
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 20,
            padding: '4px 12px',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.03em',
            }}>
              ✦ Gratuit
            </span>
          </div>
        </div>

        {/* ── Ligne 2 : Onglets ── */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          padding: '0 12px',
          gap: 4,
        }}>
          {tabs.map(tab => {
            const active = location.pathname === tab.path

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`topnav-tab ${active ? 'topnav-tab-active' : ''}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '10px 8px 0',
                  border: 'none',
                  background: active
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent',
                  borderRadius: '16px 16px 0 0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  backdropFilter: active ? 'blur(8px)' : 'none',
                }}
              >
                {/* Glow derrière l'icône active */}
                {active && (
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: tab.glow,
                    filter: 'blur(12px)',
                    pointerEvents: 'none',
                  }}/>
                )}

                {/* Icône dans un cercle */}
                <div style={{
                  width: active ? 46 : 38,
                  height: active ? 46 : 38,
                  borderRadius: active ? 16 : 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: active ? 24 : 20,
                  background: active
                    ? `linear-gradient(135deg, ${tab.color}, ${tab.color}bb)`
                    : 'rgba(255,255,255,0.08)',
                  boxShadow: active
                    ? `0 4px 16px ${tab.glow}, 0 2px 4px rgba(0,0,0,0.2)`
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {tab.emoji}
                </div>

                {/* Label */}
                <span style={{
                  fontSize: 11,
                  fontWeight: active ? 800 : 600,
                  color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  zIndex: 1,
                  marginBottom: 6,
                }}>
                  {tab.label}
                </span>

                {/* Indicateur bas */}
                <div
                  className="tab-indicator"
                  style={{
                    height: 3,
                    width: '60%',
                    borderRadius: '3px 3px 0 0',
                    background: active
                      ? `linear-gradient(90deg, transparent, ${tab.color}, transparent)`
                      : 'transparent',
                    transition: 'background 0.2s ease',
                    alignSelf: 'stretch',
                    margin: '0 auto',
                  }}
                />
              </button>
            )
          })}
        </div>

      </nav>
    </>
  )
}