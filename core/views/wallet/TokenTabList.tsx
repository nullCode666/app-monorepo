import { useCallback } from 'react';

import { Tabs, YStack } from '@/core/components';
import { TOKEN_LIST } from '@/core/constants/wallet';

import TokenItem from './containers/TokenItem';

import type { TokenItemData } from './containers/TokenItem';

type TokenRow = TokenItemData;

export default function TokenTabList() {

  const renderItem = useCallback(({ item, index }: { item: TokenRow; index: number }) => (
    <TokenItem
      token={item}
      isFirst={index === 0}
      isLast={index === TOKEN_LIST.length - 1}
    />
  ), []);

  return (
    <YStack flex={1} bg='$background'>
      <Tabs.FlatList
        data={TOKEN_LIST.slice(0, 4)}
        renderItem={renderItem}
        keyExtractor={(item: TokenRow) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 0, 
        }}
        style={{
          overflow: 'visible',
        }}
      />
    </YStack>
  );
}
