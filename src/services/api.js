import axios from 'axios';
import config from '../config/config';
import { jwtDecode } from 'jwt-decode';

const apiClient = axios.create({
  baseURL: `${config.API_HOST}${config.API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加響應攔截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${config.API_HOST}${config.LOGIN_PATH}`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${config.BASIC_AUTH_PASSWORD}`
          }
        }
      );
      const { token } = response.data;
      
      if (!token) {
        throw new Error('未收到有效的 token');
      }

      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(decodedToken));
        return response.data;
      } catch {
        throw new Error('無效的 token 格式');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || '登入失敗');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

export const accountApi = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/account/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '獲取個人資料失敗');
    }
  }
};

export const storeApi = {
  // 獲取店家列表
  getStores: async (params) => {
    try {
      const response = await apiClient.get('/public/stores', {
        params: {
          city: params.city || undefined,
          instrument: params.instrument || undefined,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '獲取店家列表失敗');
    }
  },

  // 獲取店家詳情
  getStoreInfo: async (storeId) => {
    try {
      const response = await apiClient.get(`/public/storeInfo/${storeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '獲取店家詳情失敗');
    }
  },

  // 獲取練習室訂單
  getClassOrders: async (classId) => {
    try {
      const response = await apiClient.get(`/public/classOrders/${classId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '獲取練習室訂單失敗');
    }
  },
};

export default apiClient; 