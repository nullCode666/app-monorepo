

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PortalProvider } from '@tamagui/portal';
import { ToastProvider } from '@tamagui/toast';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import { SheetProvider, useTheme } from '@/core/components';
import { COMPONENT_LIST } from '@/core/constants/developer';
import { tamaguiConfig } from '@/tamagui.config';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  const colorScheme = useColorScheme()!;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <PortalProvider shouldAddRootHost>
              <ToastProvider>
                <StatusBar />
                <SheetProvider>
                  <RootNavigator />
                </SheetProvider>
              </ToastProvider>
            </PortalProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

function RootNavigator() {
  const theme = useTheme();
  const backgroundColor = theme.background.val;
  const backgroundModalColor = theme.backgroundModal.val;
  const accentColor = theme.color10.val;
  const titleColor = theme.color.val;

  const screenOptions = useMemo(() => ({
    headerBackButtonDisplayMode: 'minimal' as const,
    headerBackTitle: '',
    headerShadowVisible: false,
    headerTintColor: accentColor,
    headerTitleStyle: { color: titleColor },
    contentStyle: { backgroundColor },
    headerTransparent: true,
    headerStyle: { backgroundColor: 'transparent' },
  }), [accentColor, backgroundColor, titleColor]);

  const modalScreenOptions = useMemo(() => ({
    headerStyle: { backgroundColor: 'transparent' },
    contentStyle: { backgroundColor: backgroundModalColor },
    presentation: 'modal' as const,
    headerTransparent: true,
    headerShadowVisible: false,
  }), [backgroundModalColor]);

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='detail/token' options={{ title: '' }} />
      <Stack.Screen name='detail/defi' options={{ title: '' }} />
      <Stack.Screen name='detail/nft' options={{ title: '' }} />
      <Stack.Screen name='history' options={{ title: '链上活动' }} />
      <Stack.Screen name='approval' options={{ title: '授权' }} />
      {COMPONENT_LIST.map(item => (
        <Stack.Screen
          key={item.name}
          name={`developer/${item.name.toLowerCase()}`}
          options={{ title: item.name }}
        />
      ))}

      <Stack.Screen name='settings' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
      <Stack.Screen name='device' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
      <Stack.Screen name='send' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
      <Stack.Screen name='send-confirm' options={{ title: '确认发送', ...modalScreenOptions }} />
      <Stack.Screen name='receive' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
    </Stack>
  );
}
