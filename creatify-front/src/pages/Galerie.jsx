import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCreations } from '../api/index'
import TopNav from '../components/TopNav'

const PAR_PAGE = 9

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

export default function Galerie() {
  const navigate = useNavigate()
  const [creations, setCreations] = useState([])
  const [filtre, setFiltre] = useState('Tout voir')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getCreations()
      .then(res => setCreations(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCreations([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { setPage(1) }, [filtre])

  const types = ['Tout voir', ...new Set(creations.map(c => c.typeCreation).filter(Boolean))]
  const filtered = filtre === 'Tout voir' ? creations : creations.filter(c => c.typeCreation === filtre)
  const totalPages = Math.ceil(filtered.length / PAR_PAGE)
  const paginated = filtered.slice((page - 1) * PAR_PAGE, page * PAR_PAGE)

  const goToPage = (n) => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="min-h-screen" style={{ background: '#f0faf5' }}>
      <TopNav />
      <div className="max-w-2xl mx-auto px-5 py-8">

        <div className="mb-7">
          <h1 className="font-black text-3xl text-gray-900 mb-2 leading-tight">
            Les créations de la <span className="text-emerald-600">communauté</span> 🎨
          </h1>
          <p className="text-gray-500 text-lg">Clique sur une création pour voir comment la reproduire !</p>
        </div>

        {/* Filtres dynamiques */}
        <div className="flex gap-2 flex-wrap mb-5">
          {types.map(t => (
            <button key={t} onClick={() => setFiltre(t)}
              className={`px-4 py-2 rounded-2xl text-base font-bold border-2 transition-all duration-150 ${
                filtre === t ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Compteur */}
        {!loading && filtered.length > 0 && (
          <p className="text-gray-400 text-sm font-semibold mb-5">
            {filtered.length} création{filtered.length > 1 ? 's' : ''}
            {totalPages > 1 && ` — page ${page} sur ${totalPages}`}
          </p>
        )}

        {/* Contenu */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-bounce">🎨</div>
            <p className="text-xl font-bold text-gray-500">Chargement...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😅</div>
            <p className="text-xl font-bold text-gray-500">Aucune création pour l'instant</p>
            <button onClick={() => navigate('/partager')} className="mt-6 bg-orange-500 text-white font-black text-lg px-8 py-4 rounded-2xl">
              Être le premier à partager !
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {paginated.map(c => {
              const auteur = c.estAnonyme || !c.pseudo ? 'Anonyme' : c.pseudo
              const initiale = auteur === 'Anonyme' ? '?' : auteur[0].toUpperCase()
              const estActivite = c.estActivite === true
              const totalReactions = c.reactions?.length || 0
              return (
                <button key={c.id} onClick={() => navigate(`/creation/${c.id}`)}
                  className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden text-left hover:border-emerald-300 hover:shadow-md active:scale-98 transition-all duration-150">
                  <div className="w-full bg-emerald-50 flex items-center justify-center overflow-hidden" style={{ minHeight: '200px' }}>
                    {c.imageUrl
                      ? <img src={c.imageUrl} alt={c.titre} className="w-full object-contain" />
                      : <span className="text-7xl py-10">🎨</span>
                    }
                  </div>
                  <div className="p-5">
                    {estActivite && (
                      <span className="inline-block bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1 rounded-full mb-3">🛠️ Activité complète</span>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 text-lg font-black flex items-center justify-center flex-shrink-0">{initiale}</div>
                      <div className="flex-1">
                        <p className="text-base font-black text-gray-900">{auteur}</p>
                        <p className="text-sm text-gray-400">{formatDate(c.dateCreation)}</p>
                      </div>
                      {c.typeCreation && (
                        <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full">{c.typeCreation}</span>
                      )}
                    </div>
                    <p className="font-black text-xl text-gray-900 mb-2 leading-tight">{c.titre}</p>
                    {c.description && <p className="text-gray-500 text-base leading-relaxed mb-3 line-clamp-2">{c.description}</p>}
                    <div className="flex items-center justify-between mt-2">
                      {totalReactions > 0 && (
                        <span className="text-base text-gray-400 font-semibold">{totalReactions} réaction{totalReactions > 1 ? 's' : ''}</span>
                      )}
                      <span className="ml-auto text-emerald-600 font-black text-base">Voir en détail →</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10 pb-4">
            <button onClick={() => goToPage(page - 1)} disabled={page === 1}
              className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95">
              ← Précédent
            </button>
            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => goToPage(n)}
                  className={`w-11 h-11 rounded-2xl font-black text-base transition-all active:scale-95 ${
                    n === page ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-emerald-300'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}
              className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95">
              Suivant →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}