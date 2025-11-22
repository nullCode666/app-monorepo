import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { Avatar, FlashList, ListItem, Typography, XStack } from '@/core/components';
import { Copy, QrCode } from '@/core/components/icons';
import { NETWORK_LIST } from '@/core/constants/wallet';

import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NetworkItem = (typeof NETWORK_LIST)[number];

type Navigation = NativeStackNavigationProp<ParamListBase>;

export function ReceiveNetworkListView() {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    navigation.setOptions({
      title: '选择网络地址',
    });
  }, [navigation]);

  const renderItem = ({ item, index }: { item: NetworkItem; index: number }) => (
    <ListItem
      leading={<Avatar.Token media={item.logo} shape='rounded' />}
      bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
      bodyLeftBottom={
        <Typography.AddressSecondary short>17jbY2E7AH5Ge8ShQXSWZGfoxzkHXGxoJE</Typography.AddressSecondary>
      }
      trailing={
        <XStack gap='$4'>
          <Avatar.Token media={QrCode} size='middle' />
          <Avatar.Token media={Copy} size='middle' />
        </XStack>
      }
      px='$4'
      py='$2'
      separator={index !== NETWORK_LIST.length - 1}
      onPress={() => router.push({ pathname: '/receive/addresses', params: { networkId: item.id } })}
    />
  );

  return (
    <FlashList<NetworkItem>
      data={NETWORK_LIST}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      insetHeaderFooter={false}
    />
  );
}
