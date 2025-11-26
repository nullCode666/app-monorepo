import { router, useNavigation } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';

import { Avatar, Form, ListItem, Tabs, Typography, YStack } from '@/core/components';
import { ChevronRight } from '@/core/components/icons';
import { NETWORK_LIST } from '@/core/constants/wallet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NetworkItem = (typeof NETWORK_LIST)[number];

type Props = {
  tokenId?: string;
  tokenSymbol?: string;
  tokenName?: string;
  networkId?: string;
  networkLabel?: string;
};

export function SendAddressView({ tokenId, tokenSymbol, tokenName, networkId, networkLabel }: Props) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { control } = Form.useForm({
    defaultValues: {
      address: '',
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: '接收地址',
    });
  }, [navigation]);

  const handleSelect = useCallback(
    (_item: NetworkItem) => {
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
    },
    [tokenId, tokenSymbol, tokenName, networkId, networkLabel],
  );

  return (
    <YStack flex={1} backgroundColor='$backgroundModal' pt={top}>
      <YStack px='$4' py='$4'>
        <Form.TextArea
          control={control}
          name='address'
          placeholder='输入地址或域名'
          label='发送到'
          onSubmitEditing={Keyboard.dismiss}
          actions={[{ type: 'paste' }, { type: 'scan', onPress: () => console.log('Scan pressed') }]}
        />
      </YStack>

      <Tabs.Container backgroundColor='$backgroundModal'>
        <Tabs.Tab name='recent' label='最近转账'>
          <Tabs.ScrollView>
            <YStack px='$4' py='$2'>
              {NETWORK_LIST.slice(0, 3).map((item) => (
                <ListItem
                  key={item.id}
                  leading={<Avatar.Token media={item.logo} shape='rounded' />}
                  bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
                  bodyLeftBottom={<Typography.TextSecondary fontSize={12}>0x123...456</Typography.TextSecondary>}
                  trailing={<ChevronRight fontWeight='700' size={20} color='$color10' />}
                  onPress={() => handleSelect(item)}
                  py='$2'
                />
              ))}
            </YStack>
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name='address_book' label='地址簿'>
          <Tabs.ScrollView>
            <YStack px='$4' py='$2' alignItems='center' justifyContent='center' minHeight={200}>
              <Typography.TextSecondary>暂无联系人</Typography.TextSecondary>
            </YStack>
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name='my_wallet' label='我的账户'>
          <Tabs.ScrollView>
            <YStack px='$4' py='$2'>
              {NETWORK_LIST.map((item) => (
                <ListItem
                  key={item.id}
                  leading={<Avatar.Token media={item.logo} shape='rounded' />}
                  bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
                  bodyLeftBottom={<Typography.TextSecondary fontSize={12}>Wallet 1</Typography.TextSecondary>}
                  trailing={<ChevronRight fontWeight='700' size={20} color='$color10' />}
                  onPress={() => handleSelect(item)}
                  py='$2'
                />
              ))}
            </YStack>
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </YStack>
  );
}
