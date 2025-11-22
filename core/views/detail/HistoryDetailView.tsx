import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography, View, YStack } from '@/core/components';

export function HistoryDetailView() {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <YStack flex={1} bg='$background' px='$4' py='$4' pb={bottom} pt={top} gap='$4'>
      <Typography.Text fontSize={28} fontWeight='700'>
        Transaction Details
      </Typography.Text>
      <Typography.Text color='$color11'>
        View detailed information about this transaction.
      </Typography.Text>
      <View height={1} bg='$color5' />
      <YStack gap='$2'>
        <Typography.Text fontSize={14} color='$color11'>
          Status
        </Typography.Text>
        <Typography.Text fontSize={20} fontWeight='600' color='$green10'>
          Confirmed
        </Typography.Text>
      </YStack>
      <YStack gap='$2'>
        <Typography.Text fontSize={14} color='$color11'>
          Amount
        </Typography.Text>
        <Typography.Text fontSize={20} fontWeight='600'>
          0.5 ETH
        </Typography.Text>
      </YStack>
    </YStack>
  );
}

