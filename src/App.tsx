import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ToolsList from './pages/ToolsList'
import SlimeFinder from './pages/SlimeFinder'
import ToastContainer from './components/ToastContainer'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolsList />} />
          <Route path="/slime-finder" element={<SlimeFinder />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  )
}

export default App
