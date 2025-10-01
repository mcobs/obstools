import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SlimeFinder from './pages/SlimeFinder'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/slime-finder" element={<SlimeFinder />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
