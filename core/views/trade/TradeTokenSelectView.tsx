import { useNavigation } from 'expo-router';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Tabs, useTheme } from '@/core/components';
import { NETWORK_LIST, TOKEN_LIST } from '@/core/constants/wallet';
import TokenItem, { type TokenItemData } from '@/core/views/wallet/containers/TokenItem';

export function TradeTokenSelectView() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '搜索 Token',
        hideWhenScrolling: false,
      },
      title: '选择代币',
      headerShown: true,
      headerTitle: '选择代币',
    });
  }, [navigation]);

  const networks = useMemo(() => [{ id: 'all', name: '所有网络', logo: null }, ...NETWORK_LIST], []);

  const renderItem = useCallback(
    ({ item, index }: { item: TokenItemData; index: number }) => (
      <TokenItem px='$4' py='$2' token={item} isLast={index === TOKEN_LIST.length - 1} />
    ),
    [],
  );

  return (
    <Tabs.Container
      containerStyle={{ backgroundColor: theme.backgroundModal.val, marginTop: top }}
      backgroundColor='$backgroundModal'
    >
      {networks.map((network) => (
        <Tabs.Tab key={network.id} name={network.id} label={network.name}>
          <Tabs.FlashList
            showsVerticalScrollIndicator={false}
            data={TOKEN_LIST}
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
