import { useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="max-w-lg mx-auto px-5 py-16 text-center">

        {/* Illustration grande et ludique */}
        <div className="text-8xl mb-6 animate-bounce">🗺️</div>

        {/* Badge 404 coloré */}
        <div className="inline-block bg-orange-100 text-orange-700 font-black text-lg px-5 py-2 rounded-2xl mb-6">
          Erreur 404
        </div>

        <h1 className="font-black text-3xl text-gray-900 mb-4 leading-tight">
          Oups ! Cette page n'existe pas 😅
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          On a cherché partout... mais on ne trouve pas ce que tu cherches.
          Peut-être que tu peux repartir de l'accueil ?
        </p>

        {/* Boutons grands et visibles */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-emerald-600 text-white font-black text-xl py-6 rounded-3xl hover:bg-emerald-700 active:scale-95 transition-all shadow-md"
          >
            🏠 Retour à l'accueil
          </button>
          <button
            onClick={() => navigate('/galerie')}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-5 rounded-3xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            🎨 Voir la galerie
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white border-2 border-gray-200 text-gray-600 font-bold text-lg py-5 rounded-3xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            ← Page précédente
          </button>
        </div>
      </div>
    </div>
  )
}