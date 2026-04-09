import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRecommandations } from '../api/index'
import BottomNav from '../components/BottomNav'

export default function Recommandations() {
  const location = useLocation()
  const navigate = useNavigate()
  const [recos, setRecos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!location.state) { navigate('/'); return }
    getRecommandations(location.state)
      .then(res => {
        const data = res.data.map((r, i) => ({ ...r, coupDeCoeur: i === 0 }))
        setRecos(data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
      <div className="text-center">
        <div className="text-5xl mb-4">🎨</div>
        <p className="text-gray-500">On cherche ce qui te correspond...</p>
      </div>
      <BottomNav />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="font-black text-2xl text-emerald-800 cursor-pointer" onClick={() => navigate('/')}>
          creat<span className="text-orange-500">ify</span>
        </span>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">Sans inscription</span>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-6">

        <button
          onClick={() => navigate('/', { state: { startStep: 2 } })}
          className="flex items-center gap-1 text-gray-400 text-sm mb-5 hover:text-gray-600 transition-colors"
        >
          ← Modifier mes goûts
        </button>

        <div className="bg-emerald-800 rounded-2xl p-6 text-center mb-6">
          <h2 className="text-white font-black text-2xl mb-1">Voilà ce qu'on te propose !</h2>
          <p className="text-emerald-200 text-sm">Sélectionné juste pour toi</p>
        </div>

        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Nos coups de cœur</p>

        <div className="flex flex-col gap-3 mb-6">
          {recos.map((r) => (
            <div
              key={r.activite.id}
              onClick={() => navigate(`/activite/${r.activite.id}`)}
              className={`bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 ${
                r.coupDeCoeur ? 'border-2 border-emerald-500' : 'border border-gray-100 hover:border-emerald-200'
              }`}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: r.activite.couleur }}
              >
                {r.activite.icone}
              </div>
              <div className="flex-1">
                {r.coupDeCoeur && (
                  <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-medium mb-1 inline-block">
                    ⭐ Parfait pour toi
                  </span>
                )}
                <div className="font-semibold text-gray-900">{r.activite.titre}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.activite.description}</div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {[...new Set(r.activite.tags)]?.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: r.activite.couleur, color: '#555' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-gray-300 text-xl flex-shrink-0">›</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/', { state: { startStep: 2 } })}
          className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors mb-3"
        >
          ← Modifier mes goûts
        </button>
        <button
          onClick={() => navigate('/galerie')}
          className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          Voir la galerie des créations
        </button>
      </div>
      <BottomNav />
    </div>
  )
}