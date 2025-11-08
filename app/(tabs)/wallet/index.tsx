import { useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Tabs, View } from '@/core/components';
import DefiTabList from '@/core/views/wallet/DefiTabList';
import NFTTabList from '@/core/views/wallet/NFTTabList';
import TokenTabList from '@/core/views/wallet/TokenTabList';
import WalletHeaderPrice from '@/core/views/wallet/WalletHomeHeader';

export default function WalletScreen() {
  const { top } = useSafeAreaInsets();
  const minHeaderHeight = top + 54;
  const pagerProps = useMemo(() => ({ overdrag: false, offscreenPageLimit: 2 }), []);

  const renderHeader = useCallback(() => (
    <View paddingTop={minHeaderHeight}>
      <WalletHeaderPrice />
    </View>
  ), [minHeaderHeight]);

  return (
    <Tabs.Container
      renderHeader={renderHeader}
      minHeaderHeight={minHeaderHeight}
      pagerProps={pagerProps}
    >
      <Tabs.Tab name='coins' label='Coins'>
        <TokenTabList />
      </Tabs.Tab>
      <Tabs.Tab name='defi' label='DeFi'>
        <DefiTabList />
      </Tabs.Tab>
      <Tabs.Tab name='nft' label='NFT'>
        <NFTTabList />
      </Tabs.Tab>
    </Tabs.Container>
  );
}
