import { Link, router, Stack } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { Pressable, useTheme, View } from '@/core/components';
import { Wallet, X } from '@/core/components/icons';
import { useNavigationHeaderStyle } from '@/core/hooks/navigation';

export default function DeviceLayout() {
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

  const renderCloseButton = useCallback(
    () => (
      <Pressable onPress={() => router.dismiss()}>
        <View width={36} height={36} justifyContent='center' alignItems='center'>
          <X size={24} />
        </View>
      </Pressable>
    ),
    [],
  );

  const renderSettingsButton = useCallback(
    () => (
      <Link asChild href='/device/manager'>
        <Pressable>
          <View width={36} height={36} justifyContent='center' alignItems='center'>
            <Wallet size={24} />
          </View>
        </Pressable>
      </Link>
    ),
    [],
  );
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name='index'
        options={{
          title: '我的账户',
          headerLeft: renderCloseButton,
          headerRight: renderSettingsButton,
        }}
      />
      <Stack.Screen name='manager' options={{ title: '账户管理' }} />
    </Stack>
  );
}
