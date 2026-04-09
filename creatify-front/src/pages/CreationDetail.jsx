import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCreationById, addReaction } from '../api/index'
import BottomNav from '../components/BottomNav'

const REACTION_TYPES = [
  { type: 'COEUR', emoji: '❤️', label: "J'adore" },
  { type: 'ETOILE', emoji: '⭐', label: 'Bravo !' },
  { type: 'APPLAUDISSEMENT', emoji: '👏', label: 'Super !' },
]

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
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

  const countReaction = (type) =>
    (creation?.reactions || []).filter(r => r.type === type).length

  const handleReaction = async (type) => {
    if (reacted[type]) return
    await addReaction(id, { type })
    setCreation(prev => ({
      ...prev,
      reactions: [...(prev.reactions || []), { type }]
    }))
    setReacted(prev => ({ ...prev, [type]: true }))
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-20 gap-5">
      <div className="text-7xl animate-bounce">🎨</div>
      <p className="text-gray-600 text-xl font-bold">Chargement...</p>
      <BottomNav />
    </div>
  )

  if (!creation) return null

  const auteur = creation.estAnonyme || !creation.pseudo ? 'Anonyme' : creation.pseudo
  const initiale = auteur === 'Anonyme' ? '?' : auteur[0].toUpperCase()
  const estActivite = creation.estActivite === true
  const aMateriaux = creation.materiaux?.length > 0
  const aEtapes = creation.etapes?.length > 0

  // ══════════════════════════════════════════════════════
  // MODE ACTIVITÉ COMPLÈTE (estActivite = true)
  // ══════════════════════════════════════════════════════
  if (estActivite) return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between sticky top-0 z-40">
        <span className="font-black text-3xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-gray-900">Creat</span>
          <span className="text-orange-500">S4</span>
          <span className="text-emerald-600">pY</span>
        </span>
        <button onClick={() => navigate(-1)} className="text-base font-semibold text-gray-500">← Retour</button>
      </nav>

      <div className="max-w-xl mx-auto px-5 py-8">

        {/* Badge communauté */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 text-xl font-black flex items-center justify-center flex-shrink-0">
            {initiale}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1 rounded-full">
                🌟 Activité créée par {auteur}
              </span>
              {creation.typeCreation && (
                <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full">
                  {creation.typeCreation}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">{formatDate(creation.dateCreation)}</p>
          </div>
        </div>

        {/* Header activité — comme ActiviteDetail */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden mb-5">
          {/* Image ou icône */}
          <div className="h-52 bg-emerald-50 flex items-center justify-center overflow-hidden">
            {creation.imageUrl
              ? <img src={creation.imageUrl} alt={creation.titre} className="w-full h-full object-cover" />
              : <span className="text-8xl">🎨</span>
            }
          </div>

          <div className="p-6">
            <h1 className="font-black text-3xl text-gray-900 mb-3 leading-tight">
              {creation.titre}
            </h1>

            {creation.description && (
              <p className="text-gray-500 text-lg leading-relaxed mb-4">
                {creation.description}
              </p>
            )}

            {/* Temps + difficulté */}
            <div className="flex items-center gap-3 flex-wrap">
              {creation.dureeMinutes && (
                <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2">
                  <span className="text-2xl">⏱️</span>
                  <span className="text-lg font-black text-gray-800">
                    {formatDuree(creation.dureeMinutes)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-emerald-100 rounded-2xl px-4 py-2">
                <span className="text-2xl">😊</span>
                <span className="text-lg font-black text-emerald-700">Facile</span>
              </div>
              {creation.ages?.length > 0 && (
                <div className="flex items-center gap-2 bg-blue-100 rounded-2xl px-4 py-2">
                  <span className="text-2xl">👥</span>
                  <span className="text-base font-bold text-blue-700">
                    {creation.ages.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Réactions */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {REACTION_TYPES.map(r => (
            <button
              key={r.type}
              onClick={() => handleReaction(r.type)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 text-base font-bold transition-all duration-150 active:scale-95 ${
                reacted[r.type]
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400'
              }`}
            >
              <span className="text-2xl">{r.emoji}</span>
              {countReaction(r.type) > 0 && (
                <span className="font-black">{countReaction(r.type)}</span>
              )}
            </button>
          ))}
        </div>

        {/* Matériaux */}
        {aMateriaux && (
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-5">
            <h2 className="font-black text-gray-900 text-2xl mb-4">🛒 Ce qu'il te faut</h2>
            <ul className="flex flex-col gap-3">
              {creation.materiaux.map((m, i) => (
                <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 text-sm font-black flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Étapes */}
        {aEtapes && (
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-5">
            <h2 className="font-black text-gray-900 text-2xl mb-5">📋 Les étapes</h2>
            <div className="flex flex-col gap-3">
              {creation.etapes.map((etape, i) => (
                <div
                  key={i}
                  onClick={() => setEtapeActive(i)}
                  className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-150 ${
                    etapeActive === i
                      ? 'bg-emerald-50 border-2 border-emerald-400'
                      : 'border-2 border-gray-100 hover:border-emerald-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-2xl text-base font-black flex items-center justify-center flex-shrink-0 transition-colors ${
                    etapeActive === i ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {i + 1}
                  </span>
                  <p className={`text-lg leading-relaxed transition-colors ${
                    etapeActive === i ? 'text-emerald-900 font-bold' : 'text-gray-700'
                  }`}>
                    {etape}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA partager sa version */}
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
      <BottomNav />
    </div>
  )

  // ══════════════════════════════════════════════════════
  // MODE SIMPLE (photo + titre uniquement)
  // ══════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      <nav className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between sticky top-0 z-40">
        <span className="font-black text-3xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-gray-900">Creat</span>
          <span className="text-orange-500">S4</span>
          <span className="text-emerald-600">pY</span>
        </span>
        <button onClick={() => navigate('/galerie')} className="text-base font-semibold text-gray-500">← Galerie</button>
      </nav>

      <div className="max-w-xl mx-auto px-5 py-8">

        {/* Grande image */}
        <div className="rounded-3xl overflow-hidden mb-6 bg-emerald-50 shadow-sm">
          {creation.imageUrl
            ? <img src={creation.imageUrl} alt={creation.titre} className="w-full object-cover" style={{ maxHeight: '420px' }} />
            : <div className="h-64 flex items-center justify-center text-8xl">🎨</div>
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
      <BottomNav />
    </div>
  )
}