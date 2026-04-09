import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/', icon: '🏠', label: 'Accueil' },
  { path: '/galerie', icon: '🎨', label: 'Galerie' },
  { path: '/partager', icon: '➕', label: 'Partager' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Fond dégradé émeraude foncé */}
      <div className="bg-emerald-800 px-4 pt-3 pb-5 flex items-center justify-around shadow-2xl">
        {tabs.map(tab => {
          const active = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-2xl transition-all duration-150 active:scale-95 ${
                active
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              {/* Icône dans un cercle si actif */}
              <div className={`flex items-center justify-center transition-all duration-150 ${
                active
                  ? 'w-12 h-12 rounded-2xl bg-orange-500 shadow-lg -mt-6'
                  : 'w-10 h-10'
              }`}>
                <span className={`${active ? 'text-3xl' : 'text-2xl'}`}>
                  {tab.icon}
                </span>
              </div>
              <span className={`font-bold text-sm transition-colors ${
                active ? 'text-white' : 'text-emerald-300'
              }`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}