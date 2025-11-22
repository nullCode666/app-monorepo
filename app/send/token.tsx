import { useLocalSearchParams } from 'expo-router';
import { SendAmountFormView } from '@/core/views/send/SendAmountFormView';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function SendTokenScreen() {
  const { tokenId, tokenSymbol, tokenName, networkId, networkLabel } = useLocalSearchParams<{
    tokenId?: string | string[];
    tokenSymbol?: string | string[];
    tokenName?: string | string[];
    networkId?: string | string[];
    networkLabel?: string | string[];
  }>();

  return (
    <SendAmountFormView
      tokenId={toParam(tokenId)}
      tokenSymbol={toParam(tokenSymbol)}
      tokenName={toParam(tokenName)}
      networkId={toParam(networkId)}
      networkLabel={toParam(networkLabel)}
    />
  );
}
