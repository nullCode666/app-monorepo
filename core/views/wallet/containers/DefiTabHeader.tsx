import { Typography, XStack, YStack } from '@/core/components';

export default function DefiTabHeader() {
  return (
    <XStack p='$4' gap='$1'>
      <YStack gap='$2'>
        <Typography.TextSecondary>Total Assets</Typography.TextSecondary>
        <XStack gap='$1.5' alignItems='flex-end'>
          <Typography.NumberPrimary flexWrap='wrap' fontWeight={400} color='$color11'>
            $111.11
          </Typography.NumberPrimary>
          <XStack gap='$1' alignItems='flex-end' flexWrap='wrap'>
            <Typography.NumberSecondary flexWrap='wrap' valueChange={10} />
            <Typography.NumberSecondary
              flexWrap='wrap'
              percentageChange={0.12}
              wrapInBrackets
            />
          </XStack>
        </XStack>
      </YStack>
    </XStack>
  );
}
