import { Stack } from 'expo-router';

import { useTheme } from '@/core/components';
import { HeaderLeft } from '@/core/views/header/HeaderLeft';
import { HeaderRight } from '@/core/views/header/HeaderRight';
import { HeaderTitle } from '@/core/views/header/HeaderTitle';

export default function WalletTabLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => <HeaderTitle />,
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight mode='history' />,
        headerTransparent: true,
        headerStyle: { backgroundColor: theme.background.val },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
}
