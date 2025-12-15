import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PortalProvider } from '@tamagui/portal';
import { Toast, ToastProvider, ToastViewport, useToastState } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import { SheetProvider, useTheme } from '@/core/components';
import { COMPONENT_LIST } from '@/core/constants/developer';
import { useNavigationHeaderStyle } from '@/core/hooks/navigation';
import { tamaguiConfig } from '@/tamagui.config';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme()!;

  const [loaded] = useFonts({
    Quicksand: require('../core/assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../core/assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../core/assets/fonts/Quicksand-SemiBold.ttf'),
    JetBrainsMono: require('../core/assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../core/assets/fonts/JetBrainsMono-Bold.ttf'),
    'JetBrainsMono-SemiBold': require('../core/assets/fonts/JetBrainsMono-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
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
  );
}

// 实现CurrentToast组件，用于处理toast显示
function CurrentToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      animation='200ms'
      key={currentToast.id}
      duration={currentToast.duration|| 1500}
      viewportName={currentToast.viewportName}
    >
      {/* 简化toast内容显示 */}
      <Toast.Title>{currentToast.title || currentToast.message || 'Toast'}</Toast.Title>
    </Toast>
  );
}

function RootNavigator() {
  const theme = useTheme();
  const backgroundColor = theme.background.val;
  const backgroundModalColor = theme.backgroundModal.val;
  const accentColor = theme.color10.val;
  const titleColor = theme.color.val;
  const navigationHeaderStyle = useNavigationHeaderStyle();

  const screenOptions = useMemo(
    () => ({
      headerBackButtonDisplayMode: 'minimal' as const,
      headerBackTitle: '',
      headerShadowVisible: false,
      headerTintColor: accentColor,
      headerTitleStyle: { color: titleColor },
      contentStyle: { backgroundColor },
      headerTransparent: true,
      headerStyle: { backgroundColor: 'transparent' },
      ...navigationHeaderStyle,
    }),
    [accentColor, backgroundColor, titleColor, navigationHeaderStyle],
  );

  const modalScreenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: 'transparent' },
      contentStyle: { backgroundColor: backgroundModalColor },
      presentation: 'modal' as const,
      headerTransparent: true,
      headerShadowVisible: false,
      ...navigationHeaderStyle,
    }),
    [backgroundModalColor, navigationHeaderStyle],
  );

  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

        <Stack.Screen name='list/token' options={{ title: 'Tokens' }} />
        <Stack.Screen name='list/defi' options={{ title: 'DeFi' }} />
        <Stack.Screen name='list/nft' options={{ title: 'NFTs' }} />
        <Stack.Screen name='list/approval' options={{ title: 'Approvals' }} />
        <Stack.Screen name='list/history' options={{ title: 'History', ...modalScreenOptions }} />

        <Stack.Screen name='detail/token' options={{ title: '' }} />
        <Stack.Screen name='detail/defi' options={{ title: '' }} />
        <Stack.Screen name='detail/nft' options={{ title: '' }} />
        <Stack.Screen name='detail/approval' options={{ title: '' }} />
        <Stack.Screen name='detail/history' options={{ title: '' }} />

        {COMPONENT_LIST.map((item) => (
          <Stack.Screen key={item.name} name={`developer/${item.name.toLowerCase()}`} options={{ title: item.name }} />
        ))}

        <Stack.Screen name='settings' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
        <Stack.Screen name='device' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
        <Stack.Screen name='receive' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
        <Stack.Screen name='send' options={{ title: '', ...modalScreenOptions, headerShown: false }} />
        <Stack.Screen name='send-confirm' options={{ title: '', ...modalScreenOptions }} />
        <Stack.Screen name='modal/trade' options={{ title: '', ...modalScreenOptions }} />
        <Stack.Screen name='modal/trade-token-select' options={{ title: '', ...modalScreenOptions }} />
      </Stack>

      {/* 添加Toast相关组件 */}
      <CurrentToast />
      <ToastViewport
        style={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: [{ translateX: -150 }, { translateY: -50 }],
          width: 300,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
