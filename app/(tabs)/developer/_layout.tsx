import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

import { COMPONENT_LIST } from '@/core/constants/developer';

export default () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerTransparent: true,
        headerBackTitle: '',
        headerBackButtonDisplayMode: 'minimal',
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: theme.gray12.get(),
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      {COMPONENT_LIST.map(item => {
        return <Stack.Screen key={item.name} name={item.name.toLowerCase()} />
      })}
    </Stack>
  );
}
