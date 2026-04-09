import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { postCreation, uploadImage } from '../api/index'
import BottomNav from '../components/BottomNav'

const TYPES = [
  { value: 'Bijou', label: 'Bijou / perles', icon: '📿' },
  { value: 'Collage', label: 'Collage', icon: '🌸' },
  { value: 'Bois', label: 'Bois', icon: '🪑' },
  { value: 'Argile', label: 'Argile', icon: '🕯️' },
  { value: 'Peinture', label: 'Peinture', icon: '🎨' },
  { value: 'Nature', label: 'Nature', icon: '🌿' },
  { value: 'Récup', label: 'Récupération', icon: '♻️' },
  { value: 'Autre', label: 'Autre', icon: '✂️' },
]

const AGES = [
  { value: 'enfant', label: '6 – 11 ans', icon: '🧒' },
  { value: 'ado', label: '12 – 17 ans', icon: '🧑' },
  { value: 'adulte', label: '18 ans et +', icon: '🧑‍🦱' },
]

const DUREES = [
  { value: 30, label: '30 min' },
  { value: 60, label: '1 heure' },
  { value: 90, label: '1h30' },
  { value: 120, label: '2 heures' },
  { value: 180, label: '3 heures +' },
]

export default function Partager() {
  const navigate = useNavigate()
  const fileInputRef = useRef()

  // Mode
  const [mode, setMode] = useState(null) // 'simple' | 'complet'

  // Commun
  const [type, setType] = useState(null)
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [anonyme, setAnonyme] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [qrUrl, setQrUrl] = useState('')
  const [showQR, setShowQR] = useState(false)

  // Mode complet uniquement
  const [materiaux, setMateriaux] = useState([''])
  const [etapes, setEtapes] = useState([''])
  const [agesSelectionnes, setAgesSelectionnes] = useState([])
  const [duree, setDuree] = useState(null)

  useEffect(() => {
    setQrUrl(`${window.location.protocol}//${window.location.hostname}:5173/partager`)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setShowQR(false)
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setImageFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Matériaux
  const updateMateriau = (i, val) => setMateriaux(prev => prev.map((m, idx) => idx === i ? val : m))
  const addMateriau = () => setMateriaux(prev => [...prev, ''])
  const removeMateriau = (i) => setMateriaux(prev => prev.filter((_, idx) => idx !== i))

  // Étapes
  const updateEtape = (i, val) => setEtapes(prev => prev.map((e, idx) => idx === i ? val : e))
  const addEtape = () => setEtapes(prev => [...prev, ''])
  const removeEtape = (i) => setEtapes(prev => prev.filter((_, idx) => idx !== i))

  // Ages
  const toggleAge = (val) => setAgesSelectionnes(prev =>
    prev.includes(val) ? prev.filter(a => a !== val) : [...prev, val]
  )

  const handleSubmit = async () => {
    if (!titre || !type) return
    setLoading(true)
    try {
      let imageUrl = null
      if (imageFile) {
        const res = await uploadImage(imageFile)
        imageUrl = res.data
      }

      const payload = {
        titre,
        description,
        pseudo: anonyme ? null : pseudo,
        typeCreation: type,
        estAnonyme: anonyme,
        imageUrl,
        estActivite: mode === 'complet',
      }

      if (mode === 'complet') {
        payload.materiaux = materiaux.filter(m => m.trim() !== '')
        payload.etapes = etapes.filter(e => e.trim() !== '')
        payload.ages = agesSelectionnes
        payload.dureeMinutes = duree
      }

      await postCreation(payload)
      setSucces(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // ── SUCCÈS ────────────────────────────────────────────────────────
  if (succes) return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col items-center justify-center px-5">
      <div className="text-7xl mb-5">🎉</div>
      <h2 className="font-black text-3xl text-gray-900 mb-3 text-center">Bravo !</h2>
      <p className="text-gray-500 text-lg mb-3 text-center leading-relaxed px-4">
        Ta création a été partagée avec la communauté.
      </p>
      {mode === 'complet' && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-5 py-4 mb-7 mx-4">
          <p className="text-emerald-800 text-base font-semibold text-center">
            ⭐ Elle apparaîtra aussi dans les suggestions d'activités !
          </p>
        </div>
      )}
      <button
        onClick={() => navigate('/galerie')}
        className="w-full max-w-xs bg-emerald-600 text-white font-black text-xl py-5 rounded-3xl mb-3"
      >
        Voir la galerie
      </button>
      <button
        onClick={() => navigate('/')}
        className="w-full max-w-xs bg-white border-2 border-gray-200 text-gray-600 font-bold text-lg py-4 rounded-3xl"
      >
        Retour à l'accueil
      </button>
      <BottomNav />
    </div>
  )

  // ── CHOIX DU MODE ─────────────────────────────────────────────────
  if (mode === null) return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <nav className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
        <span className="font-black text-3xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-gray-900">Creat</span>
          <span className="text-orange-500">S4</span>
          <span className="text-emerald-600">pY</span>
        </span>
        <button onClick={() => navigate('/galerie')} className="text-base font-semibold text-gray-500">← Galerie</button>
      </nav>

      <div className="max-w-lg mx-auto px-5 pt-10">
        <h1 className="font-black text-3xl text-gray-900 mb-3">
          Je veux partager... 🎨
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Tout le monde peut partager sa créativité !
        </p>

        {/* Mode simple */}
        <button
          onClick={() => setMode('simple')}
          className="w-full bg-white border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 rounded-3xl p-6 text-left mb-4 transition-all duration-150 active:scale-98"
        >
          <div className="text-5xl mb-3">📸</div>
          <p className="font-black text-xl text-gray-900 mb-2">
            Montrer ma création
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            Une photo et un titre. Simple et rapide !
          </p>
        </button>

        {/* Mode complet */}
        <button
          onClick={() => setMode('complet')}
          className="w-full bg-white border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-3xl p-6 text-left mb-4 transition-all duration-150 active:scale-98"
        >
          <div className="text-5xl mb-3">🛠️</div>
          <p className="font-black text-xl text-gray-900 mb-2">
            Créer une activité à partager
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            Photo + matériaux + étapes. Les autres pourront reproduire ton activité !
          </p>
        </button>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 mt-2">
          <p className="text-amber-900 text-base font-medium flex items-start gap-2">
            <span className="text-2xl flex-shrink-0">💛</span>
            Si tu ajoutes les étapes, ton activité sera suggérée à d'autres personnes !
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  )

  // ── FORMULAIRE (simple ou complet) ───────────────────────────────
  const canSubmit = titre && type && (mode === 'simple' || (
    materiaux.some(m => m.trim()) &&
    etapes.some(e => e.trim())
  ))

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <nav className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between sticky top-0 z-40">
        <span className="font-black text-3xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-gray-900">Creat</span>
          <span className="text-orange-500">S4</span>
          <span className="text-emerald-600">pY</span>
        </span>
        <button onClick={() => setMode(null)} className="text-base font-semibold text-gray-500">← Retour</button>
      </nav>

      <div className="max-w-lg mx-auto px-5 pt-7 pb-10">

        {/* Titre du mode */}
        <div className={`rounded-3xl px-6 py-5 mb-7 ${mode === 'complet' ? 'bg-emerald-600' : 'bg-orange-500'}`}>
          <p className="text-white font-black text-2xl mb-1">
            {mode === 'complet' ? '🛠️ Créer une activité' : '📸 Partager ma création'}
          </p>
          <p className="text-white/80 text-base">
            {mode === 'complet'
              ? 'Elle sera suggérée à d\'autres jeunes !'
              : 'Montre ce que tu as fait !'}
          </p>
        </div>

        {/* ── PHOTO ── */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
          <p className="text-lg font-black text-gray-900 mb-4">📷 La photo</p>
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Aperçu" className="w-full h-56 object-cover rounded-2xl" />
              <button
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-500 border-2 border-gray-200 hover:bg-red-50 hover:text-red-500 text-lg shadow"
              >✕</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all"
              >
                <div className="text-5xl mb-3">💻</div>
                <p className="text-base font-bold text-gray-700 mb-1">Depuis mon ordinateur</p>
                <p className="text-sm text-gray-400">Clique ou glisse une photo ici</p>
              </div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all"
              >
                <div className="text-5xl mb-2">📱</div>
                <p className="text-base font-bold text-gray-700">Depuis mon téléphone</p>
                <p className="text-sm text-gray-400">Scanner le QR code</p>
              </button>
              {showQR && (
                <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`}
                    alt="QR Code"
                    className="rounded-xl mx-auto mb-3"
                    width={180} height={180}
                  />
                  <p className="text-sm text-gray-500">Scanne ce code avec ton téléphone</p>
                </div>
              )}
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        {/* ── TYPE ── */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
          <p className="text-lg font-black text-gray-900 mb-4">🏷️ Quel type de création ?</p>
          <div className="grid grid-cols-2 gap-3">
            {TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all duration-150 active:scale-95 ${
                  type === t.value
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
                }`}
              >
                <span className="text-3xl">{t.icon}</span>
                <span className={`text-base font-bold ${type === t.value ? 'text-emerald-800' : 'text-gray-700'}`}>
                  {t.label}
                </span>
                {type === t.value && <span className="ml-auto text-emerald-500 font-black">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ── TITRE & DESCRIPTION ── */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
          <p className="text-lg font-black text-gray-900 mb-4">✏️ Décris ta création</p>
          <input
            type="text"
            placeholder="Donne un titre à ta création"
            value={titre}
            onChange={e => setTitre(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-base mb-3 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <textarea
            placeholder={mode === 'complet'
              ? "Décris ton activité en quelques mots... (pas obligatoire)"
              : "Raconte comment tu l'as fait... (pas obligatoire)"}
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-base resize-none focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* ── MODE COMPLET : MATÉRIAUX ── */}
        {mode === 'complet' && (
          <>
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
              <p className="text-lg font-black text-gray-900 mb-2">🛒 Ce qu'il faut</p>
              <p className="text-gray-500 text-base mb-4">Liste les matériaux nécessaires.</p>
              <div className="flex flex-col gap-3">
                {materiaux.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center flex-shrink-0 text-sm">
                      {i + 1}
                    </div>
                    <input
                      type="text"
                      placeholder={`Matériau ${i + 1} (ex: colle, ciseaux...)`}
                      value={m}
                      onChange={e => updateMateriau(i, e.target.value)}
                      className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-3 text-base focus:outline-none focus:border-emerald-400"
                    />
                    {materiaux.length > 1 && (
                      <button onClick={() => removeMateriau(i)} className="text-gray-300 hover:text-red-400 text-xl font-black w-8">✕</button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addMateriau}
                className="mt-3 w-full border-2 border-dashed border-emerald-200 text-emerald-600 font-bold text-base py-3 rounded-2xl hover:bg-emerald-50 transition-colors"
              >
                + Ajouter un matériau
              </button>
            </div>

            {/* ── ÉTAPES ── */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
              <p className="text-lg font-black text-gray-900 mb-2">📋 Les étapes</p>
              <p className="text-gray-500 text-base mb-4">Explique comment faire, étape par étape.</p>
              <div className="flex flex-col gap-3">
                {etapes.map((e, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-black flex items-center justify-center flex-shrink-0 text-sm mt-2">
                      {i + 1}
                    </div>
                    <textarea
                      placeholder={`Étape ${i + 1}...`}
                      value={e}
                      onChange={ev => updateEtape(i, ev.target.value)}
                      rows={2}
                      className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-3 text-base resize-none focus:outline-none focus:border-emerald-400"
                    />
                    {etapes.length > 1 && (
                      <button onClick={() => removeEtape(i)} className="text-gray-300 hover:text-red-400 text-xl font-black w-8 mt-2">✕</button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addEtape}
                className="mt-3 w-full border-2 border-dashed border-orange-200 text-orange-600 font-bold text-base py-3 rounded-2xl hover:bg-orange-50 transition-colors"
              >
                + Ajouter une étape
              </button>
            </div>

            {/* ── AGES ── */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
              <p className="text-lg font-black text-gray-900 mb-2">🎂 Pour quel âge ?</p>
              <p className="text-gray-500 text-base mb-4">Tu peux choisir plusieurs.</p>
              <div className="flex flex-col gap-3">
                {AGES.map(a => (
                  <button
                    key={a.value}
                    onClick={() => toggleAge(a.value)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-150 ${
                      agesSelectionnes.includes(a.value)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-4xl">{a.icon}</span>
                    <span className={`text-lg font-bold ${agesSelectionnes.includes(a.value) ? 'text-emerald-800' : 'text-gray-800'}`}>
                      {a.label}
                    </span>
                    {agesSelectionnes.includes(a.value) && <span className="ml-auto text-emerald-500 text-2xl font-black">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* ── DURÉE ── */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-5">
              <p className="text-lg font-black text-gray-900 mb-2">⏱️ Combien de temps ?</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {DUREES.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setDuree(d.value)}
                    className={`px-5 py-3 rounded-2xl border-2 text-base font-bold transition-all ${
                      duree === d.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── PSEUDO ── */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-7">
          <p className="text-lg font-black text-gray-900 mb-4">👤 Qui es-tu ?</p>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Ton prénom ou un pseudo"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              disabled={anonyme}
              className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-4 text-base focus:outline-none focus:border-emerald-400 disabled:bg-gray-50 disabled:text-gray-300 transition-colors"
            />
            <button
              onClick={() => setAnonyme(!anonyme)}
              className={`px-4 py-3 rounded-2xl text-base border-2 font-bold transition-all ${
                anonyme
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {anonyme ? '🙈 Anonyme ✓' : '🙈 Anonyme'}
            </button>
          </div>
        </div>

        {/* ── BOUTON ENVOYER ── */}
        <button
          disabled={!canSubmit || loading}
          onClick={handleSubmit}
          className={`w-full font-black text-2xl py-6 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 active:scale-95 transition-all duration-150 ${
            mode === 'complet'
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {loading ? '⏳ Envoi...' : mode === 'complet' ? '🛠️ Partager mon activité !' : '🎉 Partager ma création !'}
        </button>

      </div>
      <BottomNav />
    </div>
  )
}