import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { FlashList, ListItem, PieChart, Typography } from '@/core/components';
import {
  TOKEN_DETAIL_DISTRIBUTION,
  type TokenDistributionEntry
} from '@/core/constants/wallet';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default function ReceiveTokenScreen() {
  const { tokenSymbol: tokenSymbolParam } =
    useLocalSearchParams<{ tokenId?: string | string[]; tokenSymbol?: string | string[]; tokenName?: string | string[] }>();

  const tokenSymbol = useMemo(() => toParam(tokenSymbolParam), [tokenSymbolParam]);

  const distribution = useMemo(() => {
    if (!tokenSymbol) {
      return undefined;
    }

    return TOKEN_DETAIL_DISTRIBUTION[tokenSymbol.toLowerCase()];
  }, [tokenSymbol]);

  const segments = distribution?.segments ?? [];

  const renderNetwork = ({ item }: { item: TokenDistributionEntry }) => {
    const percentage = Math.round(item.share * 100);

    return (
      <ListItem
        leading={(
          <PieChart
            size={48}
            thickness={4}
            gapAngle={0}
            data={[
              { value: item.share, color: item.color },
              { value: 1 - item.share, color: 'none' },
            ]}
          >
            <Typography.NumberSecondary fontSize={12} lineHeight={12}>
              {percentage}%
            </Typography.NumberSecondary>
          </PieChart>
        )}
        bodyLeftTop={<Typography.Text numberOfLines={1}>{item.label}</Typography.Text>}
        bodyLeftBottom={item.subLabel ? (
          <Typography.TextSecondary fontSize={12} lineHeight={12} numberOfLines={1}>
            {item.subLabel}
          </Typography.TextSecondary>
        ) : undefined}
        bodyRightTop={(
          <Typography.NumberSecondary color='$color12' numberOfLines={1}>
            {`${item.amount} ${distribution?.symbol ?? ''}`}
          </Typography.NumberSecondary>
        )}
        bodyRightBottom={(
          <Typography.NumberSecondary numberOfLines={1}>
            {item.fiatValue}
          </Typography.NumberSecondary>
        )}
      />
    );
  };

  return (
    <FlashList
      data={segments}
      renderItem={renderNetwork}
      keyExtractor={item => item.id}
      insetSafearea={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
