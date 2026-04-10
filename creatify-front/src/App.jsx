import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Recommandations from './pages/Recommandations'
import Galerie from './pages/Galerie'
import Partager from './pages/Partager'
import ActiviteDetail from './pages/ActiviteDetail'
import CreationDetail from './pages/CreationDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/recommandations" element={<Recommandations />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/partager" element={<Partager />} />
        <Route path="/activite/:id" element={<ActiviteDetail />} />
        <Route path="/creation/:id" element={<CreationDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App