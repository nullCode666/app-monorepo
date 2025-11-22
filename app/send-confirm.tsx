import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { SendConfirmView } from '@/core/views/send/SendConfirmView';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function SendConfirmScreen() {
  const {
    tokenName: tokenNameParam,
    tokenSymbol: tokenSymbolParam,
    networkLabel: networkLabelParam,
  } = useLocalSearchParams<{
    tokenName?: string | string[];
    tokenSymbol?: string | string[];
    networkLabel?: string | string[];
  }>();

  const tokenSymbol = useMemo(() => toParam(tokenSymbolParam), [tokenSymbolParam]);
  const tokenName = useMemo(() => toParam(tokenNameParam), [tokenNameParam]) ?? tokenSymbol;
  const networkLabel = useMemo(() => toParam(networkLabelParam), [networkLabelParam]);

  return <SendConfirmView tokenName={tokenName} tokenSymbol={tokenSymbol} networkLabel={networkLabel} />;
}
