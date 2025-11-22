import { useLocalSearchParams } from 'expo-router';
import { ReceiveQRCodeView } from '@/core/views/receive/ReceiveQRCodeView';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function ReceiveAddressesScreen() {
  const { networkId } = useLocalSearchParams<{ networkId?: string | string[] }>();

  return <ReceiveQRCodeView networkId={toParam(networkId)} />;
}
