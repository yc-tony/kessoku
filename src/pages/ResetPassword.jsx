import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';
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

  if (!email) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            無效的請求
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            請從忘記密碼頁面開始重置密碼流程
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/forgot-password')}
          >
            返回忘記密碼
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (form.newPassword !== form.confirmPassword) {
      setError('兩次輸入的密碼不一致');
      setLoading(false);
      return;
    }

    try {
      await accountApi.resetPassword(email, form.code, form.newPassword);
      setSuccess('密碼重置成功！');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || '重置密碼失敗，請重試');
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
          請輸入您收到的驗證碼和新密碼
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
          <TextField
            fullWidth
            label="新密碼"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            margin="normal"
            required
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
            {loading ? '重置中...' : '重置密碼'}
          </Button>
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/login')}
          >
            返回登錄
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword; 