import React from 'react';
import { Toaster } from "react-hot-toast";


import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <div>
      
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <Home/>

      <About/>
      
      <Services/>
      
      <Contact/>

    </div>
  )
}
