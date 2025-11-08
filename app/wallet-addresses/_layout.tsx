import { router, Stack } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { useTheme } from 'tamagui';

import { Pressable, View } from '@/core/components';
import { X } from '@/core/components/icons';

export default function WalletAddressesLayout() {
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

  const renderCloseButton = useCallback(
    () => (
      <Pressable onPress={() => router.dismiss()}>
        <View width={36} height={36} justifyContent='center' alignItems='center'>
          <X size={24} />
        </View>
      </Pressable>
    ),
    []
  );

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='index' options={{ title: '选择待查询网络', headerLeft: renderCloseButton }} />
      <Stack.Screen name='token' options={{ title: '地址详情' }} />
    </Stack>
  );
}


