import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const ages = [
  { value: 'enfant', label: '6 – 11 ans', icon: '🧒' },
  { value: 'ado', label: '12 – 17 ans', icon: '🧑' },
  { value: 'adulte', label: '18 ans et +', icon: '🧑‍🦱' },
]

const gouts = [
  { value: 'creer', label: 'Créer', icon: '🎨' },
  { value: 'bijoux', label: 'Bijoux', icon: '📿' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'couleurs', label: 'Couleurs', icon: '🖌️' },
  { value: 'construire', label: 'Construire', icon: '🪚' },
  { value: 'calme', label: 'Calme', icon: '🕯️' },
  { value: 'recup', label: 'Récupération', icon: '♻️' },
  { value: 'offrir', label: 'Offrir', icon: '🎁' },
]

const motrics = [
  { value: 'fine', label: 'Petits gestes', icon: '✍️' },
  { value: 'large', label: 'Grands gestes', icon: '👐' },
  { value: 'aide', label: "Avec de l'aide", icon: '🤝' },
  { value: 'sais_pas', label: 'Je ne sais pas', icon: '🤷' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(location.state?.startStep || 0)
  const [age, setAge] = useState(null)
  const [selectedGouts, setSelectedGouts] = useState([])
  const [motric, setMotric] = useState(null)

  const toggleGout = (value) => {
    setSelectedGouts(prev =>
      prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
    )
  }

  const handleSubmit = () => {
    navigate('/recommandations', { state: { age, gouts: selectedGouts, motric } })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
        <span className="font-black text-3xl tracking-tight">
          <span className="text-gray-900">Creat</span>
          <span className="text-orange-500">S4</span>
          <span className="text-emerald-600">pY</span>
        </span>
        <span className="text-sm bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-semibold">
          Gratuit · Sans inscription
        </span>
      </nav>

      {/* ══════════════════════════
          ÉTAPE 0 — ACCUEIL
      ══════════════════════════ */}
      {step === 0 && (
        <div className="max-w-lg mx-auto px-5 pt-8">

          {/* Hero coloré */}
          <div className="bg-emerald-600 rounded-3xl px-7 py-10 mb-6 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-orange-400/20" />
            <div className="relative">
              <h1 className="text-white font-black text-4xl mb-4 leading-tight">
                Bienvenue sur<br />
                <span className="text-white">Creat</span>
                <span className="text-orange-300">S4</span>
                <span className="text-white">pY</span> 🎨
              </h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Des activités créatives faites <strong>pour toi</strong>.
                Rien à écrire, rien à retenir.
              </p>
            </div>
          </div>

          {/* Explication claire */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-5">
            <p className="text-gray-900 text-xl font-black mb-5">Comment ça marche ?</p>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl flex-shrink-0">1️⃣</div>
                <p className="text-gray-800 text-lg font-semibold leading-snug">Tu réponds à 3 questions</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl flex-shrink-0">2️⃣</div>
                <p className="text-gray-800 text-lg font-semibold leading-snug">On te propose des activités</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl flex-shrink-0">3️⃣</div>
                <p className="text-gray-800 text-lg font-semibold leading-snug">Tu crées et tu partages si tu veux !</p>
              </div>
            </div>
          </div>

          {/* Message rassurant */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 mb-7 flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">💛</span>
            <p className="text-amber-900 text-base leading-relaxed font-medium">
              Pas besoin de compte. Tu peux recommencer autant de fois que tu veux.
            </p>
          </div>

          {/* CTA principal — très grand et visible */}
          <button
            onClick={() => setStep(1)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-2xl py-7 rounded-3xl shadow-lg transition-all duration-150 mb-4"
          >
            🚀 Commencer !
          </button>

          <button
            onClick={() => navigate('/galerie')}
            className="w-full bg-white border-2 border-gray-200 hover:border-emerald-400 text-gray-700 font-bold text-lg py-5 rounded-3xl transition-all duration-150"
          >
            🎨 Voir les créations
          </button>
        </div>
      )}

      {/* ══════════════════════════
          ÉTAPE 1 — ÂGE
      ══════════════════════════ */}
      {step === 1 && (
        <div className="max-w-lg mx-auto px-5 pt-8">

          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors"
          >
            ← Retour
          </button>

          {/* Barre de progression */}
          <div className="flex gap-2 mb-8">
            <div className="flex-1 h-4 rounded-full bg-emerald-500" />
            <div className="flex-1 h-4 rounded-full bg-gray-200" />
            <div className="flex-1 h-4 rounded-full bg-gray-200" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Tu as quel âge ? 🎂
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Appuie sur ton âge.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {ages.map(a => (
              <button
                key={a.value}
                onClick={() => setAge(a.value)}
                className={`flex items-center gap-5 px-6 py-6 rounded-3xl text-left transition-all duration-150 active:scale-98 ${
                  age === a.value
                    ? 'bg-emerald-500 shadow-lg'
                    : 'bg-white border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <span className="text-5xl">{a.icon}</span>
                <p className={`text-2xl font-black ${age === a.value ? 'text-white' : 'text-gray-900'}`}>
                  {a.label}
                </p>
                {age === a.value && (
                  <span className="ml-auto text-white text-3xl font-black">✓</span>
                )}
              </button>
            ))}
          </div>

          <button
            disabled={!age}
            onClick={() => setStep(2)}
            className="w-full bg-emerald-600 text-white font-black text-2xl py-7 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 active:scale-95 transition-all duration-150"
          >
            Suivant →
          </button>
        </div>
      )}

      {/* ══════════════════════════
          ÉTAPE 2 — GOÛTS
      ══════════════════════════ */}
      {step === 2 && (
        <div className="max-w-lg mx-auto px-5 pt-8">

          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors"
          >
            ← Retour
          </button>

          <div className="flex gap-2 mb-8">
            <div className="flex-1 h-4 rounded-full bg-emerald-500" />
            <div className="flex-1 h-4 rounded-full bg-emerald-500" />
            <div className="flex-1 h-4 rounded-full bg-gray-200" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Tu aimes quoi ? 😊
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Tu peux choisir plusieurs réponses.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {gouts.map(g => (
              <button
                key={g.value}
                onClick={() => toggleGout(g.value)}
                className={`flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-3xl transition-all duration-150 active:scale-95 ${
                  selectedGouts.includes(g.value)
                    ? 'bg-emerald-500 shadow-lg'
                    : 'bg-white border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <span className="text-5xl">{g.icon}</span>
                <span className={`text-base font-black text-center leading-tight ${
                  selectedGouts.includes(g.value) ? 'text-white' : 'text-gray-800'
                }`}>
                  {g.label}
                </span>
                {selectedGouts.includes(g.value) && (
                  <span className="text-white text-xl font-black">✓</span>
                )}
              </button>
            ))}
          </div>

          <button
            disabled={selectedGouts.length === 0}
            onClick={() => setStep(3)}
            className="w-full bg-emerald-600 text-white font-black text-2xl py-7 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 active:scale-95 transition-all duration-150"
          >
            Suivant →
          </button>
        </div>
      )}

      {/* ══════════════════════════
          ÉTAPE 3 — MOTRICITÉ
      ══════════════════════════ */}
      {step === 3 && (
        <div className="max-w-lg mx-auto px-5 pt-8">

          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors"
          >
            ← Retour
          </button>

          <div className="flex gap-2 mb-8">
            <div className="flex-1 h-4 rounded-full bg-emerald-500" />
            <div className="flex-1 h-4 rounded-full bg-emerald-500" />
            <div className="flex-1 h-4 rounded-full bg-emerald-500" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Comment tu utilises tes mains ? 🖐️
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Il n'y a pas de mauvaise réponse.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {motrics.map(m => (
              <button
                key={m.value}
                onClick={() => setMotric(m.value)}
                className={`flex items-center gap-5 px-6 py-6 rounded-3xl text-left transition-all duration-150 active:scale-98 ${
                  motric === m.value
                    ? 'bg-emerald-500 shadow-lg'
                    : 'bg-white border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <span className="text-5xl flex-shrink-0">{m.icon}</span>
                <p className={`text-xl font-black ${motric === m.value ? 'text-white' : 'text-gray-900'}`}>
                  {m.label}
                </p>
                {motric === m.value && (
                  <span className="ml-auto text-white text-3xl font-black">✓</span>
                )}
              </button>
            ))}
          </div>

          <button
            disabled={!motric}
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white font-black text-2xl py-7 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 hover:bg-orange-600 active:scale-95 transition-all duration-150"
          >
            ✨ Voir mes activités !
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  )
}