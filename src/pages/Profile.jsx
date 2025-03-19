import React, { useState, useEffect } from 'react';
import { accountApi } from '../services/api';
import { Container, Card, CardContent, Typography, Alert } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await accountApi.getProfile();
      setProfile(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" className="mb-4">
            個人資料
          </Typography>
          <div className="mb-3">
            <Typography color="textSecondary" gutterBottom>
              暱稱
            </Typography>
            <Typography variant="h6">
              {profile?.nickname || '未設置'}
            </Typography>
          </div>
          <div>
            <Typography color="textSecondary" gutterBottom>
              電子郵件
            </Typography>
            <Typography variant="h6">
              {profile?.email}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile; 