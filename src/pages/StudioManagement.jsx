import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const StudioManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [studioInfo, setStudioInfo] = useState({
    name: '音樂工作室',
    address: '台北市信義區信義路五段100號',
    phone: '02-12345678',
    description: '專業的練習空間，提供各種樂器和設備。',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        店家管理
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="管理選項">
          <Tab label="店家資訊" />
          <Tab label="練習室管理" />
          <Tab label="訂單管理" />
        </Tabs>

        {/* 店家資訊 */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="店家名稱"
                value={studioInfo.name}
                onChange={(e) => setStudioInfo({ ...studioInfo, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="地址"
                value={studioInfo.address}
                onChange={(e) => setStudioInfo({ ...studioInfo, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="電話"
                value={studioInfo.phone}
                onChange={(e) => setStudioInfo({ ...studioInfo, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="店家介紹"
                value={studioInfo.description}
                onChange={(e) => setStudioInfo({ ...studioInfo, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                儲存變更
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* 練習室管理 */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>練習室名稱</TableCell>
                  <TableCell>樂器類型</TableCell>
                  <TableCell>價格（每小時）</TableCell>
                  <TableCell>狀態</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3].map((room) => (
                  <TableRow key={room}>
                    <TableCell>練習室 {room}</TableCell>
                    <TableCell>電吉他、爵士鼓、貝斯</TableCell>
                    <TableCell>NT$ 300</TableCell>
                    <TableCell>可用</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            新增練習室
          </Button>
        </TabPanel>

        {/* 訂單管理 */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>訂單編號</TableCell>
                  <TableCell>練習室</TableCell>
                  <TableCell>預約時間</TableCell>
                  <TableCell>使用時長</TableCell>
                  <TableCell>客戶資訊</TableCell>
                  <TableCell>狀態</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3].map((order) => (
                  <TableRow key={order}>
                    <TableCell>ORD{String(order).padStart(6, '0')}</TableCell>
                    <TableCell>練習室 1</TableCell>
                    <TableCell>2024-03-20 14:00</TableCell>
                    <TableCell>2小時</TableCell>
                    <TableCell>王小明</TableCell>
                    <TableCell>已確認</TableCell>
                    <TableCell>
                      <Button size="small" color="primary">
                        詳情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default StudioManagement; 