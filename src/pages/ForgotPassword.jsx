import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { accountApi } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await accountApi.sendResetCode(email);
      setSuccess('重置密碼驗證碼已發送到您的郵箱');
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 2000);
    } catch (err) {
      setError(err.message || '發送重置密碼驗證碼失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          忘記密碼
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          請輸入您的郵箱地址，我們將發送重置密碼的驗證碼
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="電子郵件"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? '發送中...' : '發送重置密碼驗證碼'}
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

export default ForgotPassword; 