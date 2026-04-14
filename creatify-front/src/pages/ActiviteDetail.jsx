import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getActiviteById } from '../api/index'
import BottomNav from '../components/BottomNav'
import PageBackground from '../components/PageBackground'
import { getYoutubeEmbedUrl, getYoutubeSearchUrl } from '../utils/youtubeMap'

function formatDuree(minutes) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m}` : `${h}h`
}

const CSS = `
@keyframes fadeUp {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes bounce {
  0%,100% { transform:translateY(0); }
  50%     { transform:translateY(-8px); }
}
`

/* ─── Section vidéo YouTube ───────────────────────────────────────── */
function YoutubeSection({ activite }) {
  const [showVideo, setShowVideo] = useState(false)

  const embedUrl   = getYoutubeEmbedUrl(activite.id)
  const searchUrl  = getYoutubeSearchUrl(activite.id, activite.titre)

  return (
    <div style={{ animation:'fadeUp .6s .25s both' }}
      className="bg-white/90 rounded-3xl border-2 border-gray-100 p-6 mb-5">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-gray-900 text-2xl">🎬 Vidéos tutoriels</h2>
        <a href={searchUrl} target="_blank" rel="noopener noreferrer"
          className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1">
          Voir plus →
        </a>
      </div>

      {!showVideo ? (
        /* Miniature cliquable */
        <div onClick={() => setShowVideo(true)}
          className="relative cursor-pointer rounded-2xl overflow-hidden group"
          style={{ aspectRatio:'16/9', background:'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
            <span style={{ fontSize:56 }}>🎬</span>
            <p className="text-white font-black text-lg text-center leading-snug">
              Tutos vidéo pour<br/>
              <span className="text-emerald-300">"{activite.titre}"</span>
            </p>
            <p className="text-white/60 text-sm text-center">
              Clique pour regarder des tutoriels YouTube
            </p>
          </div>
          {/* Bouton play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center
              transition-transform group-hover:scale-110 group-hover:shadow-2xl"
              style={{ background:'rgba(255,0,0,0.85)' }}>
              <div style={{ width:0, height:0,
                borderTop:'14px solid transparent',
                borderBottom:'14px solid transparent',
                borderLeft:'24px solid white',
                marginLeft:6 }}/>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <span className="bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
              ▶ Cliquer pour lancer
            </span>
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              YouTube
            </span>
          </div>
        </div>
      ) : (
        /* Iframe YouTube embed search */
        <div className="rounded-2xl overflow-hidden" style={{ aspectRatio:'16/9' }}>
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={`Tutoriels ${activite.titre}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width:'100%', height:'100%', display:'block' }}
          />
        </div>
      )}

      {showVideo && (
        <button onClick={() => setShowVideo(false)}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 font-semibold">
          ✕ Fermer la vidéo
        </button>
      )}

      {/* Bouton YouTube externe */}
      <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-gray-800">Plus de tutoriels ?</p>
          <p className="text-xs text-gray-500 mt-0.5">Recherche sur YouTube</p>
        </div>
        <a href={searchUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white
            font-black text-sm px-5 py-3 rounded-xl transition-colors flex-shrink-0">
          <span style={{ fontSize:16 }}>▶</span> YouTube
        </a>
      </div>
    </div>
  )
}

/* ─── Page principale ─────────────────────────────────────────────── */
export default function ActiviteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [activite, setActivite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [etapeActive, setEtapeActive] = useState(0)

  const fromRecommandations = location.state?.from === 'recommandations'

  useEffect(() => {
    getActiviteById(id)
      .then(res => setActivite(res.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#f0fdf4', position:'relative' }}>
      <style>{CSS}</style>
      <PageBackground />
      <div style={{ position:'relative', zIndex:1 }}
        className="flex flex-col items-center justify-center min-h-screen pb-20 gap-5">
        <div style={{ animation:'bounce 1.2s ease-in-out infinite', fontSize:72 }}>🎨</div>
        <p className="text-gray-600 text-xl font-bold">Chargement...</p>
        <BottomNav />
      </div>
    </div>
  )

  if (!activite) return null

  const aMateriaux = activite.materiaux?.length > 0
  const aEtapes    = activite.etapes?.length > 0

  return (
    <div style={{ minHeight:'100vh', background:'#f0fdf4', paddingBottom:96, position:'relative' }}>
      <style>{CSS}</style>
      <PageBackground />

      <div style={{ position:'relative', zIndex:1 }}>

        {/* NAV */}
        <nav className="bg-white/80 border-b border-gray-100 px-6 py-5 flex items-center
          justify-between sticky top-0 z-40" style={{ backdropFilter:'blur(8px)' }}>
          <span className="font-black text-3xl tracking-tight cursor-pointer"
            onClick={() => navigate('/')}>
            <span className="text-gray-900">Creat</span>
            <span className="text-orange-500">S4</span>
            <span className="text-emerald-600">pY</span>
          </span>
          <button onClick={() => navigate(-1)}
            className="text-base font-semibold text-gray-500 hover:text-gray-800 transition-colors">
            {fromRecommandations ? '← Autres activités' : '← Retour'}
          </button>
        </nav>

        <div className="max-w-xl mx-auto px-5 py-8">

          {/* Header activité */}
          <div style={{ animation:'fadeUp .6s both' }}
            className="bg-white/90 rounded-3xl border-2 border-gray-100 overflow-hidden mb-5">
            <div className="h-52 flex items-center justify-center"
              style={{ background: activite.couleur || '#f0fdf4' }}>
              <span style={{ fontSize:96 }}>{activite.icone || '🎨'}</span>
            </div>
            <div className="p-6">
              <h1 className="font-black text-3xl text-gray-900 mb-3 leading-tight">
                {activite.titre}
              </h1>
              {activite.description && (
                <p className="text-gray-500 text-lg leading-relaxed mb-4">
                  {activite.description}
                </p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                {activite.dureeMinutes && (
                  <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2">
                    <span className="text-2xl">⏱️</span>
                    <span className="text-lg font-black text-gray-800">
                      {formatDuree(activite.dureeMinutes)}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-emerald-100 rounded-2xl px-4 py-2">
                  <span className="text-2xl">😊</span>
                  <span className="text-lg font-black text-emerald-700">Facile</span>
                </div>
                {activite.ages?.length > 0 && (
                  <div className="flex items-center gap-2 bg-blue-100 rounded-2xl px-4 py-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-base font-bold text-blue-700">
                      {activite.ages.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Matériaux */}
          {aMateriaux && (
            <div style={{ animation:'fadeUp .6s .1s both' }}
              className="bg-white/90 rounded-3xl border-2 border-gray-100 p-6 mb-5">
              <h2 className="font-black text-gray-900 text-2xl mb-4">🛒 Ce qu'il te faut</h2>
              <ul className="flex flex-col gap-3">
                {activite.materiaux.map((m, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700
                      text-sm font-black flex items-center justify-center flex-shrink-0">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Étapes */}
          {aEtapes && (
            <div style={{ animation:'fadeUp .6s .2s both' }}
              className="bg-white/90 rounded-3xl border-2 border-gray-100 p-6 mb-5">
              <h2 className="font-black text-gray-900 text-2xl mb-5">📋 Les étapes</h2>
              <div className="flex flex-col gap-3">
                {activite.etapes.map((etape, i) => (
                  <div key={i} onClick={() => setEtapeActive(i)}
                    className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer
                      transition-all duration-150 ${
                        etapeActive === i
                          ? 'bg-emerald-50 border-2 border-emerald-400'
                          : 'border-2 border-gray-100 hover:border-emerald-200 hover:bg-gray-50'
                      }`}>
                    <span className={`w-10 h-10 rounded-2xl text-base font-black
                      flex items-center justify-center flex-shrink-0 transition-colors ${
                        etapeActive === i ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>{i + 1}</span>
                    <p className={`text-lg leading-relaxed transition-colors ${
                      etapeActive === i ? 'text-emerald-900 font-bold' : 'text-gray-700'
                    }`}>{etape}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VIDÉOS YOUTUBE ── */}
          <YoutubeSection activite={activite} />

          {/* CTA partager */}
          <div style={{ animation:'fadeUp .6s .35s both' }}
            className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-6 mb-5">
            <p className="text-2xl font-black text-orange-900 mb-2">📸 Tu l'as fait ?</p>
            <p className="text-orange-800 text-lg leading-relaxed mb-5">
              Montre ta version à la communauté !
            </p>
            <button onClick={() => navigate('/partager')}
              className="w-full bg-orange-500 text-white font-black text-xl py-5
                rounded-2xl hover:bg-orange-600 active:scale-95 transition-all">
              🎉 Partager ma version
            </button>
          </div>

          {/* Boutons bas */}
          <div style={{ animation:'fadeUp .6s .45s both' }} className="flex flex-col gap-3">
            {fromRecommandations && (
              <button onClick={() => navigate(-1)}
                className="w-full bg-emerald-600 text-white font-black text-lg py-5
                  rounded-3xl hover:bg-emerald-700 transition-colors">
                🔄 Voir les autres activités proposées
              </button>
            )}
            <button onClick={() => navigate('/galerie')}
              className="w-full bg-white/90 border-2 border-gray-200 text-gray-700
                font-bold text-lg py-5 rounded-3xl hover:bg-white transition-colors">
              🎨 Voir la galerie
            </button>
            <button onClick={() => navigate('/')}
              className="w-full bg-white/90 border-2 border-gray-200 text-gray-500
                font-semibold text-base py-4 rounded-3xl hover:bg-white transition-colors">
              🔁 Recommencer la sélection
            </button>
          </div>

        </div>
      </div>
      <BottomNav />
    </div>
  )
}