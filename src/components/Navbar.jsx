import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authApi } from '../services/api';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccountCircle from '@mui/icons-material/AccountCircle';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(authApi.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    authApi.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid" style={{ maxWidth: '1920px' }}>
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <MusicNoteIcon className="me-2" />
          <span style={{ 
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem'
          }}>
            KESSOKU
          </span>
        </Link>

        {/* 導航鏈接 */}
        <div className="navbar-nav me-auto">
          {isLoggedIn && (
            <Link 
              to="/bookings" 
              className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`}
            >
              我的預約
            </Link>
          )}
        </div>

        {/* 用戶菜單 */}
        {isLoggedIn ? (
          <div className="dropdown">
            <button
              className="btn btn-link text-white p-0 position-relative"
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <AccountCircle style={{ fontSize: '2rem' }} />
            </button>
            <ul 
              className={`dropdown-menu ${showUserMenu ? 'show' : ''}`}
              style={{
                position: 'absolute',
                right: 0,
                left: 'auto'
              }}
            >
              <li>
                <Link to="/profile" className="dropdown-item">
                  個人資料
                </Link>
              </li>
              <li>
                <Link to="/studio-management" className="dropdown-item">
                  店家管理
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  登出
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline-light">
            登入
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 