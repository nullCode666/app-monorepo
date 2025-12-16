import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { TokenItemData } from '../views/wallet/containers/TokenItem';
import {
  DEFAULT_MOCK_CONFIG,
  ERROR_RESPONSES,
  MOCK_TOKEN_PRICES,
  MOCK_TOKENS,
  type MockConfig,
  type MockResponseType,
} from './mockData';

// 创建axios实例
const api = axios.create({
  baseURL: 'https://api.example.com', // 实际项目中替换为真实API地址
  timeout: 10000,
});

// Mock配置管理
let currentMockConfig = { ...DEFAULT_MOCK_CONFIG };

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

// Mock API配置
export const mockApiConfig = {
  /**
   * 设置Mock配置
   */
  setConfig: (config: Partial<MockConfig>) => {
    currentMockConfig = { ...currentMockConfig, ...config };
  },

  /**
   * 重置Mock配置到默认值
   */
  resetConfig: () => {
    currentMockConfig = { ...DEFAULT_MOCK_CONFIG };
  },

  /**
   * 获取当前Mock配置
   */
  getConfig: () => ({ ...currentMockConfig }),
};

// 添加Mock拦截器
api.interceptors.request.use(
  async (config) => {
    // 随机生成错误（基于errorRate）
    let responseType = currentMockConfig.responseType;
    if (Math.random() < currentMockConfig.errorRate) {
      const errorTypes: MockResponseType[] = [400, 401, 404, 500, 502, 503, 'timeout', 'network'];
      responseType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    }

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, currentMockConfig.delay));

    // 模拟不同的响应状态
    if (responseType !== 'success') {
      // 模拟超时
      if (responseType === 'timeout') {
        const timeoutError = new Error('timeout of 10000ms exceeded') as any;
        timeoutError.code = 'ECONNABORTED';
        throw timeoutError;
      }

      // 模拟网络错误
      if (responseType === 'network') {
        throw new Error('Network Error');
      }

      // 模拟HTTP错误
      const errorResponse = ERROR_RESPONSES[responseType];
      const error = new Error(errorResponse.message) as any;
      error.response = {
        status: responseType,
        data: errorResponse,
        config,
      };
      throw error;
    }

    // 模拟成功响应
    const mockResponse = createMockResponse(config);
    // 使用axios的CancelToken来中断真实请求，返回mock响应
    const cancelToken = axios.CancelToken.source();
    config.cancelToken = cancelToken.token;
    cancelToken.cancel('Mock response');
    throw {
      message: 'Mock response',
      config,
      mockResponse,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 处理mock响应的响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 处理mock响应
    if (error.mockResponse) {
      return Promise.resolve(error.mockResponse);
    }

    // 处理真实错误
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 创建Mock响应
function createMockResponse(config: AxiosRequestConfig): AxiosResponse {
  const url = config.url || '';
  let data: any;
  let status = 200;

  // 根据URL返回不同的mock数据
  if (url === '/tokens') {
    data = MOCK_TOKENS;
  } else if (url === '/tokens/prices') {
    data = MOCK_TOKEN_PRICES;
  } else if (url.startsWith('/tokens/')) {
    const id = url.split('/').pop() || '';
    const token = MOCK_TOKENS.find((t) => t.id === id);
    if (token) {
      data = token;
    } else {
      data = ERROR_RESPONSES[404];
      status = 404;
    }
  } else {
    data = ERROR_RESPONSES[404];
    status = 404;
  }

  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config,
  } as AxiosResponse;
}

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
