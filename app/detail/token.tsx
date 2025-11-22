import { useLocalSearchParams } from 'expo-router';

import { TokenDetailView } from '@/core/views/detail/TokenDetailView';

export default function TokenDetailScreen() {
  const { symbol, name } = useLocalSearchParams<{ symbol?: string; name?: string }>();
  return <TokenDetailView symbol={symbol} name={name} />;
}
