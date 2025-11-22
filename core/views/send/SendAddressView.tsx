import { router, useNavigation } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';

import { Avatar, Form, ListItem, ScrollView, Typography, YStack } from '@/core/components';
import { ChevronRight, Search } from '@/core/components/icons';
import { NETWORK_LIST } from '@/core/constants/wallet';

type NetworkItem = typeof NETWORK_LIST[number];

type Props = {
  tokenId?: string;
  tokenSymbol?: string;
  tokenName?: string;
  networkId?: string;
  networkLabel?: string;
};

export function SendAddressView({ tokenId, tokenSymbol, tokenName, networkId, networkLabel }: Props) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '接收地址',
    });
  }, [navigation]);

  const handleSelect = useCallback((_item: NetworkItem) => {
    router.push({
      pathname: '/send/token',
      params: {
        tokenId,
        tokenSymbol,
        tokenName,
        networkId,
        networkLabel,
      },
    });
  }, [tokenId, tokenSymbol, tokenName, networkId, networkLabel]);

  return (
    <YStack flex={1}>
      <YStack px='$4' py='$2'>
        <Form.Input
          placeholder='输入地址或域名'
          leftIcon={Search}
          returnKeyType='done'
          onSubmitEditing={Keyboard.dismiss}
        />
      </YStack>

      <ScrollView>
        <YStack px='$4' py='$2'>
          <Typography.TextSecondary fontSize={13} mb='$2'>最近</Typography.TextSecondary>
          {NETWORK_LIST.slice(0, 3).map((item) => (
            <ListItem
              key={item.id}
              leading={<Avatar.Token media={item.logo} shape='rounded' />}
              bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
              bodyLeftBottom={<Typography.TextSecondary fontSize={12}>0x123...456</Typography.TextSecondary>}
              trailing={<ChevronRight fontWeight='700' size={20} color='$color10' />}
              py='$3'
              onPress={() => handleSelect(item)}
            />
          ))}
        </YStack>

        <YStack px='$4' py='$2'>
          <Typography.TextSecondary fontSize={13} mb='$2'>我的账户</Typography.TextSecondary>
          {NETWORK_LIST.map((item) => (
            <ListItem
              key={item.id}
              leading={<Avatar.Token media={item.logo} shape='rounded' />}
              bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
              bodyLeftBottom={<Typography.TextSecondary fontSize={12}>Wallet 1</Typography.TextSecondary>}
              trailing={<ChevronRight fontWeight='700' size={20} color='$color10' />}
              py='$3'
              onPress={() => handleSelect(item)}
            />
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

