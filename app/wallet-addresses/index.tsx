
import { useNavigation } from '@react-navigation/native';
import { useCallback, useLayoutEffect } from 'react';


import { Avatar, FlashList, ListItem, Pressable, Typography } from '@/core/components';
import { ChevronRight } from '@/core/components/icons';
import { NETWORK_LIST } from '@/core/constants/wallet';
import { openLink } from '@/core/utils';

type NetworkItem = typeof NETWORK_LIST[number];

export default function WalletAddressesHomeScreen() {
  const navigation = useNavigation();
  const handleSelect = useCallback((network: NetworkItem) => {
    openLink({
      pathname: '/wallet-addresses/token',
      params: { networkId: network.id },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: NetworkItem }) => (
      <Pressable onPress={() => handleSelect(item)}>
        {() => (
          <ListItem
            leading={<Avatar.Token media={item.logo} shape='rounded' />}
            bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
            trailing={<ChevronRight fontWeight='700' size={20} color='$color10' />}
            py='$4'
          />
        )}
      </Pressable>
    ),
    [handleSelect]
  );

  useLayoutEffect(
    () => {
      navigation.setOptions({
        headerTitle: '选择网络',
        headerSearchBarOptions: {
          placeholder: '搜索网络',
        },
      });
    },
    [navigation]
  );

  return (
    <FlashList<NetworkItem>
      data={NETWORK_LIST}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      insetHeaderFooter={false}
    />
  );
}


