import { Link } from 'expo-router';
import { memo } from 'react';

import { Avatar, ListItem, Typography, XStack } from '@/core/components';

export type TokenItemData = {
  id: string;
  symbol: string;
  price: string;
  change: number;
  balance: string;
  balanceFiat: string;
  accentColor?: string;
  image?: string;
  name?: string;
  multiple?: boolean;
  networkLogo?: string;
};

type TokenItemProps = {
  token: TokenItemData;
  href?: string;
};

function TokenItemComponent({ token, href = '/token-detail' }: TokenItemProps) {
  const linkParams = {
    symbol: token.symbol,
    name: token.name ?? token.symbol,
  };

  const leading = (
    <Avatar.Token
      media={token.image}
      cornerMedia={token.networkLogo}
    />
  );

  const bodyLeftBottom = (
    <XStack gap='$2'>
      <Typography.NumberSecondary numberOfLines={1}>{token.price}</Typography.NumberSecondary>
      <Typography.NumberSecondary numberOfLines={1} percentageChange={token.change} />
    </XStack>
  );

  const bodyRightTop = (
    <Typography.Number numberOfLines={1}>{token.balance}</Typography.Number>
  );

  const bodyRightBottom = (
    <Typography.NumberSecondary numberOfLines={1}>{token.balanceFiat}</Typography.NumberSecondary>
  );

  return (
    <Link
      href={{
        pathname: href,
        params: linkParams,
      }}
      asChild
    >
      <ListItem
        leading={leading}
        bodyLeftTop={<Typography.Text numberOfLines={1}>{token.symbol}</Typography.Text>}
        bodyLeftBottom={bodyLeftBottom}
        bodyRightTop={bodyRightTop}
        bodyRightBottom={bodyRightBottom}
      />
    </Link>
  );
}

const TokenItem = memo(TokenItemComponent);

export default TokenItem;

