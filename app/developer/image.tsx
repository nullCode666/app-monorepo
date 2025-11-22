import { Image, Typography, View, XStack, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const SAMPLE_AVATAR = 'https://avatars.githubusercontent.com/u/9919?s=200&v=4';
const SAMPLE_CARD = 'https://images.unsplash.com/photo-1520544233200-95363d7aa79b?w=800&q=80';

export default function ImageDemoScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Remote Assets'
        description='`Image` 仅接受 `src`，加载时自动显示骨架，失败时展示默认的 `ImageOff`。'
      >
        <XStack gap='$4'>
          <View width={72} height={72}>
            <Image src={SAMPLE_AVATAR} />
          </View>

          <YStack flex={1} gap='$2'>
            <View width='100%' height={120}>
              <Image
                width='100%'
                height='100%'
                src={SAMPLE_CARD}
                containerStyle={styles.remoteContainer}
                imageStyle={styles.coverImage}
              />
            </View>
            <Typography.TextSecondary>
              远程图片加载时的骨架效果和失败回退均由内部处理，无需额外配置。
            </Typography.TextSecondary>
          </YStack>
        </XStack>
      </DemoSection>

      <DemoSection title='失败回退' description='提供无效链接可看到默认的故障图标。'>
        <XStack gap='$4' alignItems='center'>
          <View width={80} height={80}>
            <Image
              width='100%'
              height='100%'
              src='https://invalid-url.example.com/not-found.png'
              containerStyle={styles.errorContainer}
            />
          </View>
          <Typography.TextSecondary flex={1}>
            加载失败时会移除骨架，并在容器内居中展示 `ImageOff` 图标。
          </Typography.TextSecondary>
        </XStack>
      </DemoSection>

      <DemoSection
        title='Token 化样式'
        description='`containerStyle` 与 `imageStyle` 支持 Tamagui token，让样式书写更统一。'
      >
        <XStack gap='$4'>
          <View width={64} height={64}>
            <Image
              width='100%'
              height='100%'
              src={SAMPLE_AVATAR}
              containerStyle={styles.tokenContainer}
              imageStyle={styles.tokenImage}
            />
          </View>

          <YStack gap='$2' flex={1}>
            <View width='100%' height={96}>
              <Image
                width='100%'
                height='100%'
                src={SAMPLE_CARD}
                containerStyle={styles.tokenCardContainer}
                imageStyle={styles.coverImage}
              />
            </View>
            <Typography.TextSecondary>
              可结合 Tamagui token（如 `$color6`、`$backgroundPress`）快速设置边框与背景。
            </Typography.TextSecondary>
          </YStack>
        </XStack>
      </DemoSection>
    </DemoPage>
  );
}

const styles = {
  remoteContainer: { borderRadius: '$6', overflow: 'hidden' },
  coverImage: { objectFit: 'cover' },
  errorContainer: {
    borderRadius: '$8',
    borderWidth: 1,
    borderColor: '$color6',
  },
  tokenContainer: { borderRadius: '$10', borderWidth: 1, borderColor: '$color6' },
  tokenImage: { objectFit: 'contain', backgroundColor: '$backgroundPress' },
  tokenCardContainer: {
    borderRadius: '$6',
    overflow: 'hidden',
    backgroundColor: '$backgroundStrong',
  },
} as const;
