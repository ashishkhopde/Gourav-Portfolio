import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Video from './pages/Video';
import Navbar from './components/Navbar';
import LogIn from './pages/LogIn';
import PrivateRoute from './components/PrivateRoute';

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // hide navbar on login page

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/message' element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path='/video' element={<PrivateRoute><Video /></PrivateRoute>} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
