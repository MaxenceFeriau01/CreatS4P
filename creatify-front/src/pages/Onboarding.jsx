import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ages = [
  { value: 'enfant', label: '6 – 11 ans', sub: 'Enfant', icon: '🧒' },
  { value: 'ado', label: '12 – 17 ans', sub: 'Adolescent', icon: '🧑' },
  { value: 'adulte', label: '18 ans et +', sub: 'Adulte', icon: '🧑‍🦱' },
]

const gouts = [
  { value: 'creer', label: 'Créer avec mes mains', sub: 'Bricoler, coller, fabriquer', icon: '🎨' },
  { value: 'bijoux', label: 'Bijoux & perles', sub: 'Bracelets, colliers', icon: '📿' },
  { value: 'nature', label: 'La nature', sub: 'Plantes, fleurs, jardinage', icon: '🌿' },
  { value: 'couleurs', label: 'Les couleurs', sub: 'Peindre, colorier', icon: '🖌️' },
  { value: 'construire', label: 'Construire', sub: 'Bois, assemblage', icon: '🪚' },
  { value: 'calme', label: 'Activités calmes', sub: 'Argile, modelage', icon: '🕯️' },
  { value: 'recup', label: 'La récup', sub: 'Transformer des objets', icon: '♻️' },
  { value: 'offrir', label: 'Offrir', sub: 'Faire des cadeaux', icon: '🎁' },
]

const motrics = [
  { value: 'fine', label: 'Avec précision', sub: 'Petits gestes, détails', icon: '✍️' },
  { value: 'large', label: 'Grands gestes', sub: 'Mouvements amples', icon: '👐' },
  { value: 'aide', label: 'Avec de l\'aide', sub: 'Accompagné(e)', icon: '🤝' },
  { value: 'sais_pas', label: 'Je ne sais pas', sub: 'On verra ensemble', icon: '🤷' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [age, setAge] = useState(null)
  const [selectedGouts, setSelectedGouts] = useState([])
  const [motric, setMotric] = useState(null)

  const toggleGout = (value) => {
    setSelectedGouts(prev =>
      prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
    )
  }

  const handleSubmit = () => {
    navigate('/recommandations', {
      state: { age, gouts: selectedGouts, motric }
    })
  }

  const progress = (step / 3) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="font-black text-2xl text-emerald-800">creat<span className="text-orange-500">ify</span></span>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">Sans inscription</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">

          {/* Progress */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Étape 1 — Age */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Bonjour ! Tu as <span className="text-emerald-600">quel âge</span> ?</h1>
              <p className="text-gray-500 text-sm mb-8">Pas besoin de compte. On veut juste te proposer des activités faites pour toi.</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {ages.map(a => (
                  <button
                    key={a.value}
                    onClick={() => setAge(a.value)}
                    className={`border-2 rounded-xl p-4 text-center transition-all cursor-pointer ${age === a.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white hover:border-emerald-300'}`}
                  >
                    <div className="text-3xl mb-2">{a.icon}</div>
                    <div className="text-sm font-medium text-emerald-900">{a.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{a.sub}</div>
                  </button>
                ))}
              </div>
              <button
                disabled={!age}
                onClick={() => setStep(2)}
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 transition-colors"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Étape 2 — Goûts */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Retour</button>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Qu'est-ce que tu <span className="text-emerald-600">aimes</span> faire ?</h1>
              <p className="text-gray-500 text-sm mb-8">Choisis autant que tu veux.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {gouts.map(g => (
                  <button
                    key={g.value}
                    onClick={() => toggleGout(g.value)}
                    className={`border-2 rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer text-left ${selectedGouts.includes(g.value) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white hover:border-emerald-300'}`}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{g.label}</div>
                      <div className="text-xs text-gray-400">{g.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                disabled={selectedGouts.length === 0}
                onClick={() => setStep(3)}
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 transition-colors"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Étape 3 — Motricité */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Retour</button>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Comment tu <span className="text-emerald-600">utilises</span> tes mains ?</h1>
              <p className="text-gray-500 text-sm mb-8">Pas de bonne ou mauvaise réponse.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {motrics.map(m => (
                  <button
                    key={m.value}
                    onClick={() => setMotric(m.value)}
                    className={`border-2 rounded-xl p-4 text-center transition-all cursor-pointer ${motric === m.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white hover:border-emerald-300'}`}
                  >
                    <div className="text-3xl mb-2">{m.icon}</div>
                    <div className="text-sm font-medium">{m.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{m.sub}</div>
                  </button>
                ))}
              </div>
              <button
                disabled={!motric}
                onClick={handleSubmit}
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 transition-colors"
              >
                Voir mes activités →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}