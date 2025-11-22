import { Stack } from 'expo-router';
import { DefiListView } from '@/core/views/list/DefiListView';

export default function DefiListScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'DeFi' }} />
      <DefiListView />
    </>
  );
}
