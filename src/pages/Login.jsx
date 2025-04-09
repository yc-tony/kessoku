import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, accountApi } from '../services/api';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 登入表單
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // 註冊表單
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });

  // 重置密碼表單
  const [resetForm, setResetForm] = useState({
    email: ''
  });

  // 表單驗證
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  // 處理登入
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authApi.login(loginForm.email, loginForm.password);
      setSuccess('登入成功！');
      const previousPath = sessionStorage.getItem('previousPath');
      setTimeout(() => {
        navigate(previousPath || '/');
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 處理註冊
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validateEmail(registerForm.email)) {
        throw new Error('請輸入有效的電子郵件地址');
      }

      if (!validatePassword(registerForm.password)) {
        throw new Error('密碼必須包含大小寫字母和數字，且長度至少為 8 位');
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        throw new Error('兩次輸入的密碼不一致');
      }

      await accountApi.createAccount(
        registerForm.email,
        registerForm.password,
        registerForm.nickname
      );

      setSuccess('註冊成功！請前往驗證郵箱');
      setTimeout(() => {
        navigate('/verify-email', { 
          state: { email: registerForm.email } 
        });
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 處理發送重置密碼驗證碼
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail(resetForm.email)) {
      setError('請輸入有效的電子郵件地址');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await accountApi.sendResetCode(resetForm.email);
      setSuccess('重置密碼驗證碼已發送到您的郵箱');
      setTimeout(() => {
        navigate('/reset-password', { 
          state: { email: resetForm.email } 
        });
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            帳號管理
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="登入" />
            <Tab label="註冊" />
            <Tab label="重置密碼" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {/* 登入表單 */}
          {activeTab === 0 && (
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="電子郵件"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="密碼"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : '登入'}
              </Button>
            </form>
          )}

          {/* 註冊表單 */}
          {activeTab === 1 && (
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="電子郵件"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="密碼"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                margin="normal"
                required
                helperText="密碼必須包含大小寫字母和數字，且長度至少為 8 位"
              />
              <TextField
                fullWidth
                label="確認密碼"
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="暱稱"
                value={registerForm.nickname}
                onChange={(e) => setRegisterForm({ ...registerForm, nickname: e.target.value })}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : '註冊'}
              </Button>
            </form>
          )}

          {/* 重置密碼表單 */}
          {activeTab === 2 && (
            <form onSubmit={handleResetPassword}>
              <TextField
                fullWidth
                label="電子郵件"
                type="email"
                value={resetForm.email}
                onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : '發送重置密碼驗證碼'}
              </Button>
            </form>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 