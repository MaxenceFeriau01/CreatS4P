import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRecommandations } from '../api/index'
import PageBackground from '../components/PageBackground'

function formatDuree(minutes) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m}` : `${h}h`
}

const CSS = `
@keyframes fadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes bounce {
  0%,100% { transform:translateY(0); }
  50%     { transform:translateY(-8px); }
}
@keyframes cardIn {
  from { opacity:0; transform:translateY(20px) scale(0.96); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
`

export default function Recommandations() {
  const location = useLocation()
  const navigate = useNavigate()
  const [recos, setRecos]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!location.state) { navigate('/'); return }
    getRecommandations(location.state)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        setRecos(data.map((r, i) => ({ ...r, coupDeCoeur: i === 0 })))
      })
      .catch(() => setRecos([]))
      .finally(() => setLoading(false))
  }, [])

  /* ── LOADING ── */
  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#f0fdf4', position:'relative' }}>
      <style>{CSS}</style>
      <PageBackground />
      <div style={{ position:'relative', zIndex:1 }}
        className="flex flex-col items-center justify-center min-h-screen pb-20 gap-6 px-8">
        <div style={{ animation:'bounce 1.2s ease-in-out infinite', fontSize:80 }}>🎨</div>
        <p style={{ fontSize:22, fontWeight:800, color:'#374151', textAlign:'center', lineHeight:1.4 }}>
          On cherche ce qui te correspond...
        </p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f0fdf4', paddingBottom:48, position:'relative' }}>
      <style>{CSS}</style>
      <PageBackground />

      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'28px 20px' }}>

          {/* ── Bouton retour ── */}
          <button
            onClick={() => navigate('/', { state: { startStep: 2 } })}
            style={{
              display:'flex', alignItems:'center', gap:8,
              background:'rgba(255,255,255,0.7)',
              border:'1.5px solid rgba(255,255,255,0.9)',
              borderRadius:16, padding:'10px 18px',
              fontSize:16, fontWeight:700, color:'#374151',
              cursor:'pointer', marginBottom:24,
              backdropFilter:'blur(8px)',
              animation:'fadeUp .4s both',
            }}
          >
            ← Modifier mes réponses
          </button>

          {/* ── Bandeau titre ── */}
          <div style={{
            animation:'fadeUp .5s .05s both',
            background:'linear-gradient(135deg,#047857,#059669 55%,#10b981)',
            borderRadius:28, padding:'32px 28px', textAlign:'center',
            marginBottom:32, position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.1)' }}/>
            <div style={{ position:'absolute', bottom:-15, left:-15, width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
            <div style={{ position:'relative' }}>
              <div style={{ fontSize:52, marginBottom:10 }}>🎉</div>
              <h1 style={{ color:'#fff', fontWeight:900, fontSize:26, marginBottom:8, lineHeight:1.3 }}>
                Voilà ce qu'on te propose !
              </h1>
              <p style={{ color:'rgba(255,255,255,0.8)', fontSize:17 }}>
                Sélectionné juste pour toi
              </p>
            </div>
          </div>

          {/* ── Grille 2 colonnes ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(2, 1fr)',
            gap:20,
            marginBottom:32,
          }}>
            {recos.map((r, idx) => {
              const estCommunaute = r.creationCommunaute === true
              const couleur       = r.activite?.couleur || '#f0fdf4'

              return (
                <button
                  key={r.activite?.id}
                  onClick={() => {
                    if (estCommunaute && r.creationId)
                      navigate(`/creation/${r.creationId}`, { state:{ from:'recommandations' } })
                    else
                      navigate(`/activite/${r.activite?.id}`, { state:{ from:'recommandations' } })
                  }}
                  style={{
                    animation: `cardIn .5s ${idx * 0.08}s both`,
                    background: 'rgba(255,255,255,0.92)',
                    borderRadius: 24,
                    border: r.coupDeCoeur ? '3px solid #10b981' : '2px solid rgba(255,255,255,0.9)',
                    boxShadow: r.coupDeCoeur
                      ? '0 8px 32px rgba(16,185,129,0.2), 0 2px 8px rgba(0,0,0,0.06)'
                      : '0 4px 20px rgba(0,0,0,0.08)',
                    cursor:'pointer', textAlign:'left',
                    padding:0, overflow:'hidden',
                    display:'flex', flexDirection:'column',
                    transition:'transform .2s ease, box-shadow .2s ease',
                    backdropFilter:'blur(8px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform='translateY(-4px)'
                    e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.14)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform='translateY(0)'
                    e.currentTarget.style.boxShadow=r.coupDeCoeur
                      ? '0 8px 32px rgba(16,185,129,0.2)'
                      : '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                >

                  {/* ── Zone colorée haut ── */}
                  <div style={{
                    background: `linear-gradient(135deg, ${couleur}dd, ${couleur}88)`,
                    padding:'20px 20px 16px',
                    position:'relative', overflow:'hidden',
                  }}>
                    <div style={{
                      position:'absolute', top:-16, right:-16,
                      width:72, height:72, borderRadius:'50%',
                      background:'rgba(255,255,255,0.2)',
                    }}/>

                    {/* Badges */}
                    {(r.coupDeCoeur || estCommunaute) && (
                      <div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap' }}>
                        {r.coupDeCoeur && (
                          <span style={{
                            background:'#059669', color:'#fff',
                            fontSize:12, fontWeight:800,
                            padding:'3px 10px', borderRadius:20,
                          }}>⭐ Parfait pour toi !</span>
                        )}
                        {estCommunaute && (
                          <span style={{
                            background:'rgba(255,255,255,0.85)', color:'#92400e',
                            fontSize:12, fontWeight:700,
                            padding:'3px 10px', borderRadius:20,
                          }}>🌟 Communauté</span>
                        )}
                      </div>
                    )}

                    {/* Icône + Titre */}
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{
                        width:60, height:60, borderRadius:18,
                        background:'rgba(255,255,255,0.88)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:34, flexShrink:0,
                        boxShadow:'0 4px 12px rgba(0,0,0,0.1)',
                      }}>
                        {r.activite?.icone || '🎨'}
                      </div>
                      <h2 style={{
                        fontSize:20, fontWeight:900,
                        color:'#111827', lineHeight:1.25,
                        margin:0, flex:1,
                        textShadow:'0 1px 2px rgba(255,255,255,0.6)',
                      }}>
                        {r.activite?.titre}
                      </h2>
                    </div>
                  </div>

                  {/* ── Corps ── */}
                  <div style={{ padding:'16px 20px 20px', display:'flex', flexDirection:'column', flex:1 }}>

                    {/* Description lisible */}
                    <p style={{
                      fontSize:16, lineHeight:1.6,
                      color:'#374151', fontWeight:500,
                      marginBottom:16, flex:1,
                    }}>
                      {r.activite?.description}
                    </p>

                    {/* Badges durée + difficulté */}
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
                      {r.activite?.dureeMinutes && (
                        <div style={{
                          display:'flex', alignItems:'center', gap:6,
                          background:'#f3f4f6', borderRadius:12,
                          padding:'6px 12px',
                        }}>
                          <span style={{ fontSize:16 }}>⏱️</span>
                          <span style={{ fontSize:14, fontWeight:800, color:'#1f2937' }}>
                            {formatDuree(r.activite.dureeMinutes)}
                          </span>
                        </div>
                      )}
                      {r.activite?.difficulte && (
                        <div style={{
                          display:'flex', alignItems:'center', gap:6,
                          background: r.activite.difficulte === 'FACILE' ? '#d1fae5' : '#fef3c7',
                          borderRadius:12, padding:'6px 12px',
                        }}>
                          <span style={{ fontSize:16 }}>
                            {r.activite.difficulte === 'FACILE' ? '😊' : '💪'}
                          </span>
                          <span style={{
                            fontSize:14, fontWeight:800,
                            color: r.activite.difficulte === 'FACILE' ? '#065f46' : '#92400e',
                          }}>
                            {r.activite.difficulte === 'FACILE' ? 'Facile' : 'Moyen'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      background: r.coupDeCoeur
                        ? 'linear-gradient(135deg,#059669,#10b981)'
                        : 'linear-gradient(135deg,#1e3a5f,#1d4ed8)',
                      borderRadius:16, padding:'14px 16px',
                      color:'#fff',
                    }}>
                      <span style={{ fontSize:16, fontWeight:800 }}>
                        Voir cette activité
                      </span>
                      <div style={{
                        width:36, height:36, borderRadius:10,
                        background:'rgba(255,255,255,0.2)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:18, fontWeight:900,
                      }}>→</div>
                    </div>

                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Boutons bas ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:12, animation:'fadeUp .5s .5s both' }}>
            <button
              onClick={() => navigate('/', { state: { startStep: 2 } })}
              style={{
                background:'rgba(255,255,255,0.85)', backdropFilter:'blur(8px)',
                border:'2px solid rgba(255,255,255,0.9)', borderRadius:20,
                padding:'18px', fontSize:17, fontWeight:700,
                color:'#374151', cursor:'pointer',
                boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              ← Modifier mes réponses
            </button>
            <button
              onClick={() => navigate('/galerie')}
              style={{
                background:'linear-gradient(135deg,#059669,#10b981)',
                border:'none', borderRadius:20,
                padding:'18px', fontSize:17, fontWeight:800,
                color:'#fff', cursor:'pointer',
                boxShadow:'0 4px 20px rgba(16,185,129,0.35)',
              }}
            >
              🎨 Voir la galerie des créations
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}