import React from 'react';
import { Toaster } from "react-hot-toast";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #ef4444',
          },
          success: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Home />
        <About />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
