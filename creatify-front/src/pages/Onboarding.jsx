import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const ages = [
  { value: 'enfant', label: '6 – 11 ans',  icon: '🧒' },
  { value: 'ado',    label: '12 – 17 ans', icon: '🧑' },
  { value: 'adulte', label: '18 ans et +', icon: '🧑‍🦱' },
]
const gouts = [
  { value: 'creer',     label: 'Créer',       icon: '🎨' },
  { value: 'bijoux',    label: 'Bijoux',       icon: '📿' },
  { value: 'nature',    label: 'Nature',       icon: '🌿' },
  { value: 'couleurs',  label: 'Couleurs',     icon: '🖌️' },
  { value: 'construire',label: 'Construire',   icon: '🪚' },
  { value: 'calme',     label: 'Calme',        icon: '🕯️' },
  { value: 'recup',     label: 'Récupération', icon: '♻️' },
  { value: 'offrir',    label: 'Offrir',       icon: '🎁' },
]
const motrics = [
  { value: 'fine',     label: 'Petits gestes',  icon: '✍️' },
  { value: 'large',    label: 'Grands gestes',  icon: '👐' },
  { value: 'aide',     label: "Avec de l'aide", icon: '🤝' },
  { value: 'sais_pas', label: 'Je ne sais pas', icon: '🤷' },
]

const CSS = `
@keyframes fadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes floatA {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(20px,-30px) scale(1.08); }
}
@keyframes floatB {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(-25px,20px) scale(1.05); }
}
@keyframes floatC {
  0%,100% { transform:translate(0,0) rotate(0deg); }
  50%     { transform:translate(15px,-15px) rotate(25deg); }
}
@keyframes floatD {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(-15px,-25px) scale(1.1); }
}
@keyframes floatE {
  0%,100% { transform:translate(0,0); }
  33%     { transform:translate(18px,-12px); }
  66%     { transform:translate(-10px,18px); }
}
@keyframes spinSlow {
  from { transform:rotate(0deg); }
  to   { transform:rotate(360deg); }
}
@keyframes bounce {
  0%,100% { transform:translateY(0); }
  50%     { transform:translateY(-7px); }
}
@keyframes pulse {
  0%,100% { box-shadow:0 0 0 0 rgba(16,185,129,.5); }
  50%     { box-shadow:0 0 0 14px rgba(16,185,129,0); }
}
@keyframes shimmer {
  0%   { background-position:-200% center; }
  100% { background-position:200% center; }
}
`

/* Formes flottantes sur tout le fond de la page */
function PageBackground() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>

      {/* Grand cercle vert haut gauche */}
      <div style={{
        animation: 'floatA 8s ease-in-out infinite',
        position:'absolute', top:-80, left:-80,
        width:320, height:320, borderRadius:'50%',
        background:'rgba(16,185,129,0.18)',
      }}/>

      {/* Cercle orange haut droite */}
      <div style={{
        animation: 'floatB 10s ease-in-out infinite',
        position:'absolute', top:-60, right:-60,
        width:260, height:260, borderRadius:'50%',
        background:'rgba(249,115,22,0.15)',
      }}/>

      {/* Cercle émeraude milieu gauche */}
      <div style={{
        animation: 'floatC 7s ease-in-out infinite',
        position:'absolute', top:'35%', left:-60,
        width:200, height:200, borderRadius:'50%',
        background:'rgba(5,150,105,0.13)',
      }}/>

      {/* Cercle jaune milieu droite */}
      <div style={{
        animation: 'floatD 9s ease-in-out infinite',
        position:'absolute', top:'40%', right:-50,
        width:180, height:180, borderRadius:'50%',
        background:'rgba(234,179,8,0.15)',
      }}/>

      {/* Cercle rose bas gauche */}
      <div style={{
        animation: 'floatE 11s ease-in-out infinite',
        position:'absolute', bottom:-60, left:-40,
        width:240, height:240, borderRadius:'50%',
        background:'rgba(236,72,153,0.1)',
      }}/>

      {/* Cercle bleu bas droite */}
      <div style={{
        animation: 'floatA 12s ease-in-out infinite',
        position:'absolute', bottom:-80, right:-60,
        width:280, height:280, borderRadius:'50%',
        background:'rgba(59,130,246,0.12)',
      }}/>

      {/* Petit cercle orange centre haut */}
      <div style={{
        animation: 'floatB 6s ease-in-out infinite',
        position:'absolute', top:'15%', left:'55%',
        width:80, height:80, borderRadius:'50%',
        background:'rgba(249,115,22,0.18)',
      }}/>

      {/* Petit cercle vert centre bas */}
      <div style={{
        animation: 'floatC 8s ease-in-out infinite',
        position:'absolute', bottom:'20%', left:'60%',
        width:60, height:60, borderRadius:'50%',
        background:'rgba(16,185,129,0.2)',
      }}/>

      {/* Anneau tournant haut droite */}
      <div style={{
        animation: 'spinSlow 20s linear infinite',
        position:'absolute', top:40, right:40,
        width:120, height:120, borderRadius:'50%',
        border:'3px dashed rgba(16,185,129,0.25)',
      }}/>

      {/* Anneau tournant bas gauche */}
      <div style={{
        animation: 'spinSlow 15s linear infinite reverse',
        position:'absolute', bottom:100, left:30,
        width:90, height:90, borderRadius:'50%',
        border:'3px dashed rgba(249,115,22,0.22)',
      }}/>

    </div>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep]                   = useState(location.state?.startStep || 0)
  const [age, setAge]                     = useState(null)
  const [selectedGouts, setSelectedGouts] = useState([])
  const [motric, setMotric]               = useState(null)
  const [animKey, setAnimKey]             = useState(0)

  const goStep = (n) => { setStep(n); setAnimKey(k => k + 1) }
  const toggleGout = (v) =>
    setSelectedGouts(p => p.includes(v) ? p.filter(g => g !== v) : [...p, v])
  const handleSubmit = () =>
    navigate('/recommandations', { state: { age, gouts: selectedGouts, motric } })

  return (
    <div style={{ minHeight:'100vh', background:'#f0fdf4', paddingBottom:96, position:'relative' }}>
      <style>{CSS}</style>

      {/* ✨ FOND ANIMÉ sur toute la page */}
      <PageBackground />

      {/* Tout le contenu est au-dessus du fond */}
      <div style={{ position:'relative', zIndex:1 }}>

        {/* NAV */}
        <nav className="bg-white/80 border-b border-gray-100 px-6 py-5 flex items-center justify-between" style={{ backdropFilter:'blur(8px)' }}>
          <span className="font-black text-3xl tracking-tight">
            <span className="text-gray-900">Creat</span>
            <span className="text-orange-500">S4</span>
            <span className="text-emerald-600">pY</span>
          </span>
          <span className="text-sm bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-semibold">
            Gratuit · Sans inscription
          </span>
        </nav>

        {/* ── ÉTAPE 0 ── */}
        {step === 0 && (
          <div key={`s0-${animKey}`} className="max-w-lg mx-auto px-5 pt-8">

            {/* HERO */}
            <div style={{
              animation: 'fadeUp .6s both',
              background: 'linear-gradient(135deg,#047857,#059669 55%,#10b981)',
              borderRadius: 24, padding: '40px 28px', marginBottom: 24,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Décos internes du hero */}
              <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.1)' }}/>
              <div style={{ position:'absolute', bottom:-15, left:-15, width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>

              <div style={{ position:'relative' }}>
                <div style={{ animation:'bounce 2.2s ease-in-out infinite', display:'inline-block', fontSize:48, marginBottom:12 }}>🎨</div>
                <h1 className="font-black text-4xl mb-4 leading-tight">
                  <span className="text-white">Bienvenue sur</span><br/>
                  <span style={{
                    background:'linear-gradient(90deg,#fff 20%,#fde68a 50%,#fff 80%)',
                    backgroundSize:'200% auto',
                    WebkitBackgroundClip:'text',
                    WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                    animation:'shimmer 3s linear infinite',
                    fontWeight:900, fontSize:'2.5rem', display:'inline-block',
                  }}>CreatS4pY</span>
                </h1>
                <p style={{ color:'rgba(255,255,255,.9)', fontSize:18, lineHeight:1.6 }}>
                  Des activités créatives faites <strong>pour toi</strong>.
                  Rien à écrire, rien à retenir.
                </p>
              </div>
            </div>

            {/* COMMENT CA MARCHE */}
            <div style={{ animation:'fadeUp .6s .15s both' }} className="bg-white/90 rounded-3xl border border-gray-100 p-6 mb-5">
              <p className="text-gray-900 text-xl font-black mb-5">Comment ça marche ?</p>
              <div className="flex flex-col gap-5">
                {[
                  { bg:'bg-emerald-100', num:'1️⃣', text:'Tu réponds à 3 questions' },
                  { bg:'bg-orange-100',  num:'2️⃣', text:'On te propose des activités' },
                  { bg:'bg-blue-100',    num:'3️⃣', text:'Tu crées et tu partages si tu veux !' },
                ].map(({ bg, num, text }, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center text-3xl flex-shrink-0`}>{num}</div>
                    <p className="text-gray-800 text-lg font-semibold leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MESSAGE RASSURANT */}
            <div style={{ animation:'fadeUp .6s .28s both' }} className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl px-5 py-4 mb-7 flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">💛</span>
              <p className="text-amber-900 text-base leading-relaxed font-medium">
                Pas besoin de compte. Tu peux recommencer autant de fois que tu veux.
              </p>
            </div>

            {/* CTA */}
            <div style={{ animation:'fadeUp .6s .42s both' }} className="mb-4">
              <button onClick={() => goStep(1)} style={{
                animation:'pulse 2.4s ease-in-out infinite',
                width:'100%', color:'#fff', fontWeight:900, fontSize:22,
                padding:'28px 0', borderRadius:24, border:'none', cursor:'pointer',
                background:'linear-gradient(135deg,#059669,#10b981)',
              }}>🚀 Commencer !</button>
            </div>

            {/* SECONDAIRE */}
            <div style={{ animation:'fadeUp .6s .54s both' }}>
              <button onClick={() => navigate('/galerie')}
                className="w-full bg-white/90 border-2 border-gray-200 hover:border-emerald-400 text-gray-700 font-bold text-lg py-5 rounded-3xl transition-all duration-150"
              >🎨 Voir les créations</button>
            </div>

          </div>
        )}

        {/* ── ÉTAPE 1 — ÂGE ── */}
        {step === 1 && (
          <div key={`s1-${animKey}`} style={{ animation:'fadeUp .5s both' }} className="max-w-lg mx-auto px-5 pt-8">
            <button onClick={() => goStep(0)} className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors">← Retour</button>
            <div className="flex gap-2 mb-8">
              <div className="flex-1 h-4 rounded-full bg-emerald-500" />
              <div className="flex-1 h-4 rounded-full bg-gray-200" />
              <div className="flex-1 h-4 rounded-full bg-gray-200" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3">Tu as quel âge ? 🎂</h1>
            <p className="text-gray-500 text-lg mb-8">Appuie sur ton âge.</p>
            <div className="flex flex-col gap-4 mb-8">
              {ages.map(a => (
                <button key={a.value} onClick={() => setAge(a.value)}
                  className={`flex items-center gap-5 px-6 py-6 rounded-3xl text-left transition-all duration-150 active:scale-98 ${age === a.value ? 'bg-emerald-500 shadow-lg' : 'bg-white/90 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'}`}
                >
                  <span className="text-5xl">{a.icon}</span>
                  <p className={`text-2xl font-black ${age === a.value ? 'text-white' : 'text-gray-900'}`}>{a.label}</p>
                  {age === a.value && <span className="ml-auto text-white text-3xl font-black">✓</span>}
                </button>
              ))}
            </div>
            <button disabled={!age} onClick={() => goStep(2)}
              className="w-full bg-emerald-600 text-white font-black text-2xl py-7 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 active:scale-95 transition-all duration-150"
            >Suivant →</button>
          </div>
        )}

        {/* ── ÉTAPE 2 — GOÛTS ── */}
        {step === 2 && (
          <div key={`s2-${animKey}`} style={{ animation:'fadeUp .5s both' }} className="max-w-lg mx-auto px-5 pt-8">
            <button onClick={() => goStep(1)} className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors">← Retour</button>
            <div className="flex gap-2 mb-8">
              <div className="flex-1 h-4 rounded-full bg-emerald-500" />
              <div className="flex-1 h-4 rounded-full bg-emerald-500" />
              <div className="flex-1 h-4 rounded-full bg-gray-200" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3">Tu aimes quoi ? 😊</h1>
            <p className="text-gray-500 text-lg mb-8">Tu peux choisir plusieurs réponses.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {gouts.map(g => (
                <button key={g.value} onClick={() => toggleGout(g.value)}
                  className={`flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-3xl transition-all duration-150 active:scale-95 ${selectedGouts.includes(g.value) ? 'bg-emerald-500 shadow-lg' : 'bg-white/90 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'}`}
                >
                  <span className="text-5xl">{g.icon}</span>
                  <span className={`text-base font-black text-center leading-tight ${selectedGouts.includes(g.value) ? 'text-white' : 'text-gray-800'}`}>{g.label}</span>
                  {selectedGouts.includes(g.value) && <span className="text-white text-xl font-black">✓</span>}
                </button>
              ))}
            </div>
            <button disabled={selectedGouts.length === 0} onClick={() => goStep(3)}
              className="w-full bg-emerald-600 text-white font-black text-2xl py-7 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 hover:bg-emerald-700 active:scale-95 transition-all duration-150"
            >Suivant →</button>
          </div>
        )}

        {/* ── ÉTAPE 3 — MOTRICITÉ ── */}
        {step === 3 && (
          <div key={`s3-${animKey}`} style={{ animation:'fadeUp .5s both' }} className="max-w-lg mx-auto px-5 pt-8">
            <button onClick={() => goStep(2)} className="flex items-center gap-2 text-gray-500 text-lg font-semibold mb-7 hover:text-gray-800 transition-colors">← Retour</button>
            <div className="flex gap-2 mb-8">
              <div className="flex-1 h-4 rounded-full bg-emerald-500" />
              <div className="flex-1 h-4 rounded-full bg-emerald-500" />
              <div className="flex-1 h-4 rounded-full bg-emerald-500" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3">Comment tu utilises tes mains ? 🖐️</h1>
            <p className="text-gray-500 text-lg mb-8">Il n'y a pas de mauvaise réponse.</p>
            <div className="flex flex-col gap-4 mb-8">
              {motrics.map(m => (
                <button key={m.value} onClick={() => setMotric(m.value)}
                  className={`flex items-center gap-5 px-6 py-6 rounded-3xl text-left transition-all duration-150 active:scale-98 ${motric === m.value ? 'bg-emerald-500 shadow-lg' : 'bg-white/90 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'}`}
                >
                  <span className="text-5xl flex-shrink-0">{m.icon}</span>
                  <p className={`text-xl font-black ${motric === m.value ? 'text-white' : 'text-gray-900'}`}>{m.label}</p>
                  {motric === m.value && <span className="ml-auto text-white text-3xl font-black">✓</span>}
                </button>
              ))}
            </div>
            <button disabled={!motric} onClick={handleSubmit}
              className="w-full bg-orange-500 text-white font-black text-2xl py-7 rounded-3xl shadow-lg disabled:bg-gray-200 disabled:text-gray-400 hover:bg-orange-600 active:scale-95 transition-all duration-150"
            >✨ Voir mes activités !</button>
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  )
}