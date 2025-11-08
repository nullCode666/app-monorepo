import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Typography, YStack } from '@/core/components';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default function SendConfirmScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { tokenName: tokenNameParam, tokenSymbol: tokenSymbolParam, networkLabel: networkLabelParam } =
    useLocalSearchParams<{ tokenName?: string | string[]; tokenSymbol?: string | string[]; networkLabel?: string | string[] }>();

  const tokenSymbol = useMemo(() => toParam(tokenSymbolParam), [tokenSymbolParam]);
  const tokenName = useMemo(() => toParam(tokenNameParam), [tokenNameParam]) ?? tokenSymbol;
  const networkLabel = useMemo(() => toParam(networkLabelParam), [networkLabelParam]);

  return (
    <YStack flex={1} bg='$backgroundModal' pt={top} pb={bottom} px='$4' gap='$6' justifyContent='space-between'>
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

      <Button size='$4' onPress={() => router.dismissAll()}>
        完成
      </Button>
    </YStack>
  );
}


