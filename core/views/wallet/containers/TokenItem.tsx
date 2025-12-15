import { Link } from 'expo-router';
import { memo, type ComponentProps } from 'react';

import { Avatar, ListItem, Pressable, Typography, XStack } from '@/core/components';
import TokenChange from './TokenChange';
import TokenPrice from './TokenPrice';

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

// TokenHeader组件 - 显示token名称和符号
const TokenHeader = memo(({ symbol }: { symbol: string }) => (
  <Typography.Text numberOfLines={1} color='$color' fontSize={17} fontWeight='600'>
    {symbol}
  </Typography.Text>
));

// 价格和变化组件
const TokenPriceChange = memo(({ price, change }: { price: string; change: number }) => (
  <XStack gap='$2'>
    <TokenPrice price={price} change={change} />
    <TokenChange change={change} />
  </XStack>
));

// 余额组件（主余额）
const TokenBalanceMain = memo(({ balance }: { balance: string }) => (
  <Typography.Number numberOfLines={1} color='$color' fontSize={17} fontWeight='600'>
    {balance}
  </Typography.Number>
));

// 余额组件（法币余额）
const TokenBalanceFiat = memo(({ balanceFiat }: { balanceFiat: string }) => (
  <Typography.NumberSecondary numberOfLines={1} color='$color10' fontSize={15}>
    {balanceFiat}
  </Typography.NumberSecondary>
));

function TokenItemComponent({ token, href = '/detail/token', isLast, ...rest }: TokenItemProps) {
  const linkParams = {
    symbol: token.symbol,
    name: token.name ?? token.symbol,
  };

  return (
    <Link
      href={{
        pathname: href,
        params: linkParams,
      }}
      asChild
    >
      <Pressable>
        {() => (
          <ListItem
            // 优化：避免每次渲染创建新的Avatar组件
            leading={<Avatar.Token media={token.image} cornerMedia={token.networkLogo} backgroundColor='$background' />}
            
            // 优化：使用memo包装的子组件
            bodyLeftTop={<TokenHeader symbol={token.symbol} />}
            bodyLeftBottom={<TokenPriceChange price={token.price} change={token.change} />}
            bodyRightTop={<TokenBalanceMain balance={token.balance} />}
            bodyRightBottom={<TokenBalanceFiat balanceFiat={token.balanceFiat} />}
            separator={!isLast}
            {...rest}
          />
        )}
      </Pressable>
    </Link>
  );
}

const TokenItem = memo(TokenItemComponent);

export default TokenItem;
