import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCreations } from '../api/index'
import BottomNav from '../components/BottomNav'

const TYPES = ['Tout voir', 'Bijou', 'Collage', 'Bois', 'Argile', 'Peinture', 'Nature', 'Récup']

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

export default function Galerie() {
  const navigate = useNavigate()
  const [creations, setCreations] = useState([])
  const [filtre, setFiltre] = useState('Tout voir')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCreations()
      .then(res => {
        const data = res.data
        setCreations(Array.isArray(data) ? data : [])
      })
      .catch(() => setCreations([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = Array.isArray(creations)
    ? (filtre === 'Tout voir'
        ? creations
        : creations.filter(c => c.typeCreation?.toLowerCase().includes(filtre.toLowerCase())))
    : []

  return (
    <div className="min-h-screen pb-28" style={{ background: '#f0faf5' }}>

      {/* NAV — sans bouton Partager */}
      <nav className="bg-emerald-800 px-6 py-5 flex items-center justify-between">
        <span
          className="font-black text-3xl tracking-tight cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-white">Creat</span>
          <span className="text-orange-400">S4</span>
          <span className="text-emerald-300">pY</span>
        </span>
        <span className="text-sm bg-white/20 text-white px-4 py-1.5 rounded-full font-semibold">
          Sans inscription
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-8">

        {/* Titre */}
        <div className="mb-7">
          <h1 className="font-black text-3xl text-gray-900 mb-2 leading-tight">
            Les créations de la <span className="text-emerald-600">communauté</span> 🎨
          </h1>
          <p className="text-gray-500 text-lg">
            Clique sur une création pour voir comment la reproduire !
          </p>
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap mb-7">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setFiltre(t)}
              className={`px-4 py-2 rounded-2xl text-base font-bold border-2 transition-all duration-150 ${
                filtre === t
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Chargement */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🎨</div>
            <p className="text-gray-500 text-lg font-semibold">Chargement des créations...</p>
          </div>
        )}

        {/* Vide */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-5">🌱</div>
            <p className="text-gray-600 text-xl font-bold mb-2">Pas encore de créations ici.</p>
            <p className="text-gray-400 text-base mb-7">Sois le premier à partager !</p>
            <button
              onClick={() => navigate('/partager')}
              className="bg-emerald-600 text-white text-lg font-black px-8 py-5 rounded-3xl hover:bg-emerald-700 transition-colors"
            >
              + Partager ma création
            </button>
          </div>
        )}

        {/* Grille */}
        <div className="flex flex-col gap-4">
          {filtered.map(c => {
            const auteur = c.estAnonyme || !c.pseudo ? 'Anonyme' : c.pseudo
            const initiale = auteur === 'Anonyme' ? '?' : auteur[0].toUpperCase()
            const totalReactions = (c.reactions || []).length
            const estActivite = c.estActivite === true

            return (
              <button
                key={c.id}
                onClick={() => navigate(`/creation/${c.id}`)}
                className="w-full bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-200 transition-all duration-150 text-left active:scale-98"
              >
                {/* Image */}
                <div className="h-52 bg-emerald-50 flex items-center justify-center overflow-hidden">
                  {c.imageUrl
                    ? <img src={c.imageUrl} alt={c.titre} className="w-full h-full object-cover" />
                    : <span className="text-7xl">🎨</span>
                  }
                </div>

                <div className="p-5">
                  {/* Badge activité communautaire */}
                  {estActivite && (
                    <span className="inline-block bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1 rounded-full mb-3">
                      🛠️ Activité complète
                    </span>
                  )}

                  {/* Auteur + date */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 text-lg font-black flex items-center justify-center flex-shrink-0">
                      {initiale}
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-black text-gray-900">{auteur}</p>
                      <p className="text-sm text-gray-400">{formatDate(c.dateCreation)}</p>
                    </div>
                    {c.typeCreation && (
                      <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full">
                        {c.typeCreation}
                      </span>
                    )}
                  </div>

                  {/* Titre */}
                  <p className="font-black text-xl text-gray-900 mb-2 leading-tight">
                    {c.titre}
                  </p>

                  {/* Description courte */}
                  {c.description && (
                    <p className="text-gray-500 text-base leading-relaxed mb-3 line-clamp-2">
                      {c.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {totalReactions > 0 && (
                        <span className="text-base text-gray-400 font-semibold">
                          {totalReactions} réaction{totalReactions > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <span className="text-emerald-600 font-black text-base">
                      Voir en détail →
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}