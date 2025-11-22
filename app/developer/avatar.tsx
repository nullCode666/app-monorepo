import { Avatar, Typography, XStack, YStack } from '@/core/components';
import { Github, Headset, ShieldCheck } from '@/core/components/icons';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const SAMPLE_AVATAR = 'https://avatars.githubusercontent.com/u/9919?s=200&v=4';

export default function AvatarScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Size Variants'
        description='`Avatar.Token` 提供 `tiny`、`small`、`default` 三种尺寸，可通过 `shape` 控制为圆形或圆角矩形。'
      >
        <XStack gap='$6' alignItems='center'>
          <YStack gap='$1' alignItems='center'>
            <Avatar.Token media={Github} size='tiny' label='Git' />
            <Typography.TextSecondary fontSize={10}>tiny</Typography.TextSecondary>
          </YStack>
          <YStack gap='$1' alignItems='center'>
            <Avatar.Token media={Github} size='small' label='Git' shape='rounded' />
            <Typography.TextSecondary fontSize={10}>small (rounded)</Typography.TextSecondary>
          </YStack>
          <YStack gap='$1' alignItems='center'>
            <Avatar.Token media={Github} size='default' label='Git' />
            <Typography.TextSecondary fontSize={10}>default</Typography.TextSecondary>
          </YStack>
        </XStack>
      </DemoSection>

      <DemoSection title='Media Variants' description='`Avatar.Token` 支持字符串 URL 或 React 元素作为内容'>
        <XStack gap='$6' alignItems='center'>
          <YStack gap='$1' alignItems='center'>
            <Avatar.Token media={Github} size='tiny' cornerMedia={SAMPLE_AVATAR} />
            <Typography.TextSecondary fontSize={10}>tiny</Typography.TextSecondary>
          </YStack>
          <YStack gap='$1' alignItems='center'>
            <Avatar.Token media={Github} size='small' cornerMedia={SAMPLE_AVATAR} />
            <Typography.TextSecondary fontSize={10}>small</Typography.TextSecondary>
          </YStack>
          <YStack gap='$1' alignItems='center'>
            <Avatar.Token media={Github} size='default' cornerMedia={SAMPLE_AVATAR} />
            <Typography.TextSecondary fontSize={10}>default</Typography.TextSecondary>
          </YStack>
        </XStack>
      </DemoSection>

      <DemoSection title='Type Variants' description='使用 `type` 切换默认背景或主色背景。'>
        <XStack gap='$6'>
          <Avatar.Token label='Default' media={Github} size='default' />
          <Avatar.Token label='Primary' media={Headset} type='primary' size='default' />
        </XStack>
      </DemoSection>

      <DemoSection title='Link Actions' description='传入 `link` 让头像变为可点击元素。'>
        <Avatar.Token label='Open Settings' media={ShieldCheck} type='primary' link='/settings' size='default' />
        <Typography.TextSecondary>点击头像将通过 `openLink` 触发导航。</Typography.TextSecondary>
      </DemoSection>

      <DemoSection
        title='Token Avatars'
        description='支持字符串 URL 或 React 元素作为内容，当没有内容时会根据 `label` 生成首字母。'
      >
        <XStack gap='$4' alignItems='center'>
          <Avatar.Token
            media='https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png'
            label='BTC'
          />
          <Avatar.Token
            size='small'
            label='ETH'
            media={<Typography.TextPrimary fontWeight='700'>Ξ</Typography.TextPrimary>}
            backgroundColor='$color8'
            labelColor='$color'
          />
          <Avatar.Token
            size='default'
            label='SOL'
            media='https://assets.coingecko.com/coins/images/4128/large/solana.png'
            backgroundColor='$color9'
            labelColor='$color'
          />
        </XStack>
        <Typography.TextSecondary marginTop='$3'>
          字符串会按图片加载，传入 React 元素时则原样渲染。
        </Typography.TextSecondary>
      </DemoSection>

      <DemoSection title='Corner Badge' description='`corner` 支持与 `media` 相同的类型，用于展示右下角角标。'>
        <XStack gap='$6'>
          <Avatar.Token
            label='NFT'
            media='https://images.unsplash.com/photo-1520544233200-95363d7aa79b?w=200&q=80'
            cornerMedia={Github}
          />
          <Avatar.Token
            label='VIP'
            media={Headset}
            cornerMedia={
              <Typography.TextPrimary fontSize={10} fontWeight='700'>
                PRO
              </Typography.TextPrimary>
            }
            type='primary'
            labelColor='$color'
          />
        </XStack>
      </DemoSection>
    </DemoPage>
  );
}
