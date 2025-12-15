import { create } from 'zustand';
import { TOKEN_LIST } from '../constants/wallet';
import { tokenApi } from '../services/api';
import type { TokenItemData } from '../views/wallet/containers/TokenItem';

type TokenStoreState = {
  tokens: TokenItemData[];
  loading: boolean;
  error: string | null;
  selectedToken: TokenItemData | null;
};

type TokenStoreActions = {
  setTokens: (tokens: TokenItemData[]) => void;
  updateToken: (id: string, updates: Partial<TokenItemData>) => void;
  updateMultipleTokens: (updates: Array<{ id: string; updates: Partial<TokenItemData> }>) => void;
  selectToken: (token: TokenItemData) => void;
  deselectToken: () => void;
  refreshTokens: () => void;
  updatePrices: () => void;
};

type TokenStore = TokenStoreState & TokenStoreActions;

const initialState: TokenStoreState = {
  tokens: TOKEN_LIST,
  loading: false,
  error: null,
  selectedToken: null,
};

export const useTokenStore = create<TokenStore>((set, get) => ({
  ...initialState,

  setTokens: (tokens) => {
    set({ tokens });
  },

  updateToken: (id, updates) => {
    set((state) => ({
      tokens: state.tokens.map((token) =>
        token.id === id ? { ...token, ...updates } : token
      ),
    }));
  },

  updateMultipleTokens: (updates) => {
    set((state) => {
      const updateMap = new Map(updates.map(({ id, updates }) => [id, updates]));
      return {
        tokens: state.tokens.map((token) => {
          const updates = updateMap.get(token.id);
          return updates ? { ...token, ...updates } : token;
        }),
      };
    });
  },

  selectToken: (token) => {
    set({ selectedToken: token });
  },

  deselectToken: () => {
    set({ selectedToken: null });
  },

  refreshTokens: async () => {
    set({ loading: true, error: null });
    try {
      // 从API获取数据
      const tokens = await tokenApi.getTokens();
      set({ tokens, loading: false });
    } catch (error) {
      console.error('Failed to refresh tokens from API, using local data:', error);
      // API请求失败时，使用本地备份数据
      set({ tokens: TOKEN_LIST, error: 'Failed to refresh tokens from API', loading: false });
    }
  },

  updatePrices: async () => {
    set({ loading: true });
    try {
      // 从API获取价格更新
      const priceUpdates = await tokenApi.getTokenPrices();
      
      set((state) => {
        const updatedTokens = state.tokens.map((token) => {
          const update = priceUpdates[token.id];
          if (!update) return token;

          // Update balance fiat value if balance > 0
          const balance = parseFloat(token.balance);
          let newBalanceFiat = token.balanceFiat;
          if (balance > 0) {
            const priceValue = parseFloat(update.price.replace(/[^\d.-]/g, ''));
            const balanceFiatValue = balance * priceValue;
            newBalanceFiat = `$${balanceFiatValue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          }

          return {
            ...token,
            price: update.price,
            change: update.change,
            balanceFiat: newBalanceFiat,
          };
        });

        return {
          tokens: updatedTokens,
          loading: false,
        };
      });
    } catch (error) {
      console.error('Failed to update prices from API, using simulated updates:', error);
      // API请求失败时，使用模拟价格更新
      set((state) => {
        const updatedTokens = state.tokens.map((token) => {
          // Generate a small random price change (-0.5% to +0.5%)
          const change = (Math.random() - 0.5) * 1;
          // Parse current price without currency symbol
          const currentPrice = parseFloat(token.price.replace(/[^\d.-]/g, ''));
          // Calculate new price
          const newPrice = currentPrice * (1 + change / 100);
          // Format new price
          const formattedPrice = `$${newPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

          // Update balance fiat value if balance > 0
          const balance = parseFloat(token.balance);
          let newBalanceFiat = token.balanceFiat;
          if (balance > 0) {
            const balanceFiatValue = balance * newPrice;
            newBalanceFiat = `$${balanceFiatValue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          }

          return {
            ...token,
            price: formattedPrice,
            change,
            balanceFiat: newBalanceFiat,
          };
        });

        return {
          tokens: updatedTokens,
          loading: false,
          error: 'Failed to update prices from API',
        };
      });
    }
  },
}));
