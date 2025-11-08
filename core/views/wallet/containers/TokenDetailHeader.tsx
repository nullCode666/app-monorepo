import { useMemo } from 'react';

import { Avatar, Typography, XStack, YStack } from '@/core/components';
import { ArrowDownToLine, ArrowUpFromLine, History, ShieldCheck } from '@/core/components/icons';
import { TOKEN_LIST } from '@/core/constants/wallet';

const ACTION_ITEMS = [
  { id: 'send', Icon: ArrowUpFromLine, label: 'Send', href: '/send/wallet' },
  { id: 'receive', Icon: ArrowDownToLine, label: 'Receive', href: '/receive' },
  { id: 'swap', Icon: History, label: 'Swap', href: '/trade' },
  { id: 'defi', Icon: ShieldCheck, label: 'Defi', href: '/defi' },
] as const;

type TokenDetailHeaderProps = {
  symbol?: string;
};

export default function WalletHomeHeader({ symbol }: TokenDetailHeaderProps) {
  const preferredToken = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const normalizedSymbol = symbol.toLowerCase();
    const matchingTokens = TOKEN_LIST.filter(token => token.symbol.toLowerCase() === normalizedSymbol);
    if (!matchingTokens.length) {
      return undefined;
    }

    return matchingTokens.find(token => token.multiple) ?? matchingTokens[0];
  }, [symbol]);

  const baseParams = useMemo(() => {
    if (!preferredToken) {
      return undefined;
    }

    return {
      tokenId: preferredToken.id,
      tokenSymbol: preferredToken.symbol,
      tokenName: preferredToken.name ?? preferredToken.symbol,
    } as const;
  }, [preferredToken]);

  const sendLink = useMemo(() => {
    if (!baseParams) {
      return '/send/wallet';
    }

    if (preferredToken?.multiple) {
      return { pathname: '/send/network', params: baseParams } as const;
    }

    return { pathname: '/send/token', params: baseParams } as const;
  }, [baseParams, preferredToken?.multiple]);

  const receiveLink = useMemo(() => {
    if (!baseParams) {
      return '/receive';
    }

    return { pathname: '/receive/token', params: baseParams } as const;
  }, [baseParams]);

  const actions = useMemo(
    () =>
      ACTION_ITEMS.map(item => {
        if (item.id === 'send') {
          return { ...item, href: sendLink };
        }

        if (item.id === 'receive') {
          return { ...item, href: receiveLink };
        }

        return item;
      }),
    [receiveLink, sendLink]
  );

  return (
    <YStack
      bg='$background'
      p='$4'
      py='$6'
      gap='$6'
      borderBottomWidth={1}
      borderColor='$background2'
    >
      <XStack justifyContent='center' alignItems='center' flex={1}>
        <YStack gap='$1' alignItems='center' flex={1}>
          <Typography.NumberHeading flexWrap='wrap'>
            100 {symbol}
          </Typography.NumberHeading>
          <Typography.TextSecondary>$10,000.00</Typography.TextSecondary>
        </YStack>
      </XStack>
      <XStack justifyContent='space-between' alignItems='center'>
        {actions.map(({ Icon, label, href }) => (
          <Avatar.Token label={label} media={Icon} key={label} link={href} size='default' />
        ))}
      </XStack>
    </YStack>
  );
};
