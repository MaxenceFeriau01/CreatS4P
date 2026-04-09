import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getActivites } from '../api/index'
import BottomNav from '../components/BottomNav'

export default function ActiviteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activite, setActivite] = useState(null)
  const [etapeActive, setEtapeActive] = useState(0)

  useEffect(() => {
    getActivites().then(res => {
      const found = res.data.find(a => a.id === parseInt(id))
      setActivite(found)
    })
  }, [id])

  if (!activite) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
      <div className="text-5xl">🎨</div>
      <BottomNav />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="font-black text-2xl text-emerald-800 cursor-pointer" onClick={() => navigate('/')}>
          creat<span className="text-orange-500">ify</span>
        </span>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Sans inscription</span>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 text-sm mb-4 flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          ← Retour
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          <div className="h-36 flex items-center justify-center text-7xl" style={{ background: activite.couleur }}>
            {activite.icone}
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-black text-2xl text-gray-900">{activite.titre}</h1>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                activite.difficulte === 'FACILE'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {activite.difficulte}
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">{activite.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>⏱ {activite.dureeMinutes} min</span>
              {activite.nombreParticipants && <span>👥 {activite.nombreParticipants}</span>}
            </div>
          </div>
        </div>

        {/* Matériaux */}
        {activite.materiaux?.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <h2 className="font-bold text-gray-900 text-lg mb-3">🛒 Ce qu'il te faut</h2>
            <ul className="flex flex-col gap-2">
              {[...new Set(activite.materiaux)].map((m, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-medium flex-shrink-0">✓</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Étapes */}
        {activite.etapes?.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <h2 className="font-bold text-gray-900 text-lg mb-4">📋 Les étapes</h2>
            <div className="flex flex-col gap-2">
              {activite.etapes.map((etape, i) => (
                <div
                  key={i}
                  onClick={() => setEtapeActive(i)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    etapeActive === i
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    etapeActive === i ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {i + 1}
                  </span>
                  <p className={`text-sm leading-relaxed transition-colors ${
                    etapeActive === i ? 'text-emerald-900 font-medium' : 'text-gray-600'
                  }`}>
                    {etape}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conseil accompagnant */}
        {activite.conseilAccompagnant && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
            <h2 className="font-bold text-blue-900 text-base mb-2">💡 Conseil pour l'accompagnant</h2>
            <p className="text-blue-800 text-sm leading-relaxed">{activite.conseilAccompagnant}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/partager')}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-medium hover:bg-orange-600 transition-colors mb-3"
        >
          J'ai fait cette activité — Partager ma création 🎉
        </button>
        <button
          onClick={() => navigate('/galerie')}
          className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Voir les créations de la communauté
        </button>
      </div>
      <BottomNav />
    </div>
  )
}