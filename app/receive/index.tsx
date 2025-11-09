import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { Avatar, FlashList, ListItem, Typography } from '@/core/components';
import { ChevronRight } from '@/core/components/icons';
import { NETWORK_LIST } from '@/core/constants/wallet';

import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NetworkItem = typeof NETWORK_LIST[number];

type Navigation = NativeStackNavigationProp<ParamListBase>;

export default function ReceiveHomeScreen() {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    navigation.setOptions({
      title: '选择网络地址',
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: NetworkItem }) => (
    <ListItem
      leading={<Avatar.Token media={item.logo} shape='rounded' />}
      bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
      trailing={<ChevronRight fontWeight='700' size={20} color='$color10' />}
      py='$4'
      onPress={() => router.push({ pathname: '/receive/addresses', params: { networkId: item.id } })}
    />
  );

  return (
    <FlashList<NetworkItem>
      data={NETWORK_LIST}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      insetSafearea={false}
    />
  );
}
