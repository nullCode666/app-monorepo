import { TOKEN_LIST } from '../constants/wallet';
import type { TokenItemData } from '../views/wallet/containers/TokenItem';

// 从TOKEN_LIST中提取token价格数据
export const MOCK_TOKEN_PRICES: Record<string, { price: string; change: number }> = TOKEN_LIST.reduce((acc, token) => {
  acc[token.id] = {
    price: token.price,
    change: token.change,
  };
  return acc;
}, {} as Record<string, { price: string; change: number }>);

// 模拟token列表数据（直接使用wallet.ts中的TOKEN_LIST）
export const MOCK_TOKENS: TokenItemData[] = TOKEN_LIST;

// 错误响应模板
export const ERROR_RESPONSES = {
  400: { message: 'Bad Request', code: 'BAD_REQUEST' },
  401: { message: 'Unauthorized', code: 'UNAUTHORIZED' },
  404: { message: 'Not Found', code: 'NOT_FOUND' },
  500: { message: 'Internal Server Error', code: 'INTERNAL_SERVER_ERROR' },
  502: { message: 'Bad Gateway', code: 'BAD_GATEWAY' },
  503: { message: 'Service Unavailable', code: 'SERVICE_UNAVAILABLE' },
  timeout: { message: 'Request Timeout', code: 'TIMEOUT' },
  network: { message: 'Network Error', code: 'NETWORK_ERROR' },
};

// 模拟响应类型
export type MockResponseType = 
  | 'success'
  | 400
  | 401
  | 404
  | 500
  | 502
  | 503
  | 'timeout'
  | 'network';

// Mock配置
export type MockConfig = {
  responseType: MockResponseType;
  delay: number;
  errorRate: number; // 0-1之间的概率，用于随机生成错误
};

// 默认Mock配置
export const DEFAULT_MOCK_CONFIG: MockConfig = {
  responseType: 'success',
  delay: 300,
  errorRate: 0,
};
