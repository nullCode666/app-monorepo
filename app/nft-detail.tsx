import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography, View, YStack } from '@/core/components';

export default function NftDetailScreen() {
  const { bottom } = useSafeAreaInsets();

  return (
    <YStack flex={1} bg='$background' px='$4' py='$4' pb={bottom} gap='$4'>
      <Typography.Text fontSize={28} fontWeight='700'>
        NFT Overview
      </Typography.Text>
      <Typography.Text color='$color11'>
        Inspect traits, provenance, and market data for the selected collectible.
      </Typography.Text>
      <View height={1} bg='$color5' />
      <YStack gap='$2'>
        <Typography.Text fontSize={14} color='$color11'>
          Collection
        </Typography.Text>
        <Typography.Text fontSize={20} fontWeight='600'>
          Ten Years Of Ethereum
        </Typography.Text>
      </YStack>
      <YStack gap='$2'>
        <Typography.Text fontSize={14} color='$color11'>
          Edition
        </Typography.Text>
        <Typography.Text fontSize={20} fontWeight='600'>
          #128 of 500
        </Typography.Text>
      </YStack>
    </YStack>
  );
}
