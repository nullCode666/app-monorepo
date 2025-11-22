import { Stack } from 'expo-router';
import { TokenListView } from '@/core/views/list/TokenListView';

export default function TokenListScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tokens' }} />
      <TokenListView />
    </>
  );
}
