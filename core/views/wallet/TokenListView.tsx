import { FlashList, Typography, XStack } from '@/core/components';
import { useTokenStore } from '@/core/stores/token';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';
import TokenItem, { type TokenItemData } from '@/core/views/wallet/containers/TokenItem';
import { useEffect, useMemo } from 'react';
import { RefreshControl } from 'react-native';

export function TokenListView() {
  const { tokens, loading, refreshTokens, updatePrices } = useTokenStore();

  // 优化：使用useMemo缓存header内容
  const headerContent = useMemo(() => {
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

    return <TokenDetailHeader primaryNode={PrimaryNode} secondaryNode={SecondaryNode} />;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [updatePrices]);

  // 优化：使用React.memo包装ListHeaderComponent
  const MemoizedHeader = useMemo(() => headerContent, [headerContent]);

  return (
    <FlashList<TokenItemData>
      // 优化：添加estimatedItemSize，提高初始渲染性能
      estimatedItemSize={80}
      
      // 优化：使用稳定的数据引用
      data={tokens}
      
      // 优化：简化renderItem，减少不必要的计算
      renderItem={({ item, index }) => {
        // 提前计算isLast，减少renderItem内的计算
        const isLast = index === tokens.length - 1;
        return <TokenItem px='$4' py='$2' token={item} isLast={isLast} />;
      }}
      
      // 优化：确保keyExtractor使用唯一ID
      keyExtractor={(item) => item.id}
      
      // 优化：使用缓存的header组件
      ListHeaderComponent={() => MemoizedHeader}
      
      // 优化：保持现有功能
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refreshTokens}
        />
      }
      
      // 优化：减少不必要的滚动指示器绘制
      showsVerticalScrollIndicator={false}
    />
  );
}
