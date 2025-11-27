import { router } from 'expo-router';

import { Avatar, Button, Typography, XStack, YStack } from '@/core/components';
import { ChevronRight } from '@/core/components/icons';
import { type TradeTokenMeta } from '@/core/constants/trade';

export type CardProps = {
  token: TradeTokenMeta;
  amount: string;
  amountHint: string;
  walletLabel: string;
  walletAmount: string;
  walletActionLabel?: string;
};

type TradeTokenCardProps = {
  card: CardProps;
  label: string;
};

export function TradeTokenCard({ card, label }: TradeTokenCardProps) {
  return (
    <YStack bg='$background2' borderRadius={20} p='$4' gap='$2.5' borderWidth={1} borderColor='$color4'>
      <XStack justifyContent='space-between' alignItems='flex-start'>
        <Typography.TextSecondary fontSize={16} fontWeight='600' color='$color11'>
          {label}
        </Typography.TextSecondary>
      </XStack>

      <XStack justifyContent='space-between' alignItems='center'>
        <YStack flex={1} gap='$1'>
          <Typography.Number fontSize={32} numberOfLines={1} adjustsFontSizeToFit>
            {card.amount}
          </Typography.Number>
        </YStack>

        <Button
          size='small'
          borderRadius='$10'
          type='default'
          p='$1.5'
          height='auto'
          bg='$background'
          onPress={() => router.push('/modal/trade-token-select')}
        >
          <XStack gap='$2' alignItems='center'>
            <Avatar.Token size='small' shape='circle' media={card.token.logo} cornerMedia={card.token.badge?.logo} />
            <Typography.Text fontSize={16} fontWeight='700' color='$color'>
              {card.token.symbol}
            </Typography.Text>
            <ChevronRight size={16} color='$color10' />
          </XStack>
        </Button>
      </XStack>

      <XStack justifyContent='space-between' alignItems='center'>
        <XStack alignItems='center'>
          <Typography.NumberSecondary fontSize={14}>{card.amountHint}</Typography.NumberSecondary>
        </XStack>
        <XStack gap='$2' alignItems='center'>
          <Typography.NumberSecondary fontSize={13} color='$color11'>
            {card.walletAmount}
          </Typography.NumberSecondary>
          {card.walletActionLabel ? (
            <Typography.Text fontSize={13} fontWeight='600' color='$primary'>
              {card.walletActionLabel}
            </Typography.Text>
          ) : null}
        </XStack>
      </XStack>
    </YStack>
  );
}
