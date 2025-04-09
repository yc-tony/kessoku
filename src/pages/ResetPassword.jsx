import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { accountApi } from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [form, setForm] = useState({
    code: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 密碼驗證
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  if (!email) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            無效的請求
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            請從登入頁面的重置密碼開始操作
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/login', { state: { activeTab: 2 } })}
          >
            返回登入頁面
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除錯誤信息
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 驗證密碼格式
      if (!validatePassword(form.newPassword)) {
        throw new Error('密碼必須包含大小寫字母和數字，且長度至少為 8 位');
      }

      // 驗證兩次密碼是否一致
      if (form.newPassword !== form.confirmPassword) {
        throw new Error('兩次輸入的密碼不一致');
      }

      await accountApi.resetPassword(email, form.code, form.newPassword);
      setSuccess('密碼重置成功！');
      setTimeout(() => {
        navigate('/login', { state: { activeTab: 0 } });
      }, 2000);
    } catch (err) {
      setError(err.message || '重置密碼失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    try {
      await accountApi.sendResetCode(email);
      setSuccess('驗證碼已重新發送到您的郵箱');
    } catch (err) {
      setError(err.message || '發送驗證碼失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          重置密碼
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          請輸入發送到 {email} 的驗證碼和新密碼
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="驗證碼"
            name="code"
            value={form.code}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            variant="text"
            size="small"
            onClick={handleResendCode}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            重新發送驗證碼
          </Button>
          <TextField
            fullWidth
            label="新密碼"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            margin="normal"
            required
            helperText="密碼必須包含大小寫字母和數字，且長度至少為 8 位"
          />
          <TextField
            fullWidth
            label="確認新密碼"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : '重置密碼'}
          </Button>
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/login', { state: { activeTab: 0 } })}
          >
            返回登入頁面
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword; 