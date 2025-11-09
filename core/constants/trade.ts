export type TradeTokenMeta = {
  symbol: string;
  name: string;
  accentColor: string;
  badge?: {
    label: string;
    accentColor: string;
  };
};

export const TRADE_TOKEN_MAP: Record<string, TradeTokenMeta> = {
  trx: {
    symbol: 'TRX',
    name: 'Tron',
    accentColor: '#FF3B30',
    badge: { label: 'TRX', accentColor: '#FF3B30' },
  },
  usdt: {
    symbol: 'USDT',
    name: 'Tether USDT',
    accentColor: '#26A17B',
    badge: { label: 'TRX', accentColor: '#FF3B30' },
  },
  eth: {
    symbol: 'ETH',
    name: 'Ether',
    accentColor: '#627EEA',
    badge: { label: 'TRX', accentColor: '#FF3B30' },
  },
} as const;
