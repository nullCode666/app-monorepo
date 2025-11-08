
import { Avatar, FlashList, ListItem, Typography, XStack } from '@/core/components';
import { AlignJustify, MoreVertical } from '@/core/components/icons';
import {
  WALLET_SELECTOR_WALLETS,
  type WalletSelectorWallet
} from '@/core/constants/wallet';

type WalletRow = WalletSelectorWallet;

export default function WalletManagerScreen() {

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
      trailing={
        <XStack alignItems='center' gap='$4'>
          <AlignJustify fontWeight='700' size={24} color='$color12' />
          <MoreVertical fontWeight='700' size={24} color='$color12' />
        </XStack>
      }
      py='$4'
    />
  );

  return (
    <FlashList
      data={WALLET_SELECTOR_WALLETS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      insetSafearea={false}
      showsVerticalScrollIndicator={false}
    />
  );
}


