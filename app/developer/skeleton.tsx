import { Skeleton, Typography, View, XStack, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const CONTENT_LINE_WIDTHS = ['65%', '40%', '80%'] as const;
const LOADING_ROWS = [0, 1, 2] as const;

export default function SkeletonDemoScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Basic Usage'
        description='Use skeletons to reserve layout while data loads. Tokens are resolved automatically so you can rely on Tamagui shorthand.'
      >
        <YStack gap='$3'>
          {LOADING_ROWS.map(row => (
            <XStack key={row} alignItems='center' gap='$3'>
              <Skeleton width={48} height={48} borderRadius='$8' />
              <YStack flex={1} gap='$2'>
                {CONTENT_LINE_WIDTHS.map((width, lineIndex) => (
                  <Skeleton key={`${row}-${lineIndex}`} height={12} width={width} />
                ))}
              </YStack>
            </XStack>
          ))}
        </YStack>
      </DemoSection>

      <DemoSection
        title='Custom Styles'
        description='Override tokens or animation settings to build more expressive placeholders.'
      >
        <YStack gap='$4'>
          <YStack gap='$2'>
            <Typography.TextSecondary>Stat Blocks</Typography.TextSecondary>
            <XStack gap='$3' alignItems='center'>
              <Skeleton width={64} height={64} borderRadius='$10' backgroundColor='$color5' />
              <YStack gap='$2'>
                <Skeleton width={100} height={16} backgroundColor='$color6' />
                <Skeleton width={72} height={12} backgroundColor='$color7' />
              </YStack>
            </XStack>
          </YStack>

          <YStack gap='$2'>
            <Typography.TextSecondary>Custom Animation</Typography.TextSecondary>
            <View
              borderRadius='$5'
              borderWidth={1}
              borderColor='$color6'
              padding='$3'
            >
              <Skeleton
                height={16}
                width='100%'
                animate={{ opacity: 0.6 }}
                from={{ opacity: 0.2 }}
                transition={{ type: 'timing', duration: 600, repeat: Infinity, repeatReverse: true } as any}
              />
            </View>
          </YStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}

