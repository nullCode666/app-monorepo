export type TradeTokenMeta = {
  symbol: string;
  name: string;
  accentColor: string;
  logo?: string;
  badge?: {
    logo?: string;
  };
};

export const TRADE_TOKEN_MAP: Record<string, TradeTokenMeta> = {
  trx: {
    symbol: 'TRX',
    name: 'Tron',
    accentColor: '#FF3B30',
    logo: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address--1720669765494.png',
    badge: {
      logo: 'https://assets.revault.one/network/tron.png',
    },
  },
  usdt: {
    symbol: 'USDT',
    name: 'Tether USDT',
    accentColor: '#26A17B',
    logo: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address-TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t-1720668500740.png',
    badge: {
      logo: 'https://assets.revault.one/network/ethereum.png',
    },
  },
  eth: {
    symbol: 'ETH',
    name: 'Ether',
    accentColor: '#627EEA',
    badge: {
      logo: 'https://assets.revault.one/network/tron.png',
    },
  },
} as const;
