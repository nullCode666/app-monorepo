import axios from 'axios';
import type { TokenItemData } from '../views/wallet/containers/TokenItem';

// 创建axios实例
const api = axios.create({
  baseURL: 'https://api.example.com', // 实际项目中替换为真实API地址
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以添加认证token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Token相关API
export const tokenApi = {
  /**
   * 获取所有token列表
   */
  getTokens: async (): Promise<TokenItemData[]> => {
    const response = await api.get<TokenItemData[]>('/tokens');
    return response.data;
  },
  
  /**
   * 根据ID获取单个token信息
   */
  getTokenById: async (id: string): Promise<TokenItemData> => {
    const response = await api.get<TokenItemData>(`/tokens/${id}`);
    return response.data;
  },
  
  /**
   * 获取token价格更新
   */
  getTokenPrices: async (): Promise<Record<string, { price: string; change: number }>> => {
    const response = await api.get<Record<string, { price: string; change: number }>>('/tokens/prices');
    return response.data;
  },
};

// 导出api实例供其他服务使用
export default api;
