import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={'dark'}>
        <ThemeProvider value={DarkTheme}>
          <RootNavigator />
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}

function RootNavigator() {
  return (
    <Stack
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ presentation: "modal" }} />
    </Stack>
  );
}