import { Link } from 'expo-router';

import { Avatar, ListItem, Typography, XStack } from '@/core/components';
import { Settings } from '@/core/components/icons';

export type HistoryActivityItemData = {
  id: string;
  title: string;
  subtitle: string;
  rightTop: string;
  rightBottom: string;
  tone?: 'positive' | 'negative';
  secondaryTone?: 'positive' | 'negative';
};

type HistoryActivityItemProps = {
  item: HistoryActivityItemData;
  href?: string;
};

function HistoryActivityItem({ item, href = '/detail/defi' }: HistoryActivityItemProps) {
  const rightTopNode = (
    <XStack alignItems='center' justifyContent='flex-end' gap='$2'>
      <Typography.TextSecondary numberOfLines={1}>+0.22222 ETH</Typography.TextSecondary>
      <Avatar.Token
        size='tiny'
        media='https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address--1758104080638.png'
        cornerMedia='https://assets.revault.one/network/bitcoin.png'
      />
    </XStack>
  );

  const rightBottomNode = (
    <XStack alignItems='center' justifyContent='flex-end' gap='$2'>
      <Typography.TextSecondary numberOfLines={1}>{item.rightBottom}</Typography.TextSecondary>
      <Avatar.Token
        size='tiny'
        media={
          'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address--1758104080638.png'
        }
        cornerMedia='https://assets.revault.one/network/tron.png'
      />
    </XStack>
  );

  return (
    <Link href={href} asChild>
      <ListItem
        leading={<Avatar.Token media={Settings} />}
        bodyLeftTop={
          <Typography.TextPrimary numberOfLines={1}>{item.title}</Typography.TextPrimary>
        }
        bodyLeftBottom={
          <Typography.TextSecondary numberOfLines={1}>{item.subtitle}</Typography.TextSecondary>
        }
        bodyRightTop={rightTopNode}
        bodyRightBottom={rightBottomNode}
      />
    </Link>
  );
}

export default HistoryActivityItem;
