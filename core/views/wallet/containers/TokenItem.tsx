import { Link } from 'expo-router';
import { memo, type ComponentProps } from 'react';

import { Avatar, ListItem, Pressable, Typography, XStack } from '@/core/components';

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
  isFirst?: boolean;
  isLast?: boolean;
} & ComponentProps<typeof ListItem>;

function TokenItemComponent({ token, href = '/detail/token', isLast, ...rest }: TokenItemProps) {
  const linkParams = {
    symbol: token.symbol,
    name: token.name ?? token.symbol,
  };

  const leading = <Avatar.Token media={token.image} cornerMedia={token.networkLogo} backgroundColor='$background' />;

  const bodyLeftBottom = (
    <XStack gap='$2'>
      <Typography.NumberSecondary numberOfLines={1} color='$color10' fontSize={15}>
        {token.price}
      </Typography.NumberSecondary>
      <Typography.NumberSecondary numberOfLines={1} percentageChange={token.change} fontSize={15} />
    </XStack>
  );

  const bodyRightTop = (
    <Typography.Number numberOfLines={1} color='$color' fontSize={17} fontWeight='600'>
      {token.balance}
    </Typography.Number>
  );

  const bodyRightBottom = (
    <Typography.NumberSecondary numberOfLines={1} color='$color10' fontSize={15}>
      {token.balanceFiat}
    </Typography.NumberSecondary>
  );

  return (
    <Link
      href={{
        pathname: href,
        params: linkParams,
      }}
      asChild
    >
      <Pressable>
        <ListItem
          leading={leading}
          bodyLeftTop={
            <Typography.Text numberOfLines={1} color='$color' fontSize={17} fontWeight='600'>
              {token.symbol}
            </Typography.Text>
          }
          bodyLeftBottom={bodyLeftBottom}
          bodyRightTop={bodyRightTop}
          bodyRightBottom={bodyRightBottom}
          separator={!isLast}
          {...rest}
        />
      </Pressable>
    </Link>
  );
}

const TokenItem = memo(TokenItemComponent);

export default TokenItem;
