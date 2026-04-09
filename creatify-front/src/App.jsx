import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Recommandations from './pages/Recommandations'
import Galerie from './pages/Galerie'
import Partager from './pages/Partager'
import ActiviteDetail from './pages/ActiviteDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/recommandations" element={<Recommandations />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/partager" element={<Partager />} />
        <Route path="/activite/:id" element={<ActiviteDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App