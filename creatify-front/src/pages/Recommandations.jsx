import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRecommandations } from '../api/index'
import TopNav from '../components/TopNav'

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
        setRecos(data)
      })
      .catch(() => setRecos([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🎨</div>
        <p className="text-xl font-bold text-gray-600">On cherche des idées pour toi...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="font-black text-3xl text-gray-900 mb-2">Tes activités 🎯</h1>
        <p className="text-gray-500 text-lg mb-7">On a sélectionné ces idées rien que pour toi !</p>

        {recos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">😅</div>
            <p className="text-xl font-bold text-gray-600 mb-2">Aucune activité trouvée</p>
            <p className="text-gray-400 text-base">Essaie de modifier tes préférences !</p>
            <button onClick={() => navigate('/')} className="mt-6 bg-emerald-600 text-white font-black text-lg px-8 py-4 rounded-2xl">
              Réessayer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recos.map((r, idx) => {
              const isCommunaute = r.creationCommunaute === true
              const auteur = r.auteurCreation || 'Anonyme'

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isCommunaute && r.creationId) {
                      navigate(`/creation/${r.creationId}`)
                    } else if (r.activite?.id) {
                      navigate(`/activite/${r.activite.id}`)
                    }
                  }}
                  className="bg-white rounded-3xl border-2 border-gray-100 p-5 text-left hover:border-emerald-300 hover:shadow-md active:scale-95 transition-all duration-150 relative overflow-hidden"
                >
                  {/* Badge coup de cœur */}
                  {r.coupDeCoeur && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">
                      ❤️ Coup de cœur
                    </div>
                  )}

                  {/* Badge communauté — Créé par [auteur] */}
                  {isCommunaute && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="bg-amber-100 text-amber-700 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                        🌟 Créé par {auteur}
                      </span>
                    </div>
                  )}

                  {/* Icône */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                    style={{ backgroundColor: isCommunaute ? '#FFF3CD' : (r.activite?.couleur || '#F0FDF4') }}
                  >
                    {r.activite?.icone || '🌟'}
                  </div>

                  {/* Titre */}
                  <p className="font-black text-gray-900 text-lg leading-tight mb-2">
                    {r.activite?.titre || 'Activité'}
                  </p>

                  {/* Description */}
                  {r.activite?.description && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                      {r.activite.description}
                    </p>
                  )}

                  {/* Badges durée + difficulté */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {r.activite?.dureeMinutes && (
                      <div className="flex items-center gap-1 bg-gray-100 rounded-xl px-2 py-1">
                        <span className="text-sm">⏱️</span>
                        <span className="text-xs font-black text-gray-800">
                          {formatDuree(r.activite.dureeMinutes)}
                        </span>
                      </div>
                    )}
                    {r.activite?.difficulte && (
                      <div className={`flex items-center gap-1 rounded-xl px-2 py-1 ${
                        r.activite.difficulte === 'FACILE' ? 'bg-emerald-100' : 'bg-amber-100'
                      }`}>
                        <span className="text-sm">
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
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-8 w-full bg-white border-2 border-gray-200 text-gray-600 font-bold text-base py-4 rounded-3xl hover:bg-gray-50 transition-colors"
        >
          ← Modifier mes préférences
        </button>
      </div>
    </div>
  )
}