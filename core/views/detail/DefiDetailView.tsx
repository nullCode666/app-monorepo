import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography, View, YStack } from '@/core/components';

export function DefiDetailView() {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <YStack flex={1} bg='$background' px='$4' py='$4' pb={bottom} pt={top} gap='$4'>
      <Typography.Text fontSize={28} fontWeight='700'>
        DeFi Position
      </Typography.Text>
      <Typography.Text color='$color11'>
        Review your collateral, debt, and rewards across connected protocols.
      </Typography.Text>
      <View height={1} bg='$color5' />
      <YStack gap='$2'>
        <Typography.Text fontSize={14} color='$color11'>
          Protocol
        </Typography.Text>
        <Typography.Text fontSize={20} fontWeight='600'>
          Morphic Finance
        </Typography.Text>
      </YStack>
      <YStack gap='$2'>
        <Typography.Text fontSize={14} color='$color11'>
          Net APY
        </Typography.Text>
        <Typography.Text fontSize={20} fontWeight='600' color='$green10'>
          +6.2%
        </Typography.Text>
      </YStack>
    </YStack>
  );
}

