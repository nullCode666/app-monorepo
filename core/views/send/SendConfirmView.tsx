import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Typography, YStack } from '@/core/components';

type Props = {
  tokenName?: string;
  tokenSymbol?: string;
  networkLabel?: string;
};

export function SendConfirmView({ tokenName, tokenSymbol, networkLabel }: Props) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <YStack flex={1} pt={top} pb={bottom} px='$4' gap='$6' justifyContent='space-between'>
      <YStack gap='$4'>
        <YStack borderRadius='$6' borderWidth={1} borderColor='$color4' p='$4' gap='$3'>
          <YStack gap='$1'>
            <Typography.TextSecondary fontSize={12} color='$color11'>资产</Typography.TextSecondary>
            <Typography.Text fontSize={18} fontWeight='600'>
              {tokenName ?? tokenSymbol}
              {tokenSymbol ? ` (${tokenSymbol})` : ''}
            </Typography.Text>
          </YStack>

          {networkLabel ? (
            <YStack gap='$1'>
              <Typography.TextSecondary fontSize={12} color='$color11'>网络</Typography.TextSecondary>
              <Typography.Text>{networkLabel}</Typography.Text>
            </YStack>
          ) : null}
        </YStack>
      </YStack>

      <Button size='middle' onPress={() => router.dismissAll()}>
        完成
      </Button>
    </YStack>
  );
}

