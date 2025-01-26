import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GalleryViewer from './pages/GalleryViewer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/view/:galleryId" element={<GalleryViewer />} />
      </Routes>
    </Router>
  )
}

export default App 