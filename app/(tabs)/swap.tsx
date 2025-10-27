
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, YStack } from '@/core/components';

export default () => {
  const { top } = useSafeAreaInsets();
  return (
    <YStack flex={1} bg='$background' pt={top}>
      <Text>Swap</Text>
    </YStack>
  );
}
