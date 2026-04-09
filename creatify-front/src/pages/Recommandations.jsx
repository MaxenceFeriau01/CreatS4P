import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRecommandations } from '../api/index'
import BottomNav from '../components/BottomNav'

function formatDuree(minutes) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m}` : `${h}h`
}

export default function Recommandations() {
  const location = useLocation()
  const navigate = useNavigate()
  const [recos, setRecos] = useState([])
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

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-20 gap-5">
      <div className="text-7xl animate-bounce">🎨</div>
      <p className="text-gray-600 text-xl font-bold text-center px-8">
        On cherche ce qui te correspond...
      </p>
      <BottomNav />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
        <span className="font-black text-3xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-gray-900">Creat</span>
          <span className="text-orange-500">S4</span>
          <span className="text-emerald-600">pY</span>
        </span>
        <span className="text-sm bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-semibold">
          Gratuit · Sans inscription
        </span>
      </nav>

      <div className="max-w-3xl mx-auto px-5 py-8">

        {/* Retour */}
        <button
          onClick={() => navigate('/', { state: { startStep: 2 } })}
          className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors"
        >
          ← Modifier mes réponses
        </button>

        {/* Titre */}
        <div className="bg-emerald-600 rounded-3xl px-7 py-8 text-center mb-8 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-orange-400/20" />
          <div className="relative">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-white font-black text-2xl mb-2">Voilà ce qu'on te propose !</h2>
            <p className="text-emerald-200 text-base">Sélectionné juste pour toi</p>
          </div>
        </div>

        {/* Grille 3 colonnes — grandes cartes complètes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {recos.map((r) => {
            const estCommunaute = r.creationCommunaute === true

            return (
              <button
                key={r.activite?.id}
                onClick={() => {
                  if (estCommunaute && r.creationId) {
                    navigate(`/creation/${r.creationId}`)
                  } else {
                    navigate(`/activite/${r.activite?.id}`)
                  }
                }}
                className={`w-full bg-white rounded-3xl p-5 text-left transition-all duration-150 active:scale-98 hover:shadow-lg hover:-translate-y-0.5 flex flex-col ${
                  r.coupDeCoeur
                    ? 'shadow-md'
                    : 'border-2 border-gray-100 hover:border-emerald-200'
                }`}
                style={r.coupDeCoeur ? { border: '3px solid #10b981' } : {}}
              >
                {/* Badges */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {r.coupDeCoeur && (
                    <span className="bg-emerald-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                      ⭐ Parfait pour toi !
                    </span>
                  )}
                  {estCommunaute && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      🌟 Communauté
                    </span>
                  )}
                </div>

                {/* Icône */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-4xl mb-3 flex-shrink-0"
                  style={{ background: r.activite?.couleur || '#f0fdf4' }}
                >
                  {r.activite?.icone || '🎨'}
                </div>

                {/* Titre */}
                <p className="font-black text-gray-900 text-base leading-tight mb-1">
                  {r.activite?.titre}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-1">
                  {r.activite?.description}
                </p>

                {/* Temps + difficulté */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {r.activite?.dureeMinutes && (
                    <div className="flex items-center gap-1 bg-gray-100 rounded-xl px-2 py-1">
                      <span className="text-base">⏱️</span>
                      <span className="text-xs font-black text-gray-800">
                        {formatDuree(r.activite.dureeMinutes)}
                      </span>
                    </div>
                  )}
                  {r.activite?.difficulte && (
                    <div className={`flex items-center gap-1 rounded-xl px-2 py-1 ${
                      r.activite.difficulte === 'FACILE' ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      <span className="text-base">
                        {r.activite.difficulte === 'FACILE' ? '😊' : '💪'}
                      </span>
                      <span className={`text-xs font-black ${
                        r.activite.difficulte === 'FACILE' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {r.activite.difficulte === 'FACILE' ? 'Facile' : 'Moyen'}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Boutons bas */}
        <button
          onClick={() => navigate('/', { state: { startStep: 2 } })}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-5 rounded-3xl hover:bg-gray-50 transition-colors mb-3"
        >
          ← Modifier mes réponses
        </button>
        <button
          onClick={() => navigate('/galerie')}
          className="w-full bg-emerald-600 text-white font-black text-lg py-5 rounded-3xl hover:bg-emerald-700 transition-colors"
        >
          🎨 Voir la galerie des créations
        </button>
      </div>

      <BottomNav />
    </div>
  )
}