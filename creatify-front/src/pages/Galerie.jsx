import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCreations, addReaction } from '../api/index'
import BottomNav from '../components/BottomNav'

const TYPES = ['Tout voir', 'Bijou', 'Collage', 'Bois', 'Argile', 'Peinture', 'Nature', 'Récup']

export default function Galerie() {
  const navigate = useNavigate()
  const [creations, setCreations] = useState([])
  const [filtre, setFiltre] = useState('Tout voir')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCreations()
      .then(res => setCreations(res.data))
      .finally(() => setLoading(false))
  }, [])

  const handleReaction = async (id, type) => {
    await addReaction(id, { type })
    setCreations(prev => prev.map(c => {
      if (c.id !== id) return c
      return { ...c, reactions: [...(c.reactions || []), { type }] }
    }))
  }

  const countReaction = (creation, type) =>
    (creation.reactions || []).filter(r => r.type === type).length

  const filtered = filtre === 'Tout voir'
    ? creations
    : creations.filter(c => c.typeCreation?.toLowerCase().includes(filtre.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="font-black text-2xl text-emerald-800 cursor-pointer" onClick={() => navigate('/')}>
          creat<span className="text-orange-500">ify</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">Sans inscription</span>
          <button
            onClick={() => navigate('/partager')}
            className="bg-orange-500 text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            + Partager
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-black text-3xl text-gray-900 mb-1">
            Les <span className="text-emerald-600">créations</span> de la communauté
          </h1>
          <p className="text-gray-400 text-sm">Des œuvres faites à la main, partagées avec fierté.</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setFiltre(t)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-150 ${
                filtre === t
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎨</div>
            <p className="text-gray-400">Chargement des créations...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-gray-400 mb-4">Pas encore de créations ici.</p>
            <button
              onClick={() => navigate('/partager')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
            >
              Sois le premier à partager !
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <div className="h-40 bg-emerald-50 flex items-center justify-center text-6xl">
                {c.imageUrl
                  ? <img src={c.imageUrl} alt={c.titre} className="w-full h-full object-cover" />
                  : '🎨'}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center flex-shrink-0">
                    {c.pseudo ? c.pseudo[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{c.pseudo || 'Anonyme'}</div>
                    <div className="text-xs text-gray-400">
                      {c.dateCreation ? new Date(c.dateCreation).toLocaleDateString('fr-FR') : ''}
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{c.titre}</div>
                <div className="text-xs text-gray-400 leading-relaxed mb-3">{c.description}</div>
                {c.typeCreation && (
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                    {c.typeCreation}
                  </span>
                )}
              </div>
              <div className="flex gap-1 px-4 pb-3 border-t border-gray-50 pt-2">
                {[
                  { type: 'ETOILE', emoji: '⭐' },
                  { type: 'COEUR', emoji: '❤️' },
                  { type: 'APPLAUDISSEMENT', emoji: '👏' }
                ].map(({ type, emoji }) => (
                  <button
                    key={type}
                    onClick={() => handleReaction(c.id, type)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-all duration-150 font-medium"
                  >
                    {emoji} {countReaction(c, type)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}