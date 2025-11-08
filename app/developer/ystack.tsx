import { Typography, View, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function YStackScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Vertical Layout'
        description='`YStack` aligns children vertically with convenient spacing props.'
      >
        <YStack gap='$3'>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              height={48}
              borderRadius='$3'
              backgroundColor='$backgroundPress'
              alignItems='center'
              justifyContent='center'
            >
              <Typography.TextSecondary>Row {item}</Typography.TextSecondary>
            </View>
          ))}
        </YStack>
      </DemoSection>

      <DemoSection title='Alignment Options'>
        <YStack gap='$3'>
          <YStack gap='$2' alignItems='flex-start'>
            <Typography.TextSecondary>alignItems=&apos;flex-start&apos;</Typography.TextSecondary>
            <View width={80} height={36} borderRadius='$3' backgroundColor='$backgroundPress' />
          </YStack>
          <YStack gap='$2' alignItems='center'>
            <Typography.TextSecondary>alignItems=&apos;center&apos;</Typography.TextSecondary>
            <View width={80} height={36} borderRadius='$3' backgroundColor='$backgroundPress' />
          </YStack>
          <YStack gap='$2' alignItems='flex-end'>
            <Typography.TextSecondary>alignItems=&apos;flex-end&apos;</Typography.TextSecondary>
            <View width={80} height={36} borderRadius='$3' backgroundColor='$backgroundPress' />
          </YStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
