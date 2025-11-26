import { Stack } from 'expo-router';
import { useMemo } from 'react';

import { useTheme } from '@/core/components';
import { useNavigationHeaderStyle } from '@/core/hooks/navigation';

export default function SendLayout() {
  const theme = useTheme();
  const accentColor = theme.color10.val;
  const titleColor = theme.color.val;
  const backgroundModalColor = theme.backgroundModal.val;
  const navigationHeaderStyle = useNavigationHeaderStyle(true);

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
      ...navigationHeaderStyle,
    }),
    [accentColor, backgroundModalColor, titleColor, navigationHeaderStyle],
  );

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='index' options={{ title: '选择资产' }} />
      <Stack.Screen name='network' options={{ title: '选择待发送资产的网络' }} />
      <Stack.Screen name='address' options={{ title: '接收地址' }} />
      <Stack.Screen name='token' options={{ title: '发送资产' }} />
    </Stack>
  );
}
