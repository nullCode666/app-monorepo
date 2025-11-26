import { Stack } from 'expo-router';

export default function TradeTabLayout() {
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
