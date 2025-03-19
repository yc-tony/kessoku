import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import StudioManagement from './pages/StudioManagement';

const App = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studio-management" element={<StudioManagement />} />
      </Routes>
    </div>
  );
};

export default App;
