import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import StudioManagement from './pages/StudioManagement';
import StoreDetail from './pages/StoreDetail';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studio-management" element={<StudioManagement />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
