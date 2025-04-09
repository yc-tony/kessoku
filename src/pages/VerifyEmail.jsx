import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { accountApi } from '../services/api';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await accountApi.verifyEmail(email, verificationCode);
      setSuccess('郵箱驗證成功！');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || '驗證失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await accountApi.sendVerificationCode(email);
      setSuccess('驗證碼已重新發送到您的郵箱');
    } catch (err) {
      setError(err.message || '發送驗證碼失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">無效的郵箱地址，請重新註冊</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          驗證郵箱
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          驗證碼已發送至：{email}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="驗證碼"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
            {loading ? '驗證中...' : '驗證'}
          </Button>
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleResendCode}
            disabled={loading}
          >
            重新發送驗證碼
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default VerifyEmail; 