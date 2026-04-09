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
  { value: 'Autre', label: 'Autre', icon: '✂️' },
]

export default function Partager() {
  const navigate = useNavigate()
  const fileInputRef = useRef()
  const [type, setType] = useState(null)
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [anonyme, setAnonyme] = useState(false)
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [showQR, setShowQR] = useState(false)
  const [qrUrl, setQrUrl] = useState('')
  const [uploadMethod, setUploadMethod] = useState(null)

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.hostname}:5173/partager`
    setQrUrl(url)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setUploadMethod('ordi')
    setShowQR(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setUploadMethod('ordi')
    setShowQR(false)
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setImageFile(null)
    setUploadMethod(null)
    setShowQR(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async () => {
    if (!titre || !type) return
    setLoading(true)
    try {
      let imageUrl = null
      if (imageFile) {
        const res = await uploadImage(imageFile)
        imageUrl = res.data
      }
      await postCreation({
        titre,
        description,
        pseudo: anonyme ? null : pseudo,
        typeCreation: type,
        estAnonyme: anonyme,
        imageUrl,
      })
      setSucces(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (succes) return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col items-center justify-center px-4">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="font-black text-2xl text-gray-900 mb-2">Bravo !</h2>
      <p className="text-gray-400 text-sm mb-8 text-center">
        Ta création a été partagée avec la communauté.
      </p>
      <button
        onClick={() => navigate('/galerie')}
        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors mb-3 w-full max-w-xs"
      >
        Voir la galerie
      </button>
      <button
        onClick={() => navigate('/')}
        className="bg-white border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors w-full max-w-xs"
      >
        Retour à l'accueil
      </button>
      <BottomNav />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span
          className="font-black text-2xl text-emerald-800 cursor-pointer"
          onClick={() => navigate('/')}
        >
          creat<span className="text-orange-500">ify</span>
        </span>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
          Sans inscription
        </span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-8">
        <h2 className="font-black text-2xl text-gray-900 mb-1">Partage ta création</h2>
        <p className="text-gray-400 text-sm mb-6">Une photo, un titre, et c'est parti.</p>

        {/* ── TYPE ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
            Quel type de création ?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`border-2 rounded-xl py-3 text-center transition-all duration-150 ${
                  type === t.value
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <div className="text-2xl mb-1">{t.icon}</div>
                <div className="text-xs font-medium text-gray-700">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── PHOTO ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
            La photo de ta création
          </p>

          {/* Aperçu image */}
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-52 object-cover rounded-xl"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-500 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-sm shadow-sm"
              >
                ✕
              </button>
              <div className="absolute bottom-2 left-2 bg-white rounded-lg px-2 py-1 text-xs text-emerald-700 font-medium border border-emerald-100">
                ✓ Photo ajoutée
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">

              {/* Zone drag & drop / clic ordi */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-150 group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">💻</div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Depuis mon ordinateur
                </div>
                <div className="text-xs text-gray-400">
                  Clique ou glisse une photo ici
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  JPG, PNG, WEBP — max 10 MB
                </div>
              </div>

              {/* Séparateur */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium">ou</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* QR code téléphone */}
              <button
                onClick={() => { setShowQR(!showQR); setUploadMethod('telephone') }}
                className={`border-2 rounded-xl p-4 text-center transition-all duration-150 ${
                  showQR
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <div className="text-4xl mb-2">📱</div>
                <div className="text-sm font-medium text-gray-700">
                  Prendre la photo avec mon téléphone
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Scanner le QR code avec ton téléphone
                </div>
              </button>

              {/* Bloc QR code */}
              {showQR && (
                <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Scanne ce QR code avec ton téléphone
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Tu pourras prendre la photo directement et la partager
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white rounded-2xl border border-gray-200 shadow-sm">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}&color=085041&bgcolor=ffffff`}
                        alt="QR Code"
                        className="rounded-lg"
                        width={180}
                        height={180}
                      />
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-left">
                    <p className="text-xs text-emerald-800 font-medium mb-1">Comment ça marche :</p>
                    <ol className="text-xs text-emerald-700 flex flex-col gap-1">
                      <li>1. Ouvre l'appareil photo de ton téléphone</li>
                      <li>2. Pointe-le vers le QR code</li>
                      <li>3. Clique sur le lien qui apparaît</li>
                      <li>4. Tu arrives sur cette page depuis ton téléphone</li>
                      <li>5. Prends ta photo et partage !</li>
                    </ol>
                  </div>
                  <button
                    onClick={() => { setShowQR(false); setUploadMethod(null) }}
                    className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* ── TITRE & DESCRIPTION ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
            Dis-nous ce que c'est
          </p>
          <input
            type="text"
            placeholder="Donne un titre à ta création"
            value={titre}
            onChange={e => setTitre(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <textarea
            placeholder="Raconte comment tu l'as fait (pas obligatoire)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* ── PSEUDO ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
            Comment tu t'appelles ?
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ton prénom ou un pseudo"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              disabled={anonyme}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 disabled:bg-gray-50 disabled:text-gray-300 transition-colors"
            />
            <button
              onClick={() => setAnonyme(!anonyme)}
              className={`px-4 py-2 rounded-xl text-sm border transition-all duration-150 font-medium ${
                anonyme
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {anonyme ? '✓ Anonyme' : 'Anonyme'}
            </button>
          </div>
          {anonyme && (
            <p className="text-xs text-gray-400 mt-2">
              Ta création sera publiée sans prénom ni pseudo.
            </p>
          )}
        </div>

        {/* ── SUBMIT ── */}
        <button
          onClick={handleSubmit}
          disabled={!titre || !type || loading}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-medium text-base disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 transition-colors mb-3"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Envoi en cours...
            </span>
          ) : (
            'Partager ma création 🎉'
          )}
        </button>

        {/* Indicateur champs obligatoires */}
        {(!titre || !type) && (
          <p className="text-xs text-center text-gray-400 mb-2">
            {!type && !titre ? 'Choisis un type et donne un titre à ta création' :
             !type ? 'Choisis un type de création' :
             'Donne un titre à ta création'}
          </p>
        )}

        <p className="text-xs text-gray-400 text-center">
          Pas de compte requis · Aucune donnée personnelle conservée
        </p>
      </div>
      <BottomNav />
    </div>
  )
}