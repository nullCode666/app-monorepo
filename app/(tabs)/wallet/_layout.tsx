import { Stack } from 'expo-router';

export default function WalletTabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
}
