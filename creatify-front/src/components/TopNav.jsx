import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/', icon: '🏠', label: 'Accueil' },
  { path: '/galerie', icon: '🎨', label: 'Galerie' },
  { path: '/partager', icon: '➕', label: 'Partager' },
]

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bg-emerald-800 sticky top-0 z-50 shadow-md">
      {/* Ligne 1 : Logo */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <span
          className="font-black text-3xl tracking-tight cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-white">Creat</span>
          <span className="text-orange-400">S4</span>
          <span className="text-emerald-300">pY</span>
        </span>
        <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-semibold">
          Sans inscription
        </span>
      </div>

      {/* Ligne 2 : Onglets centrés */}
      <div className="flex items-end justify-center gap-2 px-4 pb-0">
        {tabs.map(tab => {
          const active = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-2 px-8 py-3 text-sm font-bold transition-all duration-150 border-b-4 ${
                active
                  ? 'border-orange-400 text-white'
                  : 'border-transparent text-emerald-300 hover:text-white hover:border-white/30'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}