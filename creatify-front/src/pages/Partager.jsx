import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postCreation } from '../api/index'

const TYPES = [
  { value: 'Bijou', label: 'Bijou / perles', icon: '📿' },
  { value: 'Collage', label: 'Collage', icon: '🌸' },
  { value: 'Bois', label: 'Bois', icon: '🪑' },
  { value: 'Argile', label: 'Argile', icon: '🕯️' },
  { value: 'Peinture', label: 'Peinture', icon: '🎨' },
  { value: 'Autre', label: 'Autre', icon: '✂️' },
]

export default function Partager() {
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [anonyme, setAnonyme] = useState(false)
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)

  const handleSubmit = async () => {
    if (!titre || !type) return
    setLoading(true)
    try {
      await postCreation({
        titre,
        description,
        pseudo: anonyme ? null : pseudo,
        typeCreation: type,
        estAnonyme: anonyme,
      })
      setSucces(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (succes) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="font-black text-2xl text-gray-900 mb-2">Bravo !</h2>
      <p className="text-gray-400 text-sm mb-6 text-center">Ta création a été partagée avec la communauté.</p>
      <button
        onClick={() => navigate('/galerie')}
        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 mb-3 w-full max-w-xs"
      >
        Voir la galerie
      </button>
      <button
        onClick={() => navigate('/')}
        className="bg-white border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium w-full max-w-xs"
      >
        Retour à l'accueil
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span
          className="font-black text-2xl text-emerald-800 cursor-pointer"
          onClick={() => navigate('/')}
        >
          creat<span className="text-orange-500">ify</span>
        </span>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">Sans inscription</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-8">
        <h2 className="font-black text-2xl text-gray-900 mb-1">Partage ta création</h2>
        <p className="text-gray-400 text-sm mb-6">Une photo, un titre, et c'est parti. Rien à installer.</p>

        {/* Type */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Quel type de création ?</p>
          <div className="grid grid-cols-3 gap-2">
            {TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`border-2 rounded-xl py-3 text-center transition-all ${type === t.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200'}`}
              >
                <div className="text-2xl mb-1">{t.icon}</div>
                <div className="text-xs font-medium text-gray-700">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Titre & description */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Dis-nous ce que c'est</p>
          <input
            type="text"
            placeholder="Donne un titre à ta création"
            value={titre}
            onChange={e => setTitre(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-emerald-400"
          />
          <textarea
            placeholder="Raconte comment tu l'as fait (pas obligatoire)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Pseudo */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Comment tu t'appelles ?</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ton prénom ou un pseudo"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              disabled={anonyme}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 disabled:bg-gray-50 disabled:text-gray-300"
            />
            <button
              onClick={() => setAnonyme(!anonyme)}
              className={`px-4 py-2 rounded-xl text-sm border transition-all ${anonyme ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-gray-200 text-gray-500'}`}
            >
              Anonyme
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!titre || !type || loading}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-medium text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 transition-colors mb-3"
        >
          {loading ? 'Envoi...' : 'Partager ma création 🎉'}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Pas de compte requis · Aucune donnée personnelle conservée
        </p>
      </div>
    </div>
  )
}