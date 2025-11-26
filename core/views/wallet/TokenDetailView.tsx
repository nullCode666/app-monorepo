import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TOKEN_DETAIL_DISTRIBUTION, TOKEN_DETAIL_TEMPLATES, TOKEN_LIST } from '@/core/constants/wallet';
import { MultiTokenDetail } from '@/core/views/wallet/containers/MultiTokenDetail';
import { SingleTokenDetail } from '@/core/views/wallet/containers/SingleTokenDetail';

type Props = {
  symbol?: string;
  name?: string;
};

export function TokenDetailView({ symbol: symbolParam, name: nameParam }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const symbol = useMemo(() => {
    return symbolParam?.toUpperCase();
  }, [symbolParam]);

  const templateName = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const template = TOKEN_DETAIL_TEMPLATES[symbol.toLowerCase()];
    return template?.name;
  }, [symbol]);

  const headerTitle = nameParam ?? templateName ?? symbol ?? 'Token';

  const preferredToken = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const normalizedSymbol = symbol.toLowerCase();
    const matches = TOKEN_LIST.filter((token) => token.symbol.toLowerCase() === normalizedSymbol);
    if (!matches.length) {
      return undefined;
    }

    return matches.find((token) => token.multiple) ?? matches[0];
  }, [symbol]);

  const distribution = useMemo(() => {
    const key = symbol?.toLowerCase();
    if (!key) {
      return undefined;
    }

    return TOKEN_DETAIL_DISTRIBUTION[key];
  }, [symbol]);

  const isMulti = Boolean(distribution);

  useEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [headerTitle, navigation]);

  if (isMulti) {
    return (
      <MultiTokenDetail
        symbol={symbol}
        distribution={distribution}
        preferredToken={preferredToken}
        top={top}
        bottom={bottom}
      />
    );
  }

  return <SingleTokenDetail symbol={symbol} />;
}
