import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Manual from './pages/Manual';
import History from './pages/History';
import Fee from './pages/Fee';
import Qestion from './pages/Qestion';
import Contact from './pages/Contact';
import Setting from './pages/Setting';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/fee" element={<Fee />} />
        <Route path="/question" element={<Qestion />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  )
}

export default App
