import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import StudioManagement from './pages/StudioManagement';
import StoreDetail from './pages/StoreDetail';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/studio-management" element={<StudioManagement />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </div>
  );
};

export default App;
