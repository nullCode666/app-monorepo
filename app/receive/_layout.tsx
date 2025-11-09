import { Stack } from 'expo-router';
import { useMemo } from 'react';

import { useTheme } from '@/core/components';

export default function ReceiveLayout() {
  const theme = useTheme();
  const accentColor = theme.color10.val;
  const titleColor = theme.color.val;
  const backgroundModalColor = theme.backgroundModal.val;

  const screenOptions = useMemo(
    () => ({
      headerBackButtonDisplayMode: 'minimal' as const,
      headerBackTitle: '',
      headerTintColor: accentColor,
      headerTitleStyle: { color: titleColor },
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
      contentStyle: { backgroundColor: backgroundModalColor },
    }),
    [accentColor, backgroundModalColor, titleColor]
  );

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='index' options={{ title: '选择网络地址' }} />
      <Stack.Screen name='addresses' options={{ title: '接收地址' }} />
    </Stack>
  );
}
