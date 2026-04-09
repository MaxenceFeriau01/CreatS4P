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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around px-4 py-2 z-50">
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all ${active ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className={`text-xs font-medium ${active ? 'text-emerald-600' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}