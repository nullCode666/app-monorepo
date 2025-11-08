import { router } from 'expo-router';
import { useCallback } from 'react';

import { Avatar, FlashList, ListItem, Pressable, Typography, XStack } from '@/core/components';
import { TOKEN_LIST } from '@/core/constants/wallet';
import type { TokenItemData } from '@/core/views/wallet/containers/TokenItem';

function buildBaseParams(token: TokenItemData) {
  return {
    tokenId: token.id,
    tokenSymbol: token.symbol,
    tokenName: token.name ?? token.symbol,
  };
}

export default function SendWalletScreen() {
  const handleSelect = useCallback((token: TokenItemData) => {
    const params = buildBaseParams(token);
    if (token.multiple) {
      router.push({ pathname: '/send/network', params });
      return;
    }

    router.push({ pathname: '/send/token', params });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TokenItemData }) => (
      <Pressable onPress={() => handleSelect(item)}>
        {() => (
          <ListItem
            leading={<Avatar.Token media={item.image} cornerMedia={item.networkLogo} />}
            bodyLeftTop={<Typography.Text numberOfLines={1}>{item.symbol}</Typography.Text>}
            bodyLeftBottom={(
              <XStack gap='$2'>
                <Typography.NumberSecondary numberOfLines={1}>{item.price}</Typography.NumberSecondary>
                <Typography.NumberSecondary numberOfLines={1} percentageChange={item.change} />
              </XStack>
            )}
            bodyRightTop={<Typography.Number numberOfLines={1}>{item.balance}</Typography.Number>}
            bodyRightBottom={<Typography.NumberSecondary numberOfLines={1}>{item.balanceFiat}</Typography.NumberSecondary>}
            px='$4'
            py='$3'
            borderRadius='$6'
          />
        )}
      </Pressable>
    ),
    [handleSelect]
  );

  return (
    <FlashList<TokenItemData>
      data={TOKEN_LIST}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      insetSafearea={false}
    />
  );
}
