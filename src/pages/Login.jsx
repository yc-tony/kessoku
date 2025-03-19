import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Link,
} from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // 處理登入邏輯
    console.log('Login:', loginData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // 處理註冊邏輯
    console.log('Register:', registerData);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="登入註冊選項"
          centered
        >
          <Tab label="登入" />
          <Tab label="註冊" />
        </Tabs>

        {/* 登入表單 */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="電子郵件"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="密碼"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登入
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="#" variant="body2">
                忘記密碼？
              </Link>
            </Box>
          </Box>
        </TabPanel>

        {/* 註冊表單 */}
        <TabPanel value={tabValue} index={1}>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="姓名"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="電子郵件"
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="密碼"
              type="password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="確認密碼"
              type="password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              註冊
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Login; 