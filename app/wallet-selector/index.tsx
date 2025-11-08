import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { Avatar, FlashList, ListItem, Typography, YStack } from '@/core/components';
import { Check } from '@/core/components/icons';
import {
  WALLET_SELECTOR_TOTAL,
  WALLET_SELECTOR_WALLETS,
  type WalletSelectorWallet,
} from '@/core/constants/wallet';

type WalletRow = WalletSelectorWallet;

export default function WalletSelectorHomeScreen() {
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '搜索钱包',
      },
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: WalletRow }) => (
    <ListItem
      leading={(
        <Avatar.Token
          media={(
            <Typography.TextPrimary fontWeight='700'>
              {item.name.slice(0, 2).toUpperCase()}
            </Typography.TextPrimary>
          )}
        />
      )}
      bodyLeftTop={<Typography.Text fontWeight='600'>{item.name}</Typography.Text>}
      bodyLeftBottom={<Typography.TextSecondary>{item.balanceFiat}</Typography.TextSecondary>}
      trailing={item.isCurrent ? <Check fontWeight='700' size={20} color='$color12' /> : undefined}
      py='$4'
    />
  );

  return (
    <FlashList
      data={WALLET_SELECTOR_WALLETS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      insetSafearea={false}
      ListHeaderComponent={() => (
        <YStack
          gap='$2'
          py='$4'
          pt='$8'
          px='$4'
          borderBottomWidth={1}
          borderBottomColor='$background2'
          mb='$4'
        >
          <Typography.TextSecondary color='$color10'>
            {WALLET_SELECTOR_TOTAL.title}
          </Typography.TextSecondary>
          <Typography.NumberHeading>
            {WALLET_SELECTOR_TOTAL.amount}
          </Typography.NumberHeading>
        </YStack>
      )}
    />
  );
}


