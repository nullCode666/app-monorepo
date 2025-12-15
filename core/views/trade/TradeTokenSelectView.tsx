import { useNavigation } from 'expo-router';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Tabs, useTheme } from '@/core/components';
import { NETWORK_LIST } from '@/core/constants/wallet';
import { useTokenStore } from '@/core/stores/token';
import TokenItem, { type TokenItemData } from '@/core/views/wallet/containers/TokenItem';

export function TradeTokenSelectView() {
  const { bottom } = useSafeAreaInsets();
  const { tokens } = useTokenStore();

  const navigation = useNavigation();
  const theme = useTheme();
  const backgroundModalColor = theme.backgroundModal.val;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '选择代币',
      headerShown: true,
      headerTitle: '选择代币',
      headerTransparent: false,
      headerShadowVisible: true,
      headerStyle: { backgroundColor: backgroundModalColor },
    });
  }, [navigation, backgroundModalColor]);

  const networks = useMemo(() => [{ id: 'all', name: '所有网络', logo: null }, ...NETWORK_LIST], []);

  const renderItem = useCallback(
    ({ item, index }: { item: TokenItemData; index: number }) => (
      <TokenItem px='$4' py='$2' token={item} isLast={index === tokens.length - 1} />
    ),
    [tokens.length],
  );

  return (
    <Tabs.Container containerStyle={{ backgroundColor: backgroundModalColor }} backgroundColor='$backgroundModal'>
      {networks.map((network) => (
        <Tabs.Tab key={network.id} name={network.id} label={network.name}>
          <Tabs.FlashList
            showsVerticalScrollIndicator={false}
            data={tokens}
            renderItem={renderItem}
            keyExtractor={(item: TokenItemData) => item.id}
            contentContainerStyle={{ paddingBottom: bottom + 72 }}
            estimatedItemSize={72}
          />
        </Tabs.Tab>
      ))}
    </Tabs.Container>
  );
}
