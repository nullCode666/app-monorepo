import { useCallback } from 'react';

import { Tabs, Typography } from '@/core/components';

import DefiActivityItem from './containers/DefiActivityItem';
import DefiTabHeader from './containers/DefiTabHeader';

import type { DefiActivityItemData } from './containers/DefiActivityItem';

type ActivitySection = {
  type: 'section';
  id: string;
  date: string;
};

type ActivityItem = {
  type: 'item';
  id: string;
} & DefiActivityItemData;

type ActivityRow = ActivitySection | ActivityItem;

const ACTIVITY: ActivityRow[] = [
  { type: 'section', id: '2025-10-28', date: '2025/10/28' },
  {
    type: 'item',
    id: 'execute',
    title: 'Execute',
    subtitle: '0x3bf197...f37b98',
    rightTop: '+0.0002243 ETH',
    rightBottom: '-1 USDT',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'permit',
    title: 'Approval',
    subtitle: 'Uniswap Permit2',
    rightTop: 'Tether USD',
    rightBottom: 'Unlimited',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdt',
    title: 'Revoke USDT allowance',
    subtitle: 'Uniswap Permit2',
    rightTop: 'Tether USD',
    rightBottom: '0 USDT',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  { type: 'section', id: '2025-10-27', date: '2025/10/27' },
  {
    type: 'item',
    id: 'revoke-usdt-okx',
    title: 'Revoke USDT allowance',
    subtitle: 'OKX DEX',
    rightTop: 'Tether',
    rightBottom: '0 USDT',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'OKX', color: '#6958D6' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdce',
    title: 'Revoke USDC.e allowance',
    subtitle: 'OKX DEX',
    rightTop: 'Bridged USDC',
    rightBottom: '0 USDC.e',
    badges: [
      { label: 'USDC', color: '#2775CA' },
      { label: 'OKX', color: '#6958D6' },
    ],
  },
  {
    type: 'item',
    id: 'send-bnb',
    title: 'Send',
    subtitle: '0xf501ee...4abafa',
    rightTop: '-0.0007947 BNB',
    rightBottom: '$0.90',
    badges: [
      { label: 'BNB', color: '#F3BA2F' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdc',
    title: 'Revoke USDC allowance',
    subtitle: 'Morpho',
    rightTop: 'USD Coin',
    rightBottom: '0 USDC',
    badges: [
      { label: 'USDC', color: '#2775CA' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdf',
    title: 'Revoke USDF allowance',
    subtitle: 'Falcon Finance',
    rightTop: 'Falcon USD',
    rightBottom: '0 USDF',
    badges: [
      { label: 'USDF', color: '#1C1C1E' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
];

export default function DefiTabList() {

  const renderItem = useCallback(({ item }: { item: ActivityRow }) => {
    if (item.type === 'section') {
      return <Typography.TextSecondary p='$4' pb='$0' color='$color11' textTransform='uppercase'>{item.date}</Typography.TextSecondary>;
    }

    return <DefiActivityItem item={item} />;
  }, []);

  return (
    <Tabs.FlatList
      ListHeaderComponent={DefiTabHeader}
      data={ACTIVITY}
      renderItem={renderItem}
      keyExtractor={(item: ActivityRow) => item.id}
    />
  );
}
