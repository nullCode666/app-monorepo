import { Stack } from 'expo-router';
import { useMemo } from 'react';

import { useTheme } from '@/core/components';
import { useNavigationHeaderStyle } from '@/core/hooks/navigation';

export default function SettingsLayout() {
  const theme = useTheme();
  const accentColor = theme.color10.val;
  const titleColor = theme.color.val;
  const backgroundColor = theme.background.val;
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
      contentStyle: { backgroundColor },
      ...navigationHeaderStyle,
    }),
    [accentColor, backgroundColor, titleColor, navigationHeaderStyle],
  );

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='index' options={{ title: '' }} />
      <Stack.Screen name='preferences/index' options={{ title: '偏好设置' }} />
      <Stack.Screen name='preferences/language' options={{ title: '界面语言' }} />
      <Stack.Screen name='preferences/currency' options={{ title: '法币显示' }} />
      <Stack.Screen name='security/index' options={{ title: '安全性与隐私' }} />
      <Stack.Screen name='security/auto-lock' options={{ title: '自动锁定时间' }} />
    </Stack>
  );
}
