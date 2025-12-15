import { FlashList, Typography, XStack } from '@/core/components';
import { useTokenStore } from '@/core/stores/token';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';
import TokenItem, { type TokenItemData } from '@/core/views/wallet/containers/TokenItem';
import { useEffect } from 'react';
import { RefreshControl } from 'react-native';

export function TokenListView() {
  const { tokens, loading, refreshTokens, updatePrices } = useTokenStore();

  const PrimaryNode = (
    <Typography.NumberHeading flexWrap='wrap' textAlign='center'>
      $12,345.66
    </Typography.NumberHeading>
  );

  const SecondaryNode = (
    <XStack gap='$2' alignItems='center'>
      <Typography.NumberSecondary valueChange={-1220} fontSize={15} color='$color10' />
      <Typography.NumberSecondary percentageChange={-12.34} wrapInBrackets fontSize={15} />
      <Typography.TextSecondary>· 24h</Typography.TextSecondary>
    </XStack>
  );

  // Auto-update prices every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 3000);

    return () => clearInterval(interval);
  }, [updatePrices]);

  return (
    <FlashList<TokenItemData>
      data={tokens}
      renderItem={({ item, index }) => (
        <TokenItem px='$4' py='$2' token={item} isLast={index === tokens.length - 1} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <TokenDetailHeader primaryNode={PrimaryNode} secondaryNode={SecondaryNode} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refreshTokens}
        />
      }
    />
  );
}
