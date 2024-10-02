import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Siginup';
import Manual from './pages/Manual';
import BookHistory from './pages/BookHistory';
import BuyHistory from './pages/BuyHistory';
import Fee from './pages/Fee';
import Qestion from './pages/Qestion';
import Contact from './pages/Contact';
import Setting from './pages/Setting';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book-history" element={<BookHistory />} />
          <Route path="/buy-history" element={<BuyHistory />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/fee" element={<Fee />} />
          <Route path="/question" element={<Qestion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  )
}

export default App
