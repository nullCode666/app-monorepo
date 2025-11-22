import { router } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';

import { FlashList, ListItem, PieChart, Pressable, Typography } from '@/core/components';
import {
  TOKEN_DETAIL_DISTRIBUTION,
  type TokenDistributionEntry,
} from '@/core/constants/wallet';

function findDistribution(key?: string) {
  if (!key) {
    return undefined;
  }

  return TOKEN_DETAIL_DISTRIBUTION[key.toLowerCase()];
}

type Props = {
  tokenId?: string;
  tokenSymbol?: string;
  tokenName?: string;
};

export function SendNetworkListView({ tokenId, tokenSymbol, tokenName }: Props) {

  const distribution = useMemo(() => {
    const byId = findDistribution(tokenId);
    if (byId) {
      return byId;
    }

    return findDistribution(tokenSymbol);
  }, [tokenId, tokenSymbol]);

  const segments = distribution?.segments ?? [];

  useEffect(() => {
    if (!segments.length && tokenId && tokenSymbol) {
      router.replace({ pathname: '/send/address', params: { tokenId, tokenSymbol, tokenName } });
    }
  }, [segments.length, tokenId, tokenSymbol, tokenName]);

  const handleSelect = useCallback((segment: TokenDistributionEntry) => {
    if (!tokenId || !tokenSymbol) {
      return;
    }

    router.push({
      pathname: '/send/address',
      params: {
        tokenId,
        tokenSymbol,
        tokenName,
        networkId: segment.id,
        networkLabel: segment.label,
      },
    });
  }, [tokenId, tokenSymbol, tokenName]);

  const renderSegment = useCallback(
    ({ item }: { item: TokenDistributionEntry }) => {
      const percentage = Math.round(item.share * 100);

      return (
        <Pressable onPress={() => handleSelect(item)}>
          {() => (
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
              py='$3'
              px='$4'
              borderRadius='$6'
            />
          )}
        </Pressable>
      );
    },
    [distribution?.symbol, handleSelect]
  );

  return (
    <FlashList<TokenDistributionEntry>
      data={segments}
      renderItem={renderSegment}
      keyExtractor={item => item.id}
      insetSafearea={false}
    />
  );
}

