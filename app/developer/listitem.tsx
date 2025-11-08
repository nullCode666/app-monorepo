import { Avatar, ListItem, Typography, XStack } from '@/core/components';
import { Github, Settings } from '@/core/components/icons';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const SAMPLE_TOKEN = {
  price: '$1.00',
  balance: '2,345',
  balanceFiat: '$2,345.00',
};

const RECENT_ACTIVITY = {
  title: 'Swap Complete',
  subtitle: 'ETH → SOL · 0.24 fee',
  primary: 'Pending',
  secondary: '1 min ago',
};

type HistorySample = {
  id: string;
  title: string;
  subtitle: string;
  rightTop: string;
  rightBottom: string;
  badgeMedia?: string;
};

const HISTORY_SAMPLES: HistorySample[] = [
  {
    id: 'history-positive',
    title: 'Execute',
    subtitle: '0x3bf197...f37b98',
    rightTop: '+0.0002243 ETH',
    rightBottom: '-1 USDT',
    badgeMedia: 'https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png',
  },
  {
    id: 'history-negative',
    title: 'Send',
    subtitle: '0xf501ee...4abafa',
    rightTop: '-0.0007947 BNB',
    rightBottom: '$0.90',
    badgeMedia: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address--1720669765494.png',
  },
];

export default function ListItemDemoScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='基础布局'
        description='`ListItem` 利用 `bodyLeft` / `bodyRight` 插槽快速构建资产列表。'
      >
        <ListItem
          leading={<Avatar.Token media='https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png' />}
          bodyLeftTop={<Typography.Text>Bitcoin</Typography.Text>}
          bodyLeftBottom={(
            <XStack gap='$2'>
              <Typography.NumberSecondary>{SAMPLE_TOKEN.price}</Typography.NumberSecondary>
              <Typography.NumberSecondary percentageChange={1.2} />
            </XStack>
          )}
          bodyRightTop={<Typography.Number>{SAMPLE_TOKEN.balance}</Typography.Number>}
          bodyRightBottom={<Typography.NumberSecondary>{SAMPLE_TOKEN.balanceFiat}</Typography.NumberSecondary>}
        />
        <ListItem
          leading={<Avatar.Token media='https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png' />}
          bodyLeftTop={<Typography.Text>Bitcoin 2</Typography.Text>}
          bodyLeftBottom={(
            <XStack gap='$2'>
              <Typography.NumberSecondary>{SAMPLE_TOKEN.price}</Typography.NumberSecondary>
              <Typography.NumberSecondary percentageChange={3.4} />
            </XStack>
          )}
          bodyRightTop={<Typography.Number>{SAMPLE_TOKEN.balance}</Typography.Number>}
          bodyRightBottom={<Typography.NumberSecondary>{SAMPLE_TOKEN.balanceFiat}</Typography.NumberSecondary>}
        />
      </DemoSection>

      <DemoSection
        title='带操作按钮'
        description='右侧可传入自定义 CTA 或状态信息。'
      >
        <ListItem
          leading={<Avatar.Token media={Github} size='small' />}
          bodyLeftTop={<Typography.Text>GitHub Notifications</Typography.Text>}
          bodyLeftBottom={<Typography.TextSecondary>New comments on revault-wallet</Typography.TextSecondary>}
          bodyRightTop={<Typography.TextPrimary fontWeight='600' color='$primary'>View</Typography.TextPrimary>}
          bodyRightBottom={<Typography.TextSecondary>2 unread</Typography.TextSecondary>}
        />
      </DemoSection>

      <DemoSection
        title='自定义间距与角标'
        description='通过角标媒体展示额外状态，结构保持左右两列。'
      >
        <ListItem
          leading={(
            <Avatar.Token
              media='https://images.unsplash.com/photo-1520544233200-95363d7aa79b?w=200&q=80'
              cornerMedia={(<Typography.TextPrimary fontSize={10} fontWeight='700'>⚡️</Typography.TextPrimary>)}
              size='default'
            />
          )}
          bodyLeftTop={<Typography.Text>{RECENT_ACTIVITY.title}</Typography.Text>}
          bodyLeftBottom={<Typography.TextSecondary>{RECENT_ACTIVITY.subtitle}</Typography.TextSecondary>}
          bodyRightTop={<Typography.TextPrimary color='$color12'>{RECENT_ACTIVITY.primary}</Typography.TextPrimary>}
          bodyRightBottom={<Typography.TextSecondary>{RECENT_ACTIVITY.secondary}</Typography.TextSecondary>}
        />
      </DemoSection>

      <DemoSection
        title='历史记录布局'
        description='复刻 `HistoryActivityItem` 中的两行布局，右侧包含数值与角标头像。'
      >
        {HISTORY_SAMPLES.map(item => (
          <ListItem
            key={item.id}
            leading={<Avatar.Token media={Settings} />}
            bodyLeftTop={(
              <Typography.TextPrimary numberOfLines={1}>
                {item.title}
              </Typography.TextPrimary>
            )}
            bodyRightTop={(
              <XStack alignItems='center' justifyContent='flex-end' gap='$2'>
                <Typography.TextSecondary numberOfLines={1}>{item.rightTop}</Typography.TextSecondary>
                <Avatar.Token size='tiny' media={item.badgeMedia} cornerMedia='https://i.meee.com.tw/WhPy9gB.png' />
              </XStack>
            )}
            bodyLeftBottom={(
              <Typography.TextSecondary numberOfLines={1}>
                {item.subtitle}
              </Typography.TextSecondary>
            )}
            bodyRightBottom={(
              <XStack alignItems='center' justifyContent='flex-end' gap='$2'>
                <Typography.TextSecondary numberOfLines={1}>{item.rightBottom}</Typography.TextSecondary>
                <Avatar.Token size='tiny' media={item.badgeMedia} cornerMedia='https://i.meee.com.tw/WhPy9gB.png' />
              </XStack>
            )}
          />
        ))}

        <ListItem
          leading={<Avatar.Token media={Settings} />}
          bodyLeftTop={<Typography.TextPrimary numberOfLines={1}>Contract Interaction</Typography.TextPrimary>}
          bodyLeftBottom={<Typography.TextSecondary numberOfLines={1}>0x4c4a...c57b</Typography.TextSecondary>}
        />

        <ListItem
          leading={<Avatar.Token media={Settings} />}
          bodyLeftTop={<Typography.TextPrimary numberOfLines={1}>Send</Typography.TextPrimary>}
          bodyLeftBottom={<Typography.TextSecondary numberOfLines={1}>0xf501ee...4abafa</Typography.TextSecondary>}
          bodyRightTop={(
            <XStack alignItems='center' justifyContent='flex-end' gap='$2'>
              <Typography.TextSecondary numberOfLines={1}>+0.22222 ETH</Typography.TextSecondary>
              <Avatar.Token size='tiny' media='https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png' cornerMedia='https://i.meee.com.tw/WhPy9gB.png' />
            </XStack>
          )}
          bodyRightBottom={(
            <Typography.TextSecondary numberOfLines={1}>多种资产</Typography.TextSecondary>
          )}
        />

        <ListItem
          leading={<Avatar.Token media={Settings} />}
          bodyLeftTop={<Typography.TextPrimary numberOfLines={1}>Send</Typography.TextPrimary>}
          bodyLeftBottom={<Typography.TextSecondary numberOfLines={1}>0xf501ee...4abafa</Typography.TextSecondary>}
          trailing={
            <XStack alignItems='center' justifyContent='flex-end' gap='$2'>
              <Typography.TextSecondary numberOfLines={1}>+0.22222 ETH</Typography.TextSecondary>
              <Avatar.Token size='small' media='https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png' cornerMedia='https://i.meee.com.tw/WhPy9gB.png' />
            </XStack>
          }
        />
      </DemoSection>
    </DemoPage>
  );
}

