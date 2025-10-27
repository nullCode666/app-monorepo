import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text, YStack } from '@/core/components';
import { APP_BUILD_NUMBER, APP_VERSION } from '@/core/config';

export default () => {
  const { top } = useSafeAreaInsets();
  return (
    <YStack flex={1} bg='$background' pt={top}>
      <Text>APP_VERSION: {APP_VERSION}</Text>
      <Text>APP_BUILD_NUMBER: {APP_BUILD_NUMBER}</Text>
      <Link asChild href='/settings'>
        <Button>
          open settings
        </Button>
      </Link>
    </YStack>
  );
}
