import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import './App.css'

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
