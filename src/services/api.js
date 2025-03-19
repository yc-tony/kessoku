import axios from 'axios';
import config from '../config/config';

const apiClient = axios.create({
  baseURL: `${config.API_HOST}${config.API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

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