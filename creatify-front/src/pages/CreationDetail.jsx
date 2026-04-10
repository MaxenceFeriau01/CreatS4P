import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCreationById, addReaction } from '../api/index'
import TopNav from '../components/TopNav'

const REACTION_TYPES = [
  { type: 'COEUR', emoji: '❤️', label: "J'adore" },
  { type: 'ETOILE', emoji: '⭐', label: 'Bravo !' },
  { type: 'APPLAUDISSEMENT', emoji: '👏', label: 'Super !' },
]

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatDuree(minutes) {
  if (!minutes) return null
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m}` : `${h}h`
}

export default function CreationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creation, setCreation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reacted, setReacted] = useState({})
  const [etapeActive, setEtapeActive] = useState(0)

  useEffect(() => {
    getCreationById(id)
      .then(res => setCreation(res.data))
      .catch(() => navigate('/galerie'))
      .finally(() => setLoading(false))
  }, [id])

  const handleReaction = async (type) => {
    if (reacted[type]) return
    try {
      await addReaction(id, { type })
      setCreation(prev => ({
        ...prev,
        reactions: [...(prev.reactions || []), { type }]
      }))
      setReacted(prev => ({ ...prev, [type]: true }))
    } catch (e) {
      console.error(e)
    }
  }

  const countReaction = (type) =>
    (creation?.reactions || []).filter(r => r.type === type).length

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🎨</div>
        <p className="text-xl font-bold text-gray-600">Chargement...</p>
      </div>
    </div>
  )

  if (!creation) return null

  const auteur = creation.estAnonyme ? 'Anonyme' : (creation.pseudo || 'Anonyme')
  const initiale = auteur === 'Anonyme' ? '?' : auteur[0].toUpperCase()
  const estActivite = creation.estActivite === true
  const aMateriaux = creation.materiaux?.filter(m => m.trim())?.length > 0
  const aEtapes = creation.etapes?.filter(e => e.trim())?.length > 0

  // ══════════════════════════════════════════════════════
  // MODE ACTIVITÉ COMPLÈTE — même style qu'ActiviteDetail
  // ══════════════════════════════════════════════════════
  if (estActivite) return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="max-w-xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 text-sm mb-4 flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          ← Retour
        </button>

        {/* Badge auteur — seule différence avec ActiviteDetail */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">
            🌟 Activité créée par {auteur}
          </span>
          {creation.typeCreation && (
            <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
              {creation.typeCreation}
            </span>
          )}
        </div>

        {/* Header — identique à ActiviteDetail */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          <div className="flex items-center justify-center bg-amber-50">
            {creation.imageUrl
              ? <img src={creation.imageUrl} alt={creation.titre} className="w-full object-contain" />
              : <div className="h-36 flex items-center justify-center w-full"><span className="text-7xl">🎨</span></div>
            }
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-black text-2xl text-gray-900">{creation.titre}</h1>
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700">
                FACILE
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">{creation.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {creation.dureeMinutes && <span>⏱ {formatDuree(creation.dureeMinutes)}</span>}
              {creation.ages?.length > 0 && <span>👥 {creation.ages.join(', ')}</span>}
            </div>
          </div>
        </div>

        {/* Réactions */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {REACTION_TYPES.map(r => (
            <button
              key={r.type}
              onClick={() => handleReaction(r.type)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-bold transition-all active:scale-95 ${
                reacted[r.type]
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300'
              }`}
            >
              <span>{r.emoji}</span>
              <span>{r.label}</span>
              {countReaction(r.type) > 0 && <span className="font-black">{countReaction(r.type)}</span>}
            </button>
          ))}
        </div>

        {/* Matériaux — identique à ActiviteDetail */}
        {aMateriaux && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <h2 className="font-bold text-gray-900 text-lg mb-3">🛒 Ce qu'il te faut</h2>
            <ul className="flex flex-col gap-2">
              {[...new Set(creation.materiaux.filter(m => m.trim()))].map((m, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-medium flex-shrink-0">✓</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Étapes — identique à ActiviteDetail */}
        {aEtapes && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <h2 className="font-bold text-gray-900 text-lg mb-4">📋 Les étapes</h2>
            <div className="flex flex-col gap-2">
              {creation.etapes.filter(e => e.trim()).map((etape, i) => (
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

    </div>
  )

  // ══════════════════════════════════════════════════════
  // MODE SIMPLE (photo uniquement)
  // ══════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="max-w-xl mx-auto px-5 py-8">

        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          {creation.imageUrl
            ? <img src={creation.imageUrl} alt={creation.titre} className="w-full object-contain" />
            : <div className="h-48 flex items-center justify-center text-7xl">🎨</div>
          }
        </div>

        {/* Auteur + date */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 text-2xl font-black flex items-center justify-center flex-shrink-0">
            {initiale}
          </div>
          <div>
            <p className="text-lg font-black text-gray-900">{auteur}</p>
            <p className="text-base text-gray-400">{formatDate(creation.dateCreation)}</p>
          </div>
          {creation.typeCreation && (
            <span className="ml-auto bg-orange-100 text-orange-700 text-base font-bold px-4 py-1.5 rounded-full">
              {creation.typeCreation}
            </span>
          )}
        </div>

        {/* Titre */}
        <h1 className="font-black text-3xl text-gray-900 mb-4 leading-tight">{creation.titre}</h1>

        {/* Réactions */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {REACTION_TYPES.map(r => (
            <button
              key={r.type}
              onClick={() => handleReaction(r.type)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 text-base font-bold transition-all active:scale-95 ${
                reacted[r.type]
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400'
              }`}
            >
              <span className="text-2xl">{r.emoji}</span>
              {countReaction(r.type) > 0 && <span>{countReaction(r.type)}</span>}
            </button>
          ))}
        </div>

        {/* Description */}
        {creation.description && (
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-5">
            <p className="text-xl font-black text-gray-900 mb-3">💬 Ce que dit {auteur}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{creation.description}</p>
          </div>
        )}

        {/* Envie de faire pareil ? */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 mb-5">
          <p className="text-2xl font-black text-emerald-900 mb-2">🛠️ Tu veux faire pareil ?</p>
          <p className="text-emerald-800 text-lg leading-relaxed mb-5">
            Cherche une activité similaire pour avoir les étapes et les matériaux !
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-emerald-600 text-white font-black text-xl py-5 rounded-2xl hover:bg-emerald-700 active:scale-95 transition-all"
          >
            🔍 Trouver une activité similaire
          </button>
        </div>

        {/* Partager */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-6 mb-5">
          <p className="text-2xl font-black text-orange-900 mb-2">📸 Tu l'as fait ?</p>
          <p className="text-orange-800 text-lg leading-relaxed mb-5">
            Montre ta version à la communauté !
          </p>
          <button
            onClick={() => navigate('/partager')}
            className="w-full bg-orange-500 text-white font-black text-xl py-5 rounded-2xl hover:bg-orange-600 active:scale-95 transition-all"
          >
            🎉 Partager ma version
          </button>
        </div>

        <button
          onClick={() => navigate('/galerie')}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-5 rounded-3xl hover:bg-gray-50 transition-colors"
        >
          ← Retour à la galerie
        </button>
      </div>

    </div>
  )
}