import { Typography, View, XStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function XStackScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Horizontal Layout'
        description='`XStack` is a horizontal flex container with Tamagui shorthands for spacing and alignment.'
      >
        <XStack gap='$3'>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              width={72}
              height={72}
              borderRadius='$4'
              backgroundColor='$backgroundPress'
              alignItems='center'
              justifyContent='center'
            >
              <Typography.TextPrimary>{item}</Typography.TextPrimary>
            </View>
          ))}
        </XStack>
      </DemoSection>

      <DemoSection title='Space Between & Alignment'>
        <XStack gap='$3' justifyContent='space-between' alignItems='center'>
          <View
            width={92}
            height={72}
            borderRadius='$4'
            backgroundColor='$backgroundPress'
            alignItems='center'
            justifyContent='center'
          >
            <Typography.TextSecondary>Start</Typography.TextSecondary>
          </View>
          <View
            width={92}
            height={72}
            borderRadius='$4'
            backgroundColor='$backgroundPress'
            alignItems='center'
            justifyContent='center'
          >
            <Typography.TextSecondary>Center</Typography.TextSecondary>
          </View>
          <View
            width={92}
            height={72}
            borderRadius='$4'
            backgroundColor='$backgroundPress'
            alignItems='center'
            justifyContent='center'
          >
            <Typography.TextSecondary>End</Typography.TextSecondary>
          </View>
        </XStack>
      </DemoSection>
    </DemoPage>
  );
}
