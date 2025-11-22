import { Stack } from 'expo-router';
import { NFTListView } from '@/core/views/list/NFTListView';

export default function NFTListScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'NFTs' }} />
      <NFTListView />
    </>
  );
}
