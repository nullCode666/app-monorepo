import { useCallback } from 'react';

import { Tabs } from '@/core/components';
import { TOKEN_LIST } from '@/core/constants/wallet';

import TokenItem from './containers/TokenItem';
import TokenTabHeader from './containers/TokenTabHeader';

import type { TokenItemData } from './containers/TokenItem';

type TokenRow = TokenItemData;

export default function TokenTabList() {

  const renderItem = useCallback(({ item }: { item: TokenRow }) => <TokenItem token={item} />, []);

  return (
    <Tabs.FlatList
      data={TOKEN_LIST}
      ListHeaderComponent={TokenTabHeader}
      renderItem={renderItem}
      keyExtractor={(item: TokenRow) => item.id}
    />
  );
}
