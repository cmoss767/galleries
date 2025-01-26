import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GalleryViewer from './pages/GalleryViewer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Gallery Viewer Home</div>} />
        <Route path="/view/:galleryId" element={<GalleryViewer />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  )
}

export default App 