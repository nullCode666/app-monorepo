import { useLocalSearchParams } from 'expo-router';
import { SendNetworkListView } from '@/core/views/send/SendNetworkListView';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function SendNetworkScreen() {
  const { tokenId, tokenSymbol, tokenName } = useLocalSearchParams<{
    tokenId?: string | string[];
    tokenSymbol?: string | string[];
    tokenName?: string | string[];
  }>();

  return (
    <SendNetworkListView tokenId={toParam(tokenId)} tokenSymbol={toParam(tokenSymbol)} tokenName={toParam(tokenName)} />
  );
}
