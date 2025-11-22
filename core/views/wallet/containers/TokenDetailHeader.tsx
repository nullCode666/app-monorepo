import { useMemo, type ReactNode } from 'react';

import { Avatar, Typography, XStack, YStack } from '@/core/components';
import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, Landmark } from '@/core/components/icons';
import { TOKEN_LIST } from '@/core/constants/wallet';

const ACTION_ITEMS = [
  { id: 'send', Icon: ArrowUpFromLine, label: 'Send', href: '/send/wallet' },
  { id: 'receive', Icon: ArrowDownToLine, label: 'Receive', href: '/receive' },
  { id: 'swap', Icon: ArrowLeftRight, label: 'Swap', href: '/trade' },
  { id: 'defi', Icon: Landmark, label: 'Defi', href: '/defi' },
] as const;

type TokenDetailHeaderProps = {
  symbol?: string;
  primaryNode?: ReactNode;
  secondaryNode?: ReactNode;
};

export default function WalletHomeHeader({ symbol, primaryNode, secondaryNode }: TokenDetailHeaderProps) {
  const preferredToken = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const normalizedSymbol = symbol.toLowerCase();
    const matchingTokens = TOKEN_LIST.filter((token) => token.symbol.toLowerCase() === normalizedSymbol);
    if (!matchingTokens.length) {
      return undefined;
    }

    return matchingTokens.find((token) => token.multiple) ?? matchingTokens[0];
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

  const receiveHref = useMemo(() => {
    if (!symbol) {
      return '/receive';
    }

    return { pathname: '/receive/addresses', params: baseParams } as const;
  }, [baseParams, symbol]);

  const actions = useMemo(
    () =>
      ACTION_ITEMS.map((item) => {
        if (item.id === 'send') {
          return { ...item, href: sendLink };
        }

        if (item.id === 'receive') {
          return { ...item, href: receiveHref };
        }

        return item;
      }),
    [receiveHref, sendLink],
  );

  return (
    <YStack bg='$background' p='$4' py='$6' gap='$6'>
      <XStack justifyContent='center' alignItems='center' flex={1}>
        <YStack gap='$1' alignItems='center' flex={1}>
          {primaryNode ?? <Typography.NumberHeading flexWrap='wrap'>100 {symbol}</Typography.NumberHeading>}
          {secondaryNode ?? <Typography.TextSecondary>$10,000.00</Typography.TextSecondary>}
        </YStack>
      </XStack>
      <XStack justifyContent='space-between' alignItems='center'>
        {actions.map(({ Icon, label, href }) => (
          <Avatar.Token label={label} media={Icon} key={label} link={href} size='default' />
        ))}
      </XStack>
    </YStack>
  );
}
